const { Router } = require('express');
const getAllDogs = require('../controllers/getAllDogs');
const postNewDog = require('../controllers/postNewDog');
const saveTemperamentData = require("../controllers/saveTemperamentData");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// GET Route
// works for GET /dogs and GET /dogs/?name=".."

router.get("/dogs", async ( req, res ) => {
    const {name} = req.query;
    const allDogs = await getAllDogs()
    try {
        if(name){
            const dog = allDogs.filter(dog=> dog.name.toLowerCase().includes(name.toLowerCase()))
            if(dog.length){
                return res.status(200).send(dog)
            } else {
                return res.status(404).send({error: "No matches for this name"})
            }
        } else {
            return res.status(201).json(allDogs)
        }
    } catch (error) {
        return res.status(404).send({error: "No matches for this name"});
    }
})

// GET by ID route
router.get("/dogs/:idRaza", async ( req, res ) => {
    let {idRaza} = req.params;
    idRaza = Number(idRaza);
    const allDogs = await getAllDogs(); 
    try {
        const dog = allDogs.find(dog => dog.id === idRaza)
        if( dog ){
            return res.status(200).json(dog);
        } else {
            return res.status(404).send({error: "No matches for the ID given"})
        }
    } catch (error) {
        return res.status(404).send({error: "No matches for the ID given"})
    }
})


// POST dogs
router.post("/dogs", async ( req, res ) => {
    try {
        // get data from req.body
        const { image, name, height, weight, life_span, temperament } = req.body;
        
        // post new Dog
        const newDog = await postNewDog({ image, name, height, weight, life_span, temperament })
        return res.status(200).json(newDog);      
    } catch (error) {
        return res.status(404).send(error.message);
    }
})

// GET temperaments
router.get("/temperaments", async ( req, res ) => {
    try {
        const temperaments = await saveTemperamentData();
        
        return res.status(200).json(temperaments);

    } catch (error) {
        return res.status(404).send(error.message);
    }
})



module.exports = router;
