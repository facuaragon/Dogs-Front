const {Dog,Temperament} = require("../db");
const { Op } = require("sequelize");
require('dotenv').config();
const { API_QUERY_URL } = process.env;
const axios = require("axios");

const getDogsByName =  async ( name )=>{
    try {
        // verify if name is given
        if( !name ) throw new Error ( "A breed name must be given" );

        // toUpperCase each word of the name 
        name = name.toLowerCase().trim().split(' ').map( word => word[0].toUpperCase() + word.substr(1) ).join(' ');  
        
        // asks API names
        let dogsByNameApi = await axios.get( `${API_QUERY_URL}${name}`);
        dogsByNameApi = dogsByNameApi.data;

        
        dogsByNameApi = dogsByNameApi.map(dog=>{
            if(!dog.temperament) dog.temperament = '';
            return {
                id: dog.id,
                name: dog.name,
                image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
                temperament: dog.temperament,
                weight: dog.weight.metric
            }
        })
        
        
        // searches in DB 
        let dogsByNameDb = await Dog.findAll({
            where: {
                name: {
                    [Op.substring]: name,
                },
            },
            include: {
                model: Temperament,
                attributes:["name"],
                through:{
                    attributes: [],
                }
            }
        });

        dogsByNameDb = dogsByNameDb.map(dog=>{
            return {
                id: dog.id,
                name: dog.name,
                image: dog.image,
                weight: dog.weight,
                temperament: dog.Temperaments.map(tempe=> {return tempe.name}).join(", "),

            }
        })
        
        // add DB results in array
        let allDogs=dogsByNameApi.concat(dogsByNameDb);
            
        // if there are no dogs => throw Error
        if( allDogs.length === 0 ) throw new Error( "There are no dogs to show for the given name" );
        
        // save required fields (name)
        // allDogs = allDogs.map(dog=>{
        //     return {
        //         name: dog.name
        //     }
        // })
        
        // return result
        return allDogs;

    } catch ( error ) {
        return { error: error.message }
    }
}

module.exports = getDogsByName;