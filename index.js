const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
const finelinApiIdLista = require('./finelinApiIdLista')
const Elintarvike = require('./mongo')
const { count } = require('./mongo')
const { fetchData } = require('./fetchFineli')
const { raakaAineidenHakusanalistat } = require('./raakaAineidenHakusanat')
const { request } = require('express')
// fetchData()
// käynnistä komennolla npm run dev

function tarkastaOnkoDuplikaatteja(array) {
    return new Set(array.map(item => item["name_fi"])).size !== array.length
}

const haeElintarvikkeetRaakaAineenmukaan = async (ingredientClass) => {
    let elinarvikkeetRaakaAineenMukaan = await Elintarvike.find({ ingredient_class: ingredientClass })
    return elinarvikkeetRaakaAineenMukaan
}

const arvoListaltaSatunnaiset = (listaElintarvikkeista, numero) => {
    let lista = []
    let kaytetytIndeksit = []

    for (let i = 0; i < numero; i++) {
        const randomIndeksi = (Math.random() * listaElintarvikkeista.length).toFixed(0)
        if (!kaytetytIndeksit.includes(randomIndeksi)) {
            lista.push(listaElintarvikkeista[randomIndeksi])
            kaytetytIndeksit.push(randomIndeksi)
        } else {
            i--
        }
    }
    return lista
}

app.get('/', (req, res) => {
    res.send(
        <h1>REST API</h1>,
        <h3>https://elintarvikepeli.herokuapp.com</h3>,

        <p>Hae satunnainen elintarvike: </p>,
        <h3>/random</h3>,

        <p>Hae tietty määrä satunnaisia elintarvikkeita:</p>,
        <h3>/howmany/{lukumäärä}</h3>,

        <p>Hae tietty määrä satunnaisia elintarvikkeita tietyn elintarvikekategorian perusteella.</p>,
        <h4>Elintarvikekategoriat: </h4>,
        <ul>
            <li>meat</li>
            <li>fruit</li>
            <li>vegetable</li>
            <li>dairy</li>
            <li>grain</li>
            <li>dish</li>
            <li>drink</li>
            <li>sweet</li>
            <li>alcohol</li>
        </ul>,
        <h3>/howmany/ingredient/{lukumäärä}/{elintarvikekategoria}</h3>,

        <p>Hae tietty määrä satunnaisia elintarvikkeita tietyn erikoisruokavalion perusteella:</p>,
        <h4>Erikoisruokavaliot:</h4>,
        <ul>
            <li>CHOLFREE (kolesteroliton)</li>
            <li>GLUTFREE (gluteeniton)</li>
            <li>HIGHFIBR (runsaskuituinen)</li>
            <li>LACSFREE (laktoositon)</li>
            <li>LACOVEGE (lakto-ovovegetaarinen)</li>
            <li>LOWFAT (vähärasvainen)</li>
            <li>VEGAN (vegaaninen)</li>
        </ul>,
        <h3>/howmany/diet/{lukumäärä}/{erikoisruokavalio}</h3>
    )
})

app.get('/random', async (request, response) => {
    const random_int = Math.floor(Math.random() * await Elintarvike.collection.count())
    const haettava = finelinApiIdLista[random_int]
    try {
        const elintarvike = await Elintarvike.find({ "api_id": `${haettava}` })
        response.json(elintarvike)
    } catch (error) {
        console.log(error)
    }
})

// lista satunnaisia elintarvikkeita
app.get('/howmany/:number', async (request, response) => {
    try {
        let onkoDuplikaatteja = true
        while (onkoDuplikaatteja) {
            kortit = await Elintarvike.aggregate([{ $sample: { size: parseInt(request.params.number) } }])
            onkoDuplikaatteja = tarkastaOnkoDuplikaatteja(kortit)
        }
        response.json(kortit)
    } catch (error) {
        console.log("ERROR", error)
    }
})

// elintarvikkeet koostetun raaka-aineluokan mukaan
app.get('/howmany/ingredient/:number/:ingredientclass', async (request, response) => {
    try {
        const hakusanalista = raakaAineidenHakusanalistat[request.params.ingredientclass]
        let kaikkiElintarvikkeet = []
        for (let i = 0; i < hakusanalista.length; i++) {
            let lisays = await haeElintarvikkeetRaakaAineenmukaan(hakusanalista[i])
            lisays.map(lisattava => kaikkiElintarvikkeet.push(lisattava))
        }
        const raakaAineidenMaara = request.params.number
        const lopullinenLista = arvoListaltaSatunnaiset(kaikkiElintarvikkeet, raakaAineidenMaara)
        response.json(lopullinenLista)
    } catch (error) {
        console.log("ERROR", error)
    }
})

// elintarvikkeet ruokavalion mukaan
app.get('/howmany/diet/:number/:specialdiet', async (request, response) => {
    let elinarvikkeetRuokavalionMukaan = await Elintarvike.find({ special_diets: request.params.specialdiet.toUpperCase() })
    const lopullinenLista = arvoListaltaSatunnaiset(elinarvikkeetRuokavalionMukaan, request.params.number)
    response.json(lopullinenLista)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
