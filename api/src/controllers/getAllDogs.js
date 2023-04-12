const {Dog} = require("../db")
require('dotenv').config();
const { API_URL, API_KEY } = process.env;
const axios = require("axios")

const getAllDogs = async ()=>{
    try {
        // API get request for all dogs
        const dogsApi = await axios.get( `${API_URL}?api_key=${API_KEY}` );

        // DB search for all dogs
        const dogsDb = await Dog.findAll();

        // new array with both searches
        let allDogs = dogsApi.data.concat(dogsDb);

        // if there are no dogs => throw error
        if( allDogs.length === 0 ) throw new Error( "There are no Dogs to show" );

        // save required fields (name)
        allDogs = allDogs.map(dog=>{
            return {
                name: dog.name
            }
        })
        
        // return result
        return allDogs;
        
    } catch ( error ) {
        return { error:error.message }
    }
}

module.exports = getAllDogs;