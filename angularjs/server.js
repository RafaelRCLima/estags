const app = require('./src/app')
const http = require('http')

http.createServer(app).listen(3030, function() {
  console.log('Servidor rodando na porta 3030')
})
