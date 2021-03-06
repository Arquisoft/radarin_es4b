const $rdf = require('rdflib')
const express = require("express")
const User = require("./models/users")
const router = express.Router()

// Get friend list of a user
router.post("/user/friends", async (req, res) => {
    let URL = req.body.URL;

    // Inicialización de variables para consultas en pods
    const store = $rdf.graph();
    const fetcher = new $rdf.Fetcher(store);
    const me = store.sym(URL);
    const profile = me.doc();
    const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');

    // Carga el perfil del usuario
    await fetcher.load(profile);
    // COnsulta las URLs de los amigos
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

    //Consulta los usuarios (y sus localizaciones) con las URLs de los amigos en la bd
    const usersQuery = User.find({'URL': {$in: friends.map(friend => friend.value)}}).sort('-_id')

    // Espera a que todas las consultas terminen
    Promise.all([usersQuery, Promise.all(namesQueries).then(results => results)])
        .then(results => {
            const resultDb = results[0];
            const resultNames = results[1];
            res.send(
                //Asocia los resultados de la consulta a la bd con los nombres obtenidos de los pods
                resultDb.map(user => {return {
                    URL: user.URL,
                    nombre: resultNames.filter(result => result.URL === user.URL)[0].name,
                    latitud: user.latitud,
                    longitud: user.longitud,
                    altitud: user.altitud
                };})
            );
    })
})

//register a new user location
router.post("/user/add", async (req, res) => {
    let URL = req.body.URL;
    let altitud = req.body.altitud;
    let longitud = req.body.longitud;
    let latitud = req.body.latitud;

    user = new User({
        URL: URL,
        altitud: altitud,
        longitud: longitud,
        latitud: latitud
    })
    
    if (await User.findOne({'URL': URL})) 
        await User.updateOne({'URL': URL}, user)
    else 
        await user.save()
    res.send(user)
})

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
})

module.exports = router