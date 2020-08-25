import { Router } from 'express'
const router = new Router()

router.get('/home', (req, res) => {
  res.json({
    message: "Let's duel"
  })
})

export default router
