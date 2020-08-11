const Mongoose = require('mongoose')

const mongooseOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

Mongoose.connect(
  'mongodb://mongo:27017/sample_mflix', 
  mongooseOptions
)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err))


module.exports = Mongoose