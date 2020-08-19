const { Router } = require('express')
const router = new Router()
const path = require('path')

router.get('/home', (req, res) => {
  res.json({ hello: 'world' })
})

router.all('/*', function(req, res) {
  res.sendFile(path.resolve('public/index.html'));
});

module.exports = router