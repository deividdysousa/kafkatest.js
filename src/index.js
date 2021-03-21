import { Kafka } from "kafkajs"



(async () => {

    const kafka = new Kafka({
        clientId: 'kafktest',
        brokers: ['192.168.0.104:29092']
    })

    const producer = kafka.producer()
    //const consumer = kafka.consumer()

    await producer.connect()
    console.log('conected')

    await producer.send({
        topic: 'meu-topico-legal',
        messages: [
            { value: 'Hello KafkaJS user!' }
        ]
    })
    console.log('sender')

    await producer.disconnect()

})().catch(console.error)