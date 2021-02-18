const mongoose = require('mongoose')
const password_file = require('./salasanat')
const password = password_file.password

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

//module.exports = mongoose.model('Elintarvike', elintarvikeSchema)
const Elintarvike = mongoose.model('Elintarvike', elintarvikeSchema)
module.exports = Elintarvike
/*const elint = new Elintarvike({
  nimi: 'juusto',
  api_id: '12',
  suola: '122',
  rasva: '1222',
  proteiini: '222',
  sokeri: '6566',
  energia: '666',
  hiilihydraatti: '777',
  kuitu: '555'
})*/

/*elint.save().then(response => {
  console.log('elint saved!')
  mongoose.connection.close()
})*/

/*Elintarvike.find({}).then(result => {
    result.forEach(elint => {
      console.log(elint)
    })
    mongoose.connection.close()
  })*/

  //module.exports()