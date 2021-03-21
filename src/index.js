import { Kafka } from "kafkajs"



(async () => {

    const kafka = new Kafka({
        clientId: 'kafktest',
        brokers: ['192.168.0.104:29092']
    })

    const producer = kafka.producer()
    const consumer = kafka.consumer({ groupId: 'consumer-group-1' })

    await consumer.connect()
    await producer.connect()
    console.log('conected')

    // escuta desde o inicio
    await consumer.subscribe({ topic: 'meu-topico-legal', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => console.log('meu-topico-legal:', message.value.toString()),
    })
    console.log('listened')

    await producer.send({
        topic: 'meu-topico-legal',
        messages: [
            { value: 'Hello KafkaJS user!' }
        ]
    })
    console.log('sender')

    await producer.disconnect()

})().catch(console.error)