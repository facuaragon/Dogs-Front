const { Router } = require('express');
const getAllDogs = require('../controllers/getAllDogs');
const getDogsById = require('../controllers/getDogsById');
const getDogsByName = require('../controllers/getDogsByName');
const postNewDog = require('../controllers/postNewDog');
const saveTemperamentData = require("../controllers/saveTemperamentData");

//! eliminar luego Bulk create
const bulkCreateDogs = require('../controllers/bulkCreateDogs');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//! Bulk create (eliminar luego)
router.post("/bulkdogs", async ( req, res ) => {
    try {
        const dogs = await bulkCreateDogs();
        return res.status(200).send(dogs);
    } catch (error) {
        return res.status(404).send(error.message);
    }
})


// GET Route
// works for GET /dogs and GET /dogs/?name=".."

router.get("/dogs", async ( req, res ) => {
    try {

        // save query name
        const {name} = req.query;
        
        // if there is not a query => get all dogs
        if(!name){
            const allDogs = await getAllDogs();
            return res.status(200).json(allDogs);
        }
        // else (there is a query) => get dogs by name
        else{
            const dogsByName = await getDogsByName(name);
            return res.status(200).json(dogsByName);
        }
    } catch (error) {
        return res.status(404).send(error.message);
    }
})

// GET by ID route
router.get("/dogs/:id", async ( req, res ) => {
    try {
        // get id from params
        const {id} = req.params;

        // get dogs by id
        const dogsById = await getDogsById(id);
        return res.status(200).json(dogsById);
    } catch (error) {
        return res.status(404).send(error.message);
    }
})


// POST dogs
router.post("/dogs", async ( req, res ) => {
    try {
        // get data from req.body
        const { id, image, name, height, weight, life_span, temperament } = req.body;
        
        // post new Dog
        const newDog = await postNewDog({ id, image, name, height, weight, life_span, temperament })
        return res.status(200).json(newDog);      
    } catch (error) {
        return res.status(404).send(error.message);
    }
})

router.get("/temperaments", async ( req, res ) => {
    try {
        const temperaments = await saveTemperamentData();
        
        return res.status(200).json(temperaments);
    } catch (error) {
        return res.status(404).send(error.message);
    }
})



module.exports = router;
