# RabbitMQ

Serviço de mensageria que utiliza o protocolo AMQP (Advanced Message Queuing Protocol) para transporte de dados

Publisher/Subscriber

Pode ser diferente dependendo do contexto
Também chamado de Producer
Publica/Envia mensagens

Fila

Uma fila é o local para onde são enviados os dados do publisher
É limitada apenas pelo tamanho do disco e memória do host
Muitos Producers podem enviar dados para uma fila
Muitos Consumers podem receber dados de uma fila

Receiver
Responsável por consumir os dados enviados pelo subscriber
Também chamado de Consumer


## Hello World com RabbitMQ

#### app.js

```
var amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost:5672', function (err, conn) {
    conn.createChannel(function (err, ch) {
        var q = 'hello' // Nome do canal
        var msg = 'Hello World 123!' // Mensagem a ser enviada.
        ch.assertQueue(q, { durable: false }) // Passando o nome da fila para a conexão com o RabbitMQ.
        ch.sendToQueue(q, new Buffer(msg)) // Criando nova instancia de Buffer e enviando a mensagem com a configuração de qual fila deve recebê-la.
        console.log(" [x] Sent %s", msg)
    })
    setTimeout(function () {
      conn.close()
      process.exit(0) }, 500)
})
```

#### worker.js

```
var amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost:5672', function (err, conn) {
    conn.createChannel(function (err, ch) {
        var q = 'hello'

        ch.assertQueue(q, { durable: false })
        ch.prefetch(1)
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q)
        ch.consume(q, function (msg) { // Responsável pelo consumo das mensagens enviadas em app.js
            console.log(" [x] Received %s", msg.content.toString())
        }, { noAck: true })
    })
})
```
