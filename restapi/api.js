const $rdf = require('rdflib')
const express = require("express")
const User = require("./models/users")
const router = express.Router()

// Get all users
router.get("/users/list", async (req, res) => {
    let URL = "https://davidaf.solidcommunity.net/profile/card#me";
    const store = $rdf.graph();
    const fetcher = new $rdf.Fetcher(store);
    const me = store.sym(URL);
    const profile = me.doc();
    const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
    await fetcher.load(profile);
    const friends = store.each(me, FOAF('knows')).map(friend => friend.value) //URLs de los amigos 
    const users = await User.find({'URL': {$in: friends}}).sort('-_id') //Usuarios con esas URLs 
	res.send(users)
})

//register a new user
router.get("/user/add", async (req, res) => {
    let url = "https://www.w3.org/People/Berners-Lee/card#i";
    let altitud = 0.0;
    let longitud = 0.0;
    let latitud = 0.0;
    
    user = new User({
        URL: url,
        altitud: altitud,
        longitud: longitud,
        latitud: latitud
    })
    
    await user.save()
    res.send(user)
})


module.exports = router