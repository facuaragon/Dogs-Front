const {Dog} = require("../db");
require('dotenv').config();
const { API_QUERY_URL } = process.env;
const axios = require("axios");

const getDogsById = async (idRaza)=>{
    try {
        const dogsApi = await axios.get(`${API_QUERY_URL}${idRaza}`);

        const dogsBdd = await Dog.findAll({
            where: {
                name: idRaza,
            }
        });
        
        const allDogs = dogsApi.data.concat(dogsBdd);

        if(allDogs.length === 0) throw new Error("There are no Dogs to show");
        return allDogs;
    } catch (error) {
        return {error:error.message}
    }
}

module.exports = getDogsById;