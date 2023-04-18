const {Temperament} = require("../db")
require('dotenv').config();
const { API_URL, API_KEY } = process.env;
const axios = require("axios")

const saveTemperamentData = async () =>{
    try {
        // call a function to get Temperaments data from the API
        // this function returns an array of objects
        let dbTemps = await Temperament.findAll();
        
        //console.log(dbTemps);

        if(dbTemps.length===0){

            const allTemperaments = await getTemperaments();

            // if no Temperaments => throw error
            if(!allTemperaments) throw new Error( "There are no Temperaments to show" )
            
            // bulkcreat allow us to create multiple records at once with only one query
            // we must send an array of objects
            await Temperament.bulkCreate(allTemperaments);
            return allTemperaments;
        }
        else{
            return dbTemps;
        }
    } catch (error) {
        return {error: error.message}
    }
}

const getTemperaments = async () => {
    try {
        // API get request for all dogs
        const dogsApi = await axios.get( `${API_URL}?api_key=${API_KEY}` );

        // new array with data from the API
        let allDogs = dogsApi.data

        // new array with all Temperaments
        const apiTemperaments = allDogs.map(dog => dog.temperament);
        
        let temperaments = [];
        // Each temperament from the API is a string with several words.
        // Splits them and then saves them in a new array
        for(let i=0; i<apiTemperaments.length; i++){
            if(apiTemperaments[i]){
                const tempSplit = apiTemperaments[i].split(", ");
                tempSplit.map(item=>temperaments=temperaments.concat(item))
            }
        }

        // order alphabeticaly
        temperaments.sort()

        // temperament array might have word repeticion
        // filters them and only saves those which are not repeated
        // we save the data as an object with the property name
        let filteredTemperaments = []
        for (i=0; i<temperaments.length; i++){
            const found = filteredTemperaments.find(element => element.name === temperaments[i])
            if(!found) filteredTemperaments.push({name: temperaments[i]});
        }

        // if there are temperaments => throw error
        if( filteredTemperaments.length === 0 ) throw new Error( "There are no Temperaments to show" );
        
        // return result
        return filteredTemperaments;
        
    } catch ( error ) {
        return { error:error.message }
    }
}

module.exports = saveTemperamentData;