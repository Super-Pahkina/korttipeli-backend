const mongoose = require('mongoose')
const password_file = require('./salasanat')
const password = password_file.password
//tässä filussa tietokantahommelit

const url =
  `mongodb+srv://korttipeli:${password}@korttipeli.utv91.mongodb.net/elintarvikedata?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message)
  })

const elintarvikeSchema = new mongoose.Schema({
  name_fi: String,
  api_id: Number,
  energyKcal: Number,
  fat: Number,
  protein: Number,
  carbohydrate: Number,
  fiber: Number,
  sugar: Number,
  salt: Number

})

const Elintarvike = mongoose.model('Elintarvike', elintarvikeSchema)
module.exports = Elintarvike