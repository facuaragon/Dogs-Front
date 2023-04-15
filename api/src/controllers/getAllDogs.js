const {Dog, Temperament} = require("../db")
require('dotenv').config();
const { API_URL, API_KEY } = process.env;
const axios = require("axios")

const getAllDogs = async ()=>{
    try {
        // API get request for all dogs
        let dogsApi = await axios.get( `${API_URL}?api_key=${API_KEY}` );

        // save required fields (name)
        if(dogsApi){
            dogsApi = dogsApi.data.map(dog=>{
                return {
                    name: dog.name,
                    image: dog.image.url,
                    temperament: dog.temperament,
                    weight: dog.weight.metric
                }
            })
        }

        // DB search for all dogs
        let dogsDb = await Dog.findAll({
            include: {
                model: Temperament,
                attributes:["name"],
                through:{
                    attributes: [],
                }
            }
        });

        // save required fields (name)
        if(dogsDb){
            dogsDb = dogsDb.map(dog=>{
                return {
                    name: dog.name,
                    image: dog.image,
                    temperament: dog.Temperaments.map(tempe=> {return tempe.name}).join(", "),
                    weight: dog.weight
                }
            })
        }

        // new array with both searches
        let allDogs = dogsApi.concat(dogsDb);

        // if there are no dogs => throw error
        if( allDogs.length === 0 ) throw new Error( "There are no Dogs to show" );
        
        // return result
        return allDogs;
        
    } catch ( error ) {
        return { error:error.message }
    }
}

module.exports = getAllDogs;