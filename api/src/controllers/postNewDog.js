const {Dog} = require("../db")
require('dotenv').config();
const { API_URL, API_KEY } = process.env;
const axios = require("axios")

const postNewDog = async ({ image, name, height, weight, life_span, temperament }) => {
    try {

        // if there is data missing => throw error
        if( !image || !name || !height || !weight || !life_span ) throw new Error("Data missing");
        

        // In order to save the new dog with an incremental ID that follows the APIs IDs
        // we set the id of the new dog
        let dogsDb = await Dog.findAll();
        const id = 265 + dogsDb.length;
        // create new dog in DB
        const newDog = await Dog.create({ 
            id: id,
            image, 
            name, 
            height, 
            weight, 
            life_span
        })

        // intance of addTemperaments method (because there is a relation between Dog and Temperament)
        newDog.addTemperaments(temperament);

        // return data
        return newDog;

    } catch ( error ) {
        return { error:error.message }
    }
}

module.exports = postNewDog;