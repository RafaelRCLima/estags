import Card from '../model'
import bent from 'bent'
import elasticClient from '../config/elasticsearch'

let cardController = {
  create: async (req, res) => {
    const myCard = await Card.create({
      card: req.body.card
    })
    return res.json(myCard)
  },

  read: async (req, res) => {
    const myCards = await Card.find()

    return res.json(myCards[52])
  },

  createDeck: async (req, res) => {
    function randomInt(min, max) {
      return min + Math.floor((max - min) * Math.random());
    }

    let deck = []

    const allCards = await Card.find()

    await allCards.forEach(function (card) {
      if (deck.length < 31 && card.race === 'Dragon') deck.push(card)
      if (deck.length < 36 && card.type === 'Spell Card') deck.push(card)
      if (deck.length < 41 && card.type === 'Trap Card') deck.push(card)
    })

    await deck.forEach(async function (card){
      await elasticClient.index({
        index: 'dragons-deck',
        body: {
          name: card.name,
          type: card.type,
          desc: 'my deck of dragons'
        }
      })
    })
    
    res.json(deck)
  },

  elasticTest: async (req, res) => {
    await elasticClient.indices.refresh({ index: 'dragons-deck' })

    const { body } = await elasticClient.search({
      index: req.body.index,
      body: {
        query: {
          match: req.body.search
        }
      }
    })

    console.log(body.hits.hits)
    res.json(body.hits.hits)
  },

  loadData: async (req, res) => {
    const getJSON = bent('json')
    let allCards = await getJSON('https://db.ygoprodeck.com/api/v5/cardinfo.php')
    try {
      allCards.forEach(async function(card) {
        await Card.create({
          name: card.name,
          type: card.type,
          desc: card.desc,
          atk: card.atk,
          def: card.def,
          level: card.level,
          race: card.race,
          attribute: card.attribute,
          archetype: card.archetype,
          imageUrl: card.card_images[0].image_url
        })
      })

      return res.json({ message: 'Dados inseridos' })
    } catch (err) {
      return res.json({
        error: err
      })
    }
  }
}

export default cardController
