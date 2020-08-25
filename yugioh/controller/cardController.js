import Card from '../model'
import bent from 'bent'

let cardController = {
  create: async (req, res) => {
    const myCard = await Card.create({
      card: req.body.card
    })
    return res.json(myCard)
  },

  read: async (req, res) => {
    const myCards = await Card.find()

    return res.json(myCards)
  },

  loadData: async (req, res) => {
    const getJSON = bent('json')
    let allCards = await getJSON('https://db.ygoprodeck.com/api/v5/cardinfo.php')
    try {
      allCards.forEach(async function(card) {
        await Card.create({
          card: card
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
