import Mongoose from 'mongoose'

const mongooseOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

Mongoose.connect(
  'mongodb://localhost:27017/yugioh', 
  mongooseOptions
)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err))


export default Mongoose