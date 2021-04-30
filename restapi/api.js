const express = require("express");
const router = express.Router();
const $rdf = require("rdflib");
const User = require("./models/users");
const SolidNodeClient = require("solid-node-client").SolidNodeClient;
const client = new SolidNodeClient();

const FOAF = $rdf.Namespace("http://xmlns.com/foaf/0.1/");
const VCARD = $rdf.Namespace("http://www.w3.org/2006/vcard/ns#");

const jwt = require("jsonwebtoken");

/**
 * Consultas los amigos de un usuario
 * @param {String} URL webId del usuario
 * @returns {{podsQueries: Promise<{URL: String, name: String}>[], friends: String[]}} array de promesas que se resolveran
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
  const friends = store.each(me, FOAF("knows"));

  // Consulta los nombres y las fotos de los amigos en sus respectivos pods y 
  // almacena las promesas resultantes en un array
  const podsQueries = [];
  for (const friend of friends) {
    podsQueries.push(
      // Carga el perfil del amigo
      fetcher
        .load(friend.doc())
        // Si no hay errores consulta el nombre, la foto y los devuelve
        .then(() => {
          return {
            URL: friend.value,
            name: store.any(friend, FOAF("name")).value,
            photo: store.any(friend, VCARD("hasPhoto")).value

          };
        })
        // Si se produce un error devuelve la URL del amigo en lugar del nombre
        .catch(() => {
          return {
            URL: friend.value,
            name: friend.value,
          };
        })
    );
  }


  return {
    podsQueries: podsQueries,
    friends: friends.map((friend) => friend.value),
  };
}

// Get friend list of a user
router.post("/user/friends", async (req, res) => {
  const { podsQueries, friends } = await getFriends(req.body.URL);

  //Consulta los usuarios (y sus localizaciones) con las URLs de los amigos en la bd
  const usersQuery = User.find({ URL: { $in: friends } }).sort("-_id");

  // Espera a que todas las consultas terminen
  return Promise.all([
    usersQuery,
    Promise.all(podsQueries).then((results) => results),
  ]).then((results) => {
    const resultDb = results[0];
    const resultPods = results[1];
    //Asocia los resultados de la consulta a la bd con los de los pods
    res.send(
      resultDb.map((user) => {
        userInfo = resultPods.filter((result) => result.URL === user.URL)[0];
        return {
          URL: user.URL,
          nombre: userInfo.name,
          foto: userInfo.photo,
          latitud: user.location.coordinates[1],
          longitud: user.location.coordinates[0],
          altitud: user.altitud,
          fecha: user.fecha,
        };
      })
    );
  });
});

// Get list of friends near a location
// A token is needed to perform this action
router.post("/user/friends/near", async (req, res) => {
  let token = req.body.token;

  jwt.verify(
    token,
    process.env.TOKEN_SECRET || "contraseñapruebas",
    async (err, infoToken) => {
      if (err || !infoToken.webId) {
        res.status(401);
        res.send("Invalid or missing token");
        return;
      }

      let user = await User.findOne({ URL: infoToken.webId }).exec();

      if(user && user.banned === "SI") {
        res.status(403);
        res.send("Forbbiden");
        return;
      }

      const { podsQueries, friends } = await getFriends(infoToken.webId);

      //Consulta los usuarios cercanos (y sus localizaciones) con las URLs de los amigos en la bd
      const usersAggregate = User.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [req.body.longitud, req.body.latitud],
            },
            distanceField: "distancia",
            maxDistance: req.body.maxDistancia,
            query: { URL: { $in: friends } },
          },
        },
      ]);

      // Espera a que todas las consultas terminen
      return Promise.all([
        usersAggregate,
        Promise.all(podsQueries).then((results) => results),
      ]).then((results) => {
        const resultDb = results[0];
        const resultPods = results[1];
        //Asocia los resultados de la consulta a la bd con los de los pods
        res.send(
          resultDb.map((user) => {
            userInfo = resultPods.filter((result) => result.URL === user.URL)[0];
            return {
              URL: user.URL,
              nombre: userInfo.name,
              foto: userInfo.photo,
              latitud: user.location.coordinates[1],
              longitud: user.location.coordinates[0],
              altitud: user.altitud,
              distancia: user.distancia,
              fecha: user.fecha,
            };
          })
        );
      });
    }
  );
});

// Registra un nuevo usuario, o actualiza su ubicación
// El cuerpo debe contener los siguientes campos:
//      token
//      latitud
//      longitud
//      altitud
router.post("/user/add", async (req, res) => {
  let token = req.body.token;

  jwt.verify(
    token,
    process.env.TOKEN_SECRET || "contraseñapruebas",
    async (err, infoToken) => {
      if (err || !infoToken.webId) {
        res.status(401);
        res.send("Invalid or missing token");
        return;
      }

      let user = await User.findOne({ URL: infoToken.webId }).exec();

      if(user && user.banned === "SI") {
        res.status(403);
        res.send("Forbbiden");
        return;
      }

      // Si ya está el usuario, se actializa su ubicación
      if (user) {
        user.location.coordinates = [req.body.longitud, req.body.latitud];
        user.altitud = req.body.altitud;
        user.fecha = req.body.fecha;
      }
      // Si no, se crea uno nuevo
      else {
        user = new User({
          URL: infoToken.webId,
          location: {
            type: "Point",
            coordinates: [req.body.longitud, req.body.latitud],
          },
          altitud: req.body.altitud,
          fecha: req.body.fecha,
          banned: "NO"
        });
      }
      await user.save();
      res.send("Update successful");
    }
  );
});

//Add samples to the database
router.get("/user/sample", async (req, res) => {
  const fs = require("fs");
  const samples = JSON.parse(fs.readFileSync("sampleUsers.json"));
  const users = [];

  await User.deleteMany();

  for (let sample of samples) {
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
//      token
// For this to work, The user must have added
// https://solid-node-client as a trusted app on his pod
router.post("/user/login", async (req, res) => {
  try {

    // Iniciamos sesión con las credenciales enviadas
    let session = await client.login({
      idp: req.body.idp,
      username: req.body.username,
      password: req.body.password,
    });

    let user = await User.findOne({ URL: session.webId }).exec();

    if(user && user.banned === "SI") {
      res.status(403);
      res.send("Forbbiden");
      return;
    }

    // Inicialización de variables para consultas en pods
    const store = $rdf.graph();
    const fetcher = new $rdf.Fetcher(store);
    const me = store.sym(session.webId);
    const profile = me.doc();

    // Carga el perfil del usuario
    await fetcher.load(profile);
    // Consulta el y la foto nombre del usuario
    const name = store.any(me, FOAF("name"));
    const photo = store.any(me, VCARD("hasPhoto"));

    let token = jwt.sign(
      { webId: session.webId },
      process.env.TOKEN_SECRET || "contraseñapruebas"
    );

    res.status(200);
    res.send({
      token,
      webId: session.webId,
      name: name.value,
      photo: photo ? photo.value : null,
    });
  } catch (err) {
    res.status(401);
    res.send(err);
  }
});



//Obtiene todos los usuarios de la bd
router.get("/users", async (req, res) => {


  let users = await User.find({});
  res.send(users);

});


router.get("/user/banned", async (req, res) => {

  if(req.body.URL==="") {
    res.send("NO");
  }
  else {
    user = await User.findOne({ URL: req.body.URL }).exec();
    if(user.banned!=null) {
      res.send(user.banned);
    } else {
      res.send("NO");
    }
  }


});

//Banea a un usuario
router.post("/user/ban", async (req, res) => {


  user = await User.findOne({ URL: req.body.URL }).exec();

  if (user.banned == "SI") {
    user.banned = "NO";
  } else {
    user.banned = "SI";
  }

  await user.save();

  res.send(user);
});






module.exports = router;
