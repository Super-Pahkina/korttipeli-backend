const mongoose = require('mongoose')
//const password_file = require('./salasanat')
//const password = password_file.password
const uri = process.env.MONGODB_URI;

//const uri =
//  `mongodb+srv://korttipeli:${password}@korttipeli.utv91.mongodb.net/elintarvikedata_laajennettu?retryWrites=true&w=majority`

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
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
  salt: Number,
  ingredient_class: String,
  special_diets: [{ type: String }],
  jokeri: Boolean,
  pommi: Boolean

})

const Elintarvike2 = mongoose.model('Elintarvike', elintarvikeSchema)
module.exports = Elintarvike2