const {Dog} = require("../db")

const bulkCreateDogs = async ()=>{
    try {
        let id = 265
        const dogs = await Dog.bulkCreate([
            {   
                id: id++,
                image: "Facu Bulldog",
                name: "Facu Bulldog",
                height: "43 - 53",
                weight: "14 - 27",
                life_span: "10 - 15 years",
                temperament: [15,12,1,4]
            },
            {
                id: id++,
                image: "Facu Bull",
                name: "Facu Bull",
                height: "43 - 53",
                weight: "14 - 27",
                life_span: "10 - 15 years",
                temperament: [25,16,30,42]
            },
            {
                id: id++,
                image: "Bulldog Facu",
                name: "Bulldog Facu",
                height: "43 - 53",
                weight: "14 - 27",
                life_span: "10 - 15 years",
                temperament: [26,17,31,43]
            },
            {
                id: id++,
                image: "Bull Facu",
                name: "Bull Facu",
                height: "43 - 53",
                weight: "14 - 27",
                life_span: "10 - 15 years",
                temperament: [27,18,32,44]
            }
        ])
        return dogs;
    } catch ( error ) {
        return { error:error.message }
    }
}

module.exports = bulkCreateDogs;