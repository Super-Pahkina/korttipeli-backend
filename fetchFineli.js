const fetch = require('node-fetch')
const fetchAbsolute = require('fetch-absolute')
const fetchApi = fetchAbsolute(fetch)("https://fineli.fi")
const finelin_api_id_lista = require('./finelinApiIdLista')
const Elintarvike = require('./mongo')
const { count } = require('./mongo')


const tarkastaOnkoPommikortti = (json_objekti) => {
    if (json_objekti.energyKcal < 100 &&
        json_objekti.fat < 4 &&
        json_objekti.protein < 4 &&
        json_objekti.carbohydrate < 20 &&
        json_objekti.fiber < 1 &&
        json_objekti.sugar < 4 &&
        json_objekti.salt < 40) {
        return true
    }
    return false
}

const tarkastaOnkoJokerikortti = (json_objekti) => {
    if (json_objekti.energyKcal > 590 ||
        json_objekti.fat > 80 ||
        json_objekti.protein > 50 ||
        json_objekti.carbohydrate > 75 ||
        json_objekti.fiber > 15 ||
        json_objekti.sugar > 80 ||
        json_objekti.salt > 50000) {
        return true
    }
    return false
}

const koostaElintarvikeJaTallennaTietokantaan = async (json_objekti) => {

    const pommi = tarkastaOnkoPommikortti(json_objekti)
    const jokeri = tarkastaOnkoJokerikortti(json_objekti)

    const elint = new Elintarvike({
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
        special_diets: json_objekti.specialDiets,
        jokeri: jokeri,
        pommi: pommi
    })

    try {
        await elint.save()
    } catch (error) {
        console.log(error)
    }
}

const fetchData = async () => {
    try {
        let count = await Elintarvike.collection.count() // tarkastaa MongoDB:n dokumenttien määrän
        for (let i = count; i < finelin_api_id_lista.length; i++) {
            let response = await fetchApi(`/fineli/api/v1/foods?q=${finelin_api_id_lista[i]}`)
            const json = await response.json()

            for (let ii = 0; ii < json.length; ii++) {
                await koostaElintarvikeJaTallennaTietokantaan(json[ii])
            }
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = { fetchData } //kutsutaan index.js:ssä jos halutaan hakea dataa Finelin apista