const {Dog, Temperament} = require("../db")
require('dotenv').config();
const { API_URL, API_KEY } = process.env;
const axios = require("axios")

const getAllDogs = async ()=>{
    let dogsDb = await getDb();
    let dogsApi = await getApi();
    let allDogs = dogsApi.concat(dogsDb);
    return allDogs;
}

const getApi = async () => {
    const dogsApi = await axios.get(`${API_URL}?api_key=${API_KEY}`)
    let dogsInfo = await dogsApi.data.map(dog=>{
        return {
            id: dog.id,
            name: dog.name,
            temperament: dog.temperament,
            weight: dog.weight.metric,
            height: dog.height.metric,
            life_span: dog.life_span,
            origin: dog.origin,
            image: dog.image.url,
        }
    })
    return dogsInfo
}

const getDb = async () => {
    let dogsDb = await Dog.findAll({
        include: {
            model: Temperament,
            attributes:["name"],
            through:{
                attributes: [],
            }
        }
    });
    dogsDb = dogsDb.map(dog=>{
        return {
            id: dog.id,
            name: dog.name,
            weight: dog.weight,
            height: dog.height,
            life_span: dog.life_span,
            image: dog.image,
            temperament: dog.Temperaments.map(tempe=> {return tempe.name}).join(", "),
            createdInDb: dog.createdInDb
        }
    })
    return dogsDb;
}

module.exports = getAllDogs;