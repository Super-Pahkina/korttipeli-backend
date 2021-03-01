const express = require('express')
const app = express()

app.use(express.json()) // saadaan lähetettyä dataa bodyssä
const fetch = require('node-fetch') // saadaan dataa apista fetchillä
const fetchAbsolute = require('fetch-absolute') // apin toimintaan, että polku toimii

const { response, request } = require('express')
const id_lista = require('./api_idt')
const Elintarvike = require('./mongo')
const { count } = require('./mongo')
//käynistyy nykyään npm run dev

const makeElintarvikeAndSaveToDb = async (json_objekti) => {
    // teke scheman mukaisen esityksen ja tallentaa tietokantaan
    const elint = new Elintarvike({
        name_fi: json_objekti.name.fi,
        api_id: json_objekti.id,
        energyKcal: json_objekti.energyKcal,
        fat: json_objekti.fat,
        protein: json_objekti.protein,
        carbohydrate: json_objekti.carbohydrate,
        fiber: json_objekti.fiber,
        sugar: json_objekti.sugar,
        salt: json_objekti.salt
    })
    try {
        await elint.save()
    } catch (error) {
        console.log(error)
    }

}

//hakee datan finelistä ja tallentaa mongodbseen
const fetchApi = fetchAbsolute(fetch)("https://fineli.fi");

const fetchData = async () => {
    try {

        let count = await Elintarvike.collection.count() // alkaa tallentamaan oikeasta indeksistä

        for (let i = count; i < id_lista.length; i++) {
            let response = await fetchApi(`/fineli/api/v1/foods?q=${id_lista[i]}`)
            const json = await response.json()

            for (let ii = 0; ii < json.length; ii++) {
                await makeElintarvikeAndSaveToDb(json[ii])
            }
        }
    } catch (error) {
        console.log(error)
    }

}

fetchData()

//tarvitaanks näitä mitään paitsi yhden ja kaikkien haku?? pitäisko nääkin olla async

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/elintarvikkeet', (request, response) => {
    Elintarvike.find({}).then(elintarvikkeet => {
        response.json(elintarvikkeet)
    })
})

app.get('/api/elintarvikkeet/:id', (request, response) => {
    Elintarvike.findById(request.params.id)
        .then(elint => {
            if (elint) {
                response.json(elint)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            response.status(500).end
        })
})

app.get('/api/elintarvikkeet/random', (request, response) => {
    //miten ei tule samaa korttia uudestaan
    const random_int = Math.floor(Math.random() * 180)
    const haettava = id_lista[random_int]
    Elintarvike.find({ "api_id": `${haettava}` })
        .then(elintarvike => {
            if (elintarvike) {
                response.json(elintarvike)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            response.status(500).end
        })
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)