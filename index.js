const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors()) // saadaan tarjottua dataa eri lokaatioissa toimiviin sovelluksiin
const id_lista = require('./api_idt') // lista, jossa Finelin Elintarvike2 id:t
const Elintarvike2 = require('./mongo2') // eri tiedostossa oleva Elintarvike2-olion määrittely. Kuvaus, miten tietoa tallennetaan tietokantaan.
const { count } = require('./mongo2') // ominaisuus
const { fetchData } = require('./fetchFineli2')
const {searchArrays} = require('./ingredientSearchWords')
//fetchData()

// käynnistä komennolla npm run dev, jotta päästään hyödyntämään nodemonia kehityksessä

// palauttaa kaikki elintarvikkeet (ei tarvita tällä hetkellä, poistetaan tai muutetaan asynciksi)
app.get('/api/elintarvikkeet', (request, response) => {
    Elintarvike2.find({}).then(elintarvikkeet => {
        response.json(elintarvikkeet)
    })
})

// palauttaa Elintarvike2en, MongoDB-id:n perusteella (ei tarvita tällä hetkellä, poistetaan tai muutetaan asynciksi)
app.get('/api/elintarvikkeet/:id', (request, response) => {
    Elintarvike2.findById(request.params.id)
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
    const random_int = Math.floor(Math.random() * await Elintarvike2.collection.count())
    const haettava = id_lista[random_int]
    try {
        const elintarvike = await Elintarvike2.find({ "api_id": `${haettava}` })
        response.json(elintarvike)
    } catch (error) {
        console.log(error)
    }
})

// tarkastaa ettei randomoidussa Elintarvike2listassa ole duplikaatteja
function checkIfDuplicateExists(array) {
    return new Set(array.map(item => item["name_fi"])).size !== array.length
    //return new Set(w).size !== w.length
}

// palauttaa halutun määrän satunnaisia elintarvikkeita
app.get('/howmany/:number', async (request, response) => {
    try {
        let is_duplicates = true
        while (is_duplicates) {
            cards = await Elintarvike2.aggregate([{ $sample: { size: parseInt(request.params.number) } }])
            is_duplicates = checkIfDuplicateExists(cards)
        }
        response.json(cards)
    } catch (error) {
        console.log("ERROR", error)
    }
})

// hakee yhden elintarvikeclassin
const getElintarvikkeetByIngredientClass = async (ingredientClass) => {
    let elinarvikkeetByIngredient = await Elintarvike2.find({ ingredient_class: ingredientClass })
    //let elinarvikkeetByIngredient = await Elintarvike2.find({ ingredient_class: request.params.ingredientclass.toUpperCase() })
    console.log("MONTAKO ELINTARVIKETTA LUOKASSA", elinarvikkeetByIngredient.length)
    return elinarvikkeetByIngredient
}

// palauttaa halutun määrän elintarvikkeita ingredientclassin mukaan TEE

app.get('/howmany/ingredient/:number/:ingredientclass', async (request, response) => {
    //const meat = ["FISH", "FISHPROD", "SHELLFIS","INSECT","BEEF","PORK", "LAMM", "POULTRY","SAUSAGE", "SAUSCUTS","MEATCUTS","MEATPROD","GAME","OFFAL","EGG","EGGOTH"]
    const hakusanalista = searchArrays[request.params.ingredientclass]
    let all_ingredients= []
        for(let i = 0; i < hakusanalista.length; i++) {
            console.log("HAKIS arvo", hakusanalista[i])
            let lisays = await getElintarvikkeetByIngredientClass(hakusanalista[i])
            lisays.map(l => all_ingredients.push(l))
    }

    // TEE RANDOMOINTI !!!!!!!!!!
    console.log("LISTAN PITUUS", all_ingredients.length)
    //console.log("MEAT LENGHT", meat.length)
    //console.log(all_ingredients)
    response.json(all_ingredients)



    /*console.log("montako", elinarvikkeetByIngredient.length)
    let lista = []
    for (let i = 0; i < request.params.number; i++) {
        let elintarvike = elinarvikkeetByIngredient[Math.floor(Math.random() * elinarvikkeetByIngredient.length)]
        if (!lista.includes(elintarvike)) {
            lista.push(elintarvike)
        } else {
            i--
        }
    }
    console.log("MONTAKO PALAUTETAAN", lista.length)
    response.json(lista)*/
})

// palauttaa halutun määrän elintarvikkeita ruokavalion mukaan TEE
app.get('/howmany/diet/:number/:specialdiet', async (request, response) => {
    let elinarvikkeetByDiet = await Elintarvike2.find({ special_diets: request.params.ingredientclass.toUpperCase() })
    console
    try {
        let is_duplicates = true
        while (is_duplicates) {
            cards = await Elintarvike2.aggregate([{ $sample: { size: parseInt(request.params.number) } }])
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