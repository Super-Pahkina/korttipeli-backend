const express = require('express')
const app = express()

app.use(express.json()) // saadaan lähetettyä dataa bodyssä
const fetch = require('node-fetch') // saadaan dataa apista

let elintarvikkeet = [
    {
        id: 33128,
        type: {
            code: "FOOD",
            description: {
                fi: "Raaka-aine",
                sv: "RÃ¥vara",
                en: "Food"
            },
            abbreviation: {
                fi: "Raaka-aine",
                sv: "RÃ¥vara",
                en: "Food"
            }
        },
        name: {
            fi: "PÃ¤hkinÃ¤, chilipÃ¤hkinÃ¤",
            sv: "NÃ¶t, chilinÃ¶t",
            en: "Nut, Chili Nut",
            la: ""
        },
        preparationMethod: {
            code: "DRIE",
            description: {
                fi: "Kuivattu",
                sv: "Torkat",
                en: "Dried"
            },
            abbreviation: {
                fi: "Kuivattu",
                sv: "Torkat",
                en: "Dried"
            }
        },
        ediblePortion: 100,
        specialDiets: [
            "UNSWEET",
            "LACVEGE",
            "HIGHSALT",
            "LACOVEGE",
            "EGGFREE"
        ],
        themes: [],
        units: [
            {
                code: "TL",
                description: {
                    fi: "teelusikka",
                    sv: "tesked",
                    en: "teaspoon"
                },
                abbreviation: {
                    fi: "tl",
                    sv: "tesked",
                    en: "teaspoon"
                },
                mass: 3
            },
            {
                code: "RKL",
                description: {
                    fi: "ruokalusikka",
                    sv: "matsked",
                    en: "tablespoon"
                },
                abbreviation: {
                    fi: "rkl",
                    sv: "matsked",
                    en: "tablespoon"
                },
                mass: 9
            },
            {
                code: "DL",
                description: {
                    fi: "desilitra",
                    sv: "deciliter",
                    en: "decilitre"
                },
                abbreviation: {
                    fi: "dl",
                    sv: "dl",
                    en: "dl"
                },
                mass: 60
            },
            {
                code: "KPL_M",
                description: {
                    fi: "keskikokoinen (kpl)",
                    sv: "medelstort stycke",
                    en: "medium-sized piece"
                },
                abbreviation: {
                    fi: "keskikokoinen kpl",
                    sv: "medelstort st.",
                    en: "medium-sized piece"
                },
                mass: 1
            },
            {
                code: "PORTL",
                description: {
                    fi: "iso annos",
                    sv: "stor portion",
                    en: "big portion"
                },
                abbreviation: {
                    fi: "iso annos",
                    sv: "stor portion",
                    en: "big portion"
                },
                mass: 100
            },
            {
                code: "PORTM",
                description: {
                    fi: "keskikokoinen annos",
                    sv: "medelstor portion",
                    en: "medium-sized portion"
                },
                abbreviation: {
                    fi: "keskikokoinen annos",
                    sv: "medelstor portion",
                    en: "medium-sized portion"
                },
                mass: 50
            },
            {
                code: "PORTS",
                description: {
                    fi: "pieni annos",
                    sv: "liten portion",
                    en: "small portion"
                },
                abbreviation: {
                    fi: "pieni annos",
                    sv: "liten portion",
                    en: "small portion"
                },
                mass: 20
            },
            {
                code: "PORT1000KJ",
                description: {
                    fi: "Annoksen koko, joka vastaa 1000kJ",
                    sv: "Portion som motsvarar 1000kJ energi",
                    en: "Portion equivalent with 1000 kJ energy"
                },
                abbreviation: {
                    fi: "Annos 1000kJ",
                    sv: "Portion med 1000kJ",
                    en: "Portion of 1000kJ"
                },
                mass: 49.22
            },
            {
                code: "G",
                description: {
                    fi: "gramma",
                    sv: "gram",
                    en: "gram"
                },
                abbreviation: {
                    fi: "g",
                    sv: "g",
                    en: "g"
                },
                mass: 1
            }
        ],
        ingredientClass: {
            code: "NUTSEED",
            description: {
                fi: "PÃ¤hkinÃ¤t, siemenet",
                sv: "NÃ¶tter, frÃ¶n",
                en: "Nuts and seeds"
            },
            abbreviation: {
                fi: "PÃ¤hkinÃ¤t, siemenet",
                sv: "NÃ¶tter, frÃ¶n",
                en: "Nuts and seeds"
            }
        },
        functionClass: {
            code: "SNACKSAV",
            description: {
                fi: "Suolaiset naposteltavat",
                sv: "",
                en: "Savoury snacks"
            },
            abbreviation: {
                fi: "Suolaiset naposteltavat",
                sv: "",
                en: "Savoury snacks"
            }
        },
        salt: 2772.82344498946,
        alcohol: 0,
        energyKcal: 485.3860626708132,
        fat: 29.6334998248294,
        protein: 14.7135001530461,
        carbohydrate: 38.1520001521353,
        organicAcids: 0,
        saturatedFat: 6.44468431470473,
        sugar: 3.42499991544522,
        sugarAlcohol: 0,
        fiber: 4.57200000035763,
        energy: 2031.72898112749
    },
    {
        id: 33129,
        type: {
            code: "FOOD",
            description: {
                fi: "Raaka-aine",
                sv: "RÃ¥vara",
                en: "Food"
            },
            abbreviation: {
                fi: "Raaka-aine",
                sv: "RÃ¥vara",
                en: "Food"
            }
        },
        name: {
            fi: "Jogurtti, lohkeava luonnonjogurtti, rasvaa 5,5 %, laktoositon",
            sv: "Yoghurt, naturell, laktosfri, fett 5,5%, valio eila lohkeava",
            en: "Yoghurt, Natural, Fat 5.5%, Lactose-Free",
            la: ""
        },
        preparationMethod: {
            code: "IND",
            description: {
                fi: "Teollinen",
                sv: "Industriellt",
                en: "Industrial"
            },
            abbreviation: {
                fi: "Teollinen",
                sv: "Industriellt",
                en: "Industrial"
            }
        },
        ediblePortion: 100,
        specialDiets: [
            "SOYAFREE",
            "UNSWEET",
            "NAGLUFRE",
            "LACSFREE",
            "SALTFREE",
            "LACVEGE",
            "GLUTFREE",
            "LACOVEGE",
            "LOWLACS",
            "EGGFREE"
        ],
        themes: [],
        units: [
            {
                code: "DL",
                description: {
                    fi: "desilitra",
                    sv: "deciliter",
                    en: "decilitre"
                },
                abbreviation: {
                    fi: "dl",
                    sv: "dl",
                    en: "dl"
                },
                mass: 100
            },
            {
                code: "RKL",
                description: {
                    fi: "ruokalusikka",
                    sv: "matsked",
                    en: "tablespoon"
                },
                abbreviation: {
                    fi: "rkl",
                    sv: "matsked",
                    en: "tablespoon"
                },
                mass: 15
            },
            {
                code: "TL",
                description: {
                    fi: "teelusikka",
                    sv: "tesked",
                    en: "teaspoon"
                },
                abbreviation: {
                    fi: "tl",
                    sv: "tesked",
                    en: "teaspoon"
                },
                mass: 5
            },
            {
                code: "KPL_VALM",
                description: {
                    fi: "Valmistaja (kpl)",
                    sv: "Producent (stycke)",
                    en: "Manufacturer (piece)"
                },
                abbreviation: {
                    fi: "Valmistaja (kpl)",
                    sv: "Producent (stycke)",
                    en: "Manufacturer (piece)"
                },
                mass: 150
            },
            {
                code: "PORTS",
                description: {
                    fi: "pieni annos",
                    sv: "liten portion",
                    en: "small portion"
                },
                abbreviation: {
                    fi: "pieni annos",
                    sv: "liten portion",
                    en: "small portion"
                },
                mass: 100
            },
            {
                code: "PORTM",
                description: {
                    fi: "keskikokoinen annos",
                    sv: "medelstor portion",
                    en: "medium-sized portion"
                },
                abbreviation: {
                    fi: "keskikokoinen annos",
                    sv: "medelstor portion",
                    en: "medium-sized portion"
                },
                mass: 150
            },
            {
                code: "PORTL",
                description: {
                    fi: "iso annos",
                    sv: "stor portion",
                    en: "big portion"
                },
                abbreviation: {
                    fi: "iso annos",
                    sv: "stor portion",
                    en: "big portion"
                },
                mass: 200
            },
            {
                code: "PORT1000KJ",
                description: {
                    fi: "Annoksen koko, joka vastaa 1000kJ",
                    sv: "Portion som motsvarar 1000kJ energi",
                    en: "Portion equivalent with 1000 kJ energy"
                },
                abbreviation: {
                    fi: "Annos 1000kJ",
                    sv: "Portion med 1000kJ",
                    en: "Portion of 1000kJ"
                },
                mass: 288.05
            },
            {
                code: "G",
                description: {
                    fi: "gramma",
                    sv: "gram",
                    en: "gram"
                },
                abbreviation: {
                    fi: "g",
                    sv: "g",
                    en: "g"
                },
                mass: 1
            }
        ],
        ingredientClass: {
            code: "YOGHURHI",
            description: {
                fi: "Jogurtit, rasvaa > 1 %",
                sv: "Yoghurt > 1 %",
                en: "Yoghurt > 1 %"
            },
            abbreviation: {
                fi: "Jogurtit, rasvaa > 1 %",
                sv: "Yoghurt > 1 %",
                en: "Yoghurt > 1 %"
            }
        },
        functionClass: {
            code: "YOGHURT",
            description: {
                fi: "Jogurtit",
                sv: "Yoghurt",
                en: "Yoghurt"
            },
            abbreviation: {
                fi: "Jogurtit",
                sv: "Yoghurt",
                en: "Yoghurt"
            }
        },
        salt: 254.800003051758,
        alcohol: 0,
        energyKcal: 82.93755164176716,
        fat: 5.50099983811378,
        protein: 3.79999995231628,
        carbohydrate: 4.5,
        organicAcids: 0.194199997100234,
        saturatedFat: 3.57258517628293,
        sugar: 4.5,
        sugarAlcohol: 0,
        fiber: 0,
        energy: 347.160003662109
    }
]

const makeIndex = () => {
    const biggest = 10
    index = Math.round(Math.random() * biggest)
    return index
}

const fetchData = () => {
    let elint = [] //yksi elintarvike haetaan APISTA
    const index = 1
    console.log("RESULT INDEX", index)
    const url = `https://fineli.fi/fineli/api/v1/foods?q=${index}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            //console.log("PITUUS", data.length)
            console.log("DATA FETCHISSÄ", data)
            elint = data
            //console.log("ELINT", elint)
            //setTimeout(data, 2000)
            console.log("ELINT FETCHISSÄ", elint)
            //console.log("ELINT ENNEN RETURNIA", elint)
            return elint.json()
        })
        .catch(err => console.log(err))

        return elint

}

let kissa = fetchData()
.then(console.log("KISSA", kissa))

/*const luuppaaKunnesIndeksiSaaVastauksen = () => {

    // EI TOIMI WHILE LIIAN NOPEE??

    //let elint = []
    let elint = [{name:"pahkina"}]
    console.log("Fetchdata", fetchData()
    )

    while(true) {
        elint = fetchData()
        console.log("ELINT WHILESSÄ", elint)
        if(elint.length > 0) {
            return elint
        } 
        //console.log("TERVE")
    }
} */

//let list = luuppaaKunnesIndeksiSaaVastauksen()



app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/elintarvikkeet', (req, res) => {
    res.json(elintarvikkeet)
})

app.get('/api/elintarvikkeet/:id', (request, response) => {
    const id = Number(request.params.id)
    const elintarvike = elintarvikkeet.find(elintarvike => elintarvike.id === id)

    if (elintarvike) {
        response.json(elintarvike)
    } else {
        response.status(404).end()
        // lisää tähän haku netistä ???
    }
})

/*app.delete('/api/notes/:id', (request, response) => {
const id = Number(request.params.id)
notes = notes.filter(note => note.id !== id)

response.status(204).end()
})*/

app.post('/api/elintarvikkeet', (request, response) => {
    //luodaan elintarvikkeelle id
    const maxId = elintarvikkeet.length > 0
        ? Math.max(...elintarvikkeet.map(e => e.id))
        : 0

    const elintarvike = request.body
    elintarvike.id = maxId + 1

    elintarvikkeet = elintarvikkeet.concat(elintarvike)
    //console.log(elintarvike)

    response.json(elintarvike)
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)