const {Dog} = require("../db")
require('dotenv').config();
const { API_URL, API_KEY } = process.env;
const axios = require("axios")

const getAllDogs = async ()=>{
    try {
        const dogsApi = await axios.get(`${API_URL}?api_key=${API_KEY}`);
        const dogsBdd = await Dog.findAll();
        const allDogs = dogsApi.data.concat(dogsBdd);
        if(allDogs.length === 0) throw new Error("There are no Dogs to show");
        return allDogs;
    } catch (error) {
        return {error:error.message}
    }
}

module.exports = getAllDogs;