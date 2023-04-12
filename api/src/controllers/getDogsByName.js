const {Dog} = require("../db");
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
        const dogsByNameApi = await axios.get( `${API_QUERY_URL}${name}`);
        
        // saves response in new array
        let allDogs = dogsByNameApi.data;
        
        // searches in DB 
        const dogsByNameDb = await Dog.findAll({
            where: {
                name: {
                    [Op.substring]: name,
                },
            }
        });
        
        // add DB results in array
        allDogs=allDogs.concat(dogsByNameDb);
            
        // if there are no dogs => throw Error
        if( allDogs.length === 0 ) throw new Error( "There are no dogs to show for the given name" );
        
        // save required fields (name)
        allDogs = allDogs.map(dog=>{
            return {
                name: dog.name
            }
        })
        
        // return result
        return allDogs;

    } catch ( error ) {
        return { error: error.message }
    }
}

module.exports = getDogsByName;