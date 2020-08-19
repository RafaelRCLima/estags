const mongoose = require('mongoose')
const Schema = mongoose.Schema

let internSchema = new Schema({
    name: String,
    surname: String,
    language: String
},{ 
  timestamps: true 
})

internSchema.method('toClient', function () {
  const intern = {}

  return intern
})


mongoose.model('Intern', internSchema)

module.exports = mongoose.model('Intern')
