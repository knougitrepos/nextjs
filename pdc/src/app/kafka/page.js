const ip = require('ip')

const {Kafka, CompressionTypes, logLevel} = require('kafkajs')

const host = process.env.HOST_IP || ip.address()

const kafka = new Kafka({
    brokers: ['localhost:9092'],
    clientId: 'kafka1',
    authenticationTimeout: 10000,
    reauthenticationThreshold: 10000,
    connectionTimeout:5000,
    retry: {
        initialRetryTime: 100,
        retries: 8
    },
    logLevel: logLevel.ERROR
})

const topic = 'topic-test2'
const producer = kafka.producer()

const getRandomNumber = () => Math.round(Math.random(10) * 1000)
const createMessage = num => ({
    key: `key-${num}`,
    value: `value-${num}-${new Date().toISOString()}`,
})

const sendMessage = () => {
    return producer
        .send({
            topic,
            compression: CompressionTypes.GZIP,
            messages: Array(getRandomNumber())
                .fill()
                .map(_ => createMessage(getRandomNumber())),
        })
        .then(console.log)
        .catch(e => console.error(`[example/producer] ${e.message}`, e))
}

const run = async () => {
    await producer.connect()
    setInterval(sendMessage, 3000)
}

run().catch(e => console.error(`[example/producer] ${e.message}`, e))

const errorTypes = ['unhandledRejection', 'uncaughtException']
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

errorTypes.forEach(type => {
    process.on(type, async () => {
        try {
            console.log(`process.on ${type}`)
            await producer.disconnect()
            process.exit(0)
        } catch (_) {
            process.exit(1)
        }
    })
})

signalTraps.forEach(type => {
    process.once(type, async () => {
        try {
            await producer.disconnect()
        } finally {
            process.kill(process.pid, type)
        }
    })
})


// const { Kafka, logLevel  } = require('kafkajs')
//
//
// const kafka= new Kafka({
//     clientId: 'kafka1',
//     brokers: ['kafka1:9092'],
//     // authenticationTimeout: 10000,
//     // reauthenticationThreshold: 10000,
//     retry: {
//         initialRetryTime: 100,
//         retries: 8
//     },
//     logLevel: logLevel.ERROR
// })
//
//
// const producer = kafka.producer()
//
// await producer.connect()
// await producer.send({
//     topic: 'test-topic',
//     messages: [
//         { value: 'Hello KafkaJS user!' },
//     ],
// })
//
// await producer.disconnect()


// const consumer = kafka.consumer({ groupId: 'test-group' })
//
// await consumer.connect()
// await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
//
// await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//         console.log({
//             value: message.value.toString(),
//         })
//     },
// })


// kafka.logger().setLogLevel(logLevel.WARN)
//
// const producer = kafka.producer()
// producer.logger().setLogLevel(logLevel.INFO)
//
// const consumer = kafka.consumer()
// consumer.logger().setLogLevel(logLevel.DEBUG)
//
// const admin = kafka.admin()
// admin.logger().setLogLevel(logLevel.NOTHING)
//


//
//
// let result=null
//
// const run = async () => {
//     // Producing
//     await producer.connect()
//     await producer.send({
//         topic: 'test-topic',
//         messages: [
//             { value: 'Hello KafkaJS user!' },
//         ],
//     })
//
//     // Consuming
//     await consumer.connect()
//     await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
//
//     await consumer.run({
//         eachMessage: async ({ topic, partition, message }) => {
//             console.log({
//                 partition,
//                 offset: message.offset,
//                 value: message.value.toString(),
//             })
//         },
//
//
//     })
// }
//
// run().catch(console.error)


export default function Page({params, searchParams}) {


    return <h1>kafka test </h1>
}