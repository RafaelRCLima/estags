const mongoose = require('mongoose')
const Schema = mongoose.Schema

let movieSchema = new Schema({
    plot: String,
    genres: Array,
    runtime: Number,
    cast: Array,
    num_mflix_comments: Number,
    title: String,
    fullplot: String,
    countries: Array,
    released: Date,
    directors: Array,
    rated: String,
    awards: Object,
    lastupdated: String,
    year: Number,
    imdb: Object,
    type: String,
    tomatoes: Object
},{ 
  timestamps: true 
})

movieSchema.method('toClient', function () {
  const movie = {}

  return movie
})


mongoose.model('Movie', movieSchema)

module.exports = mongoose.model('Movie')