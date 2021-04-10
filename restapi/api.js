const express = require("express");
const router = express.Router();
const $rdf = require('rdflib');
const User = require("./models/users");
const SolidNodeClient = require('solid-node-client').SolidNodeClient;
const client = new SolidNodeClient();

const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
const VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');

/**
 * Consultas los amigos de un usuario
 * @param {String} URL webId del usuario
 * @returns {{namesQueries: Promise<{URL: String, name: String}>[], friends: String[]}} array de promesas que se resolveran
 * con los nombres de cada amigo y array con los webIds de los amigos
 */
async function getFriends(URL) {
    // Inicialización de variables para consultas en pods
    const store = $rdf.graph();
    const fetcher = new $rdf.Fetcher(store);
    const me = store.sym(URL);
    const profile = me.doc();

    // Carga el perfil del usuario
    await fetcher.load(profile);
    // Consulta las URLs de los amigos
    const friends = store.each(me, FOAF('knows')); 

    // Consulta los nombres de los amigos en sus respectivos pods y almacena las promesas resultantes en un array
    const namesQueries = [];
    for (const friend of friends) {
        namesQueries.push(
            // Carga el perfil del amigo
            fetcher.load(friend.doc())
                // Si no hay errores consulta el nombre y lo devuelve
                .then(result => {return {
                    URL: friend.value, 
                    name: store.any(friend, FOAF('name')).value
                }})
                // Si se produce un error devuelve la URL del amigo en lugar del nombre
                .catch(err => {return {
                    URL: friend.value, 
                    name: friend.value
                }}));
    }

    return {
        namesQueries: namesQueries,
        friends: friends.map(friend => friend.value),
    };
}

// Get friend list of a user
router.post("/user/friends", async (req, res) => {
    const {namesQueries, friends} = await getFriends(req.body.URL);

    //Consulta los usuarios (y sus localizaciones) con las URLs de los amigos en la bd
    const usersQuery = User.find({'URL': {$in: friends}}).sort('-_id');

    // Espera a que todas las consultas terminen
    return Promise.all([usersQuery, Promise.all(namesQueries).then(results => results)])
        .then(results => {
            const resultDb = results[0];
            const resultNames = results[1];
            //Asocia los resultados de la consulta a la bd con los nombres obtenidos de los pods
            res.send(resultDb.map(user => {
                return {
                    URL: user.URL,
                    nombre: resultNames.filter(result => result.URL === user.URL)[0].name,
                    latitud: user.location.coordinates[1],
                    longitud: user.location.coordinates[0],
                    altitud: user.altitud
                };
            }
        ));
    });
});

// Get list of friends near a location
router.post("/user/friends/near", async (req, res) => {
    const {namesQueries, friends} = await getFriends(req.body.URL);

    //Consulta los usuarios cercanos (y sus localizaciones) con las URLs de los amigos en la bd
    const usersAggregate = User.aggregate([
        {
          $geoNear: {
             near: { 
                type: "Point" ,
                coordinates: [req.body.longitud , req.body.latitud] 
            },
            distanceField: "distancia",
            maxDistance: req.body.maxDistancia,
            query: {'URL': {$in: friends}},
          }
        }
     ])

    // Espera a que todas las consultas terminen
    return Promise.all([usersAggregate, Promise.all(namesQueries).then(results => results)])
        .then(results => {
            const resultDb = results[0];
            const resultNames = results[1];
            //Asocia los resultados de la consulta a la bd con los nombres obtenidos de los pods
            res.send(resultDb.map(user => {
                return {
                    URL: user.URL,
                    nombre: resultNames.filter(result => result.URL === user.URL)[0].name,
                    latitud: user.location.coordinates[1],
                    longitud: user.location.coordinates[0],
                    altitud: user.altitud,
                    distancia: user.distancia,
                };
            }
        ));
    });
});

// Registra un nuevo usuario, o actualiza su ubicación
// El cuerpo debe contener los siguientes campos:
//      URL: webId del usuario
//      latitud
//      longitud
//      altitud
router.post("/user/add", async (req, res) => {
    let URL = req.body.URL;
    
    // Si ya está el usuario, se actializa su ubicación
    if (await User.findOne({'URL': URL}))
        await User.updateOne({'URL': URL}, { $set: req.body });
    // Si no, se crea uno nuevo
    else {
        user = new User({
            URL,
            location: {
                type : "Point",
                coordinates : [
                    req.body.longitud,
                    req.body.latitud
                ]
            },
            altitud: req.body.altitud,
            fecha: req.body.fecha
        });
        await user.save();
    }
        
    res.send("Update successful");
});

//Add samples to the database
router.get("/user/sample", async (req, res) => {
    const fs = require('fs');
    const samples = JSON.parse(fs.readFileSync('sampleUsers.json'));
    const users = [];

    await User.deleteMany();
    
    for (sample of samples) {
        let user = new User(sample);
        users.push(user);
        await user.save();
    }

    res.send(users);
});

// Authenticates a user and sends back his WebId
// The request must include the following fields:
//      idp : identity provider (e.g. https://solidcommunity.net)
//      username 
//      password
// The response contains an user object with the following fields:
//      webId
//      name
//      photo
// For this to work, The user must have added 
// https://solid-node-client as a trusted app on his pod
router.post("/user/login", async (req, res) => {
    try {
        // Iniciamos sesión con las credenciales enviadas
        let session = await client.login({
            idp: req.body.idp,
            username: req.body.username,
            password: req.body.password
        });

        // Inicialización de variables para consultas en pods
        const store = $rdf.graph();
        const fetcher = new $rdf.Fetcher(store);
        const me = store.sym(session.webId);
        const profile = me.doc();

        // Carga el perfil del usuario
        await fetcher.load(profile);
        // Consulta el y la foto nombre del usuario
        const name = store.any(me, FOAF('name'));
        const photo = store.any(me, VCARD('hasPhoto'));

        res.status(200);
        res.send({
            webId: session.webId, 
            name: name.value, 
            photo: photo? photo.value : null
        });
    } catch (err) {
        res.status(403);
        console.log(err);
        res.send(err);
    }
});

module.exports = router;