import mongoose from 'mongoose'
import mongoosastic from 'mongoosastic'
import elasticClient from './config/elasticsearch'

const Schema = mongoose.Schema

let cardSchema = new Schema({
    name: { type: String, es_indexed: true },
    type: { type: String, es_indexed: true },
    desc: String,
    atk: { type: String, es_indexed: true },
    def: { type: String, es_indexed: true },
    level: { type: String, es_indexed: true },
    race: String,
    attribute: String,
    archetype: String,
    imageUrl: String
},{ 
  timestamps: true 
})

cardSchema.method('toClient', function () {
  const card = {}

  return card
})


mongoose.model('Card', cardSchema)
cardSchema.plugin(mongoosastic, { elasticClient })

export default mongoose.model('Card')
