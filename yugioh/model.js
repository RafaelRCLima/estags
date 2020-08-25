import mongoose from 'mongoose'
const Schema = mongoose.Schema

let cardSchema = new Schema({
    card: Object
},{ 
  timestamps: true 
})

cardSchema.method('toClient', function () {
  const card = {}

  return card
})


mongoose.model('Card', cardSchema)

export default mongoose.model('Card')