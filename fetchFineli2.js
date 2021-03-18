const fetch = require('node-fetch')
const fetchAbsolute = require('fetch-absolute')
const fetchApi = fetchAbsolute(fetch)("https://fineli.fi")
const finelin_api_id_lista = require('./api_idt')
const Elintarvike2 = require('./mongo2')
const { count } = require('./mongo')

const makeElintarvikeAndSaveToDb = async (json_objekti) => {
    const elint = new Elintarvike2({
        name_fi: json_objekti.name.fi,
        api_id: json_objekti.id,
        energyKcal: json_objekti.energyKcal,
        fat: json_objekti.fat,
        protein: json_objekti.protein,
        carbohydrate: json_objekti.carbohydrate,
        fiber: json_objekti.fiber,
        sugar: json_objekti.sugar,
        salt: json_objekti.salt,
        ingredient_class: json_objekti.ingredientClass.code,
        special_diets: json_objekti.specialDiets
    })
    try {
        await elint.save()
    } catch (error) {
        console.log(error)
    }
}

const fetchData = async () => {
    try {
        let count = await Elintarvike2.collection.count() // tarkastaa MongoDB:n dokumenttien määrän
        for (let i = count; i < finelin_api_id_lista.length; i++) {
            let response = await fetchApi(`/fineli/api/v1/foods?q=${finelin_api_id_lista[i]}`)
            const json = await response.json()

            for (let ii = 0; ii < json.length; ii++) {
                await makeElintarvikeAndSaveToDb(json[ii])
            }
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = { fetchData }