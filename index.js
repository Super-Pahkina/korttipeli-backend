const express = require('express')
const app = express()

app.use(express.json()) // saadaan lähetettyä dataa bodyssä
const fetch = require('node-fetch') // saadaan dataa apista fetchillä
const fetchAbsolute = require('fetch-absolute') // apin toimintaan, että polku toimii

const { response } = require('express')
const id_lista = require('./api_idt')
const Elintarvike = require('./mongo')
//käynistyy nykyään npm run dev

// käytetään jos päätetäänkin etsiä indeksillä
/*const makeIndex = () => {
    const biggest = 30
    index = Math.round(Math.random() * biggest)
    return index
}*/

//const url = `https://fineli.fi/fineli/api/v1/foods?q=${index}`
//const url = "https://fineli.fi/fineli/api/v1/foods?q=1"

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

const fetchApi = fetchAbsolute(fetch)("https://fineli.fi");

const fetchData = async () => {
    try {
        for (let i = 0; i < id_lista.length; i++) {
            let response = await fetchApi(`/fineli/api/v1/foods?q=${id_lista[i]}`)
            const json = await response.json()

            //riittäiskö tähän tää? kokeile vielä
            //await makeElintarvikeAndSaveToDb(json)

            for (let ii = 0; ii < json.length; ii++) {
                console.log("NAME", json[ii].name.fi)
                console.log("FAT", typeof (json[ii].fat))
                await makeElintarvikeAndSaveToDb(json[ii])
            }
        }
        console.log("ELINT pituus", elintarvikkeet_api.length) // tää vaan debug
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
    /*const id = Number(request.params.id)
    const elintarvike = elintarvikkeet.find(elintarvike => elintarvike.id === id)

    if (elintarvike) {
        response.json(elintarvike)
    } else {
        response.status(404).end()
        // lisää tähän haku netistä ???
    }*/
})

/*app.delete('/api/notes/:id', (request, response) => {
const id = Number(request.params.id)
notes = notes.filter(note => note.id !== id)

response.status(204).end()
})*/

app.post('/api/elintarvikkeet', (request, response) => {

    //luodaan elintarvikkeelle id
    /*const maxId = elintarvikkeet.length > 0
        ? Math.max(...elintarvikkeet.map(e => e.id))
        : 0*/

    const elintarvike = request.body
    elintarvike.id = maxId + 1

    elintarvikkeet = elintarvikkeet.concat(elintarvike)
    //console.log(elintarvike)

    response.json(elintarvike)
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)