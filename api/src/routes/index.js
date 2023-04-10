const { Router } = require('express');
const getAllDogs = require('../controllers/getAllDogs')
const getDogsById = require('../controllers/getDogsById')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", async (req, res) =>{
    try {
        const allDogs = await getAllDogs();
        if(!allDogs) throw new Error("There was a problem") 
        return res.status(200).json(allDogs);
    } catch (error) {
        return res.status(404).send(error.message);
    }
})

router.get("/dogs/:idRaza", async (req, res) =>{
    try {
        const {idRaza} = req.params;
        if(!idRaza) throw new Error("");
        const allDogs = await getDogsById(idRaza);
        return res.status(200).json(allDogs);
    } catch (error) {
        return res.status(404).send("There was a problem");
    }
})


module.exports = router;
