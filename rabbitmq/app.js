var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost:5672', (err, conn) => {
    conn.createChannel((err, ch) => {
        var q = 'hello'; // Channel name
        var msg = 'Hello World 123!'; // Message to be sent
        ch.assertQueue(q, { durable: false }); // Passing the queue name for RabbitMQ connection  
        ch.sendToQueue(q, new Buffer(msg)); // 
        console.log(" [x] Sent %s", msg);
    });
    setTimeout(() => { 
        conn.close()
        process.exit(0) }, 500);
})
