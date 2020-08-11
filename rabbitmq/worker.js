var amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost:5672', (err, conn) => {
    conn.createChannel((err, ch) => {
        var q = 'hello'

        ch.assertQueue(q, { durable: false })
        ch.prefetch(1)
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q)
        ch.consume(q, (msg) => {
            console.log(" [x] Received %s", msg.content.toString())
        }, { noAck: true })
    })
})