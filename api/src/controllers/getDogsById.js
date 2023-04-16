const {Dog, Temperament} = require("../db");
require('dotenv').config();
const { API_URL, API_KEY } = process.env;
const axios = require("axios");


const getDogsById = async ( id )=>{
    try {

        // parse ID into number/INTEGER
        id= Number( id );

        // if no ID => throw error
        if( !id ) throw new Error ( "An ID must be given" );

        // if ID is not a number => throw erro
        if( typeof id !== "number" ) throw new Error ( "The ID must be a number" )

        // API get request for all dogs
        const allDogsApi = await axios.get( `${API_URL}?api_key=${API_KEY}`);

        // Filter response where dog.id === id
        let dogsByIdApi = allDogsApi.data.filter( apiDog => apiDog.id === id )
        dogsByIdApi = dogsByIdApi.map(dog=>{
            return {
                id: dog.id,
                name: dog.name,
                image: dog.image.url,
                height: dog.height.metric,
                weight: dog.weight.metric,
                temperament: dog.temperament,
                life_span: dog.life_span

            }
        })
        
        // DB search where id = id
        let dogsByIdDb = await Dog.findAll({
            where: {
                id: id,
            },
            include: {
                model: Temperament,
                attributes:["name"],
                through:{
                    attributes: [],
                }
            }
        });

        // Maps response in order to throw same response as the API
        dogsByIdDb = dogsByIdDb.map(dog=>{
            return {
                id: dog.id,
                image: dog.image,
                name: dog.name,
                height: dog.height,
                weight: dog.weight,
                temperament: dog.Temperaments.map(tempe=> {return tempe.name}).join(", "),
                life_span: dog.life_span

            }
        })
        
        // new array with both searches
        let allDogs = dogsByIdApi.concat( dogsByIdDb );

        // if there are no dogs => throw Error
        if( allDogs.length === 0 ) throw new Error( "There are no Dogs to show" );

        // save required fields (name, temperament)
        allDogs = allDogs.map(dog=>{
            return {
                id: dog.id,
                image: dog.image,
                name: dog.name,
                height: dog.height,
                weight: dog.weight,
                temperament: dog.temperament,
                life_span: dog.life_span

            }
        })
        
        // return result
        return allDogs[0];

    } catch ( error ) {
        return { error:error.message }
    }
}

module.exports = getDogsById;