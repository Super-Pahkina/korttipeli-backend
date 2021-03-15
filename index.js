const express = require('express')
const app = express()

app.use(express.json()) // saadaan lähetettyä dataa bodyssä

const fetch = require('node-fetch') // saadaan dataa apista fetchillä

const fetchAbsolute = require('fetch-absolute')
const fetchApi = fetchAbsolute(fetch)("https://fineli.fi") // apin toimintaan, että polku toimii

const cors = require('cors')
app.use(cors()) // saadaan tarjottua dataa eri lokaatioissa toimiviin sovelluksiin

const id_lista = require('./api_idt') // lista, jossa Finelin elintarvike id:t
const Elintarvike = require('./mongo') // eri tiedostossa oleva Elintarvike-olion määrittely. Kuvaus, miten tietoa tallennetaan tietokantaan.
const { count } = require('./mongo') // ominaisuus

// käynnistä komennolla npm run dev, jotta päästään hyödyntämään nodemonia kehityksessä

// tarkoitus on pilkkoa tämä tiedosto useampaan pienempään js-tiedostoon kehityksen edetessä

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

// hakee datan finelistä ja tallentaa mongodbseen
const fetchData = async () => {
    try {
        let count = await Elintarvike.collection.count() // tarkastaa MongoDB:n dokumenttien määrän
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
// fetchData kommentoituna, koska koko Finelin data on tallennettu MongoDB:seen. 
// Funkiota ei kutsuta tällä hetkellä, mutta tallennettuna siltä varalta, että haluamme päivittää dataa.
// fetchData()


// backendin tarjoama REST-rajapinta

// palauttaa kaikki elintarvikkeet (ei tarvita tällä hetkellä, poistetaan tai muutetaan asynciksi)
app.get('/api/elintarvikkeet', (request, response) => {
    Elintarvike.find({}).then(elintarvikkeet => {
        response.json(elintarvikkeet)
    })
})

// palauttaa elintarvikeen, MongoDB-id:n perusteella (ei tarvita tällä hetkellä, poistetaan tai muutetaan asynciksi)
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


// palauttaa yhden sattumanvaraisen elintarvikkeen
app.get('/random', async (request, response) => {
    const random_int = Math.floor(Math.random() * await Elintarvike.collection.count())
    const haettava = id_lista[random_int]
    try {
        const elintarvike = await Elintarvike.find({ "api_id": `${haettava}` })
        response.json(elintarvike)
    } catch (error) {
        console.log(error)
    }
})

// tarkastaa ettei randomoidussa elintarvikelistassa ole duplikaatteja
function checkIfDuplicateExists(array) {
    return new Set(array.map(item => item["name_fi"])).size !== array.length
    //return new Set(w).size !== w.length
}


// palauttaa halutun määrän satunnaisia elintarvikkeita
app.get('/howmany/:number', async (request, response) => {
    try {
        let is_duplicates = true
        while (is_duplicates) {
            cards = await Elintarvike.aggregate([{ $sample: { size: parseInt(request.params.number) } }])
            is_duplicates = checkIfDuplicateExists(cards)
        }
        response.json(cards)
    } catch (error) {
        console.log("ERROR", error)
    }
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)