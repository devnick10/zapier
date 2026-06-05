import { client } from "@repo/db";
import { Kafka } from "kafkajs";
import { Topic } from "@repo/events";

const kafka = new Kafka({
    clientId: "outbox-proccesor",
    brokers: ["localhost:9092"]
})


async function main() {
    const consumer = kafka.consumer({ groupId: "main-worker" });
    await consumer.connect()
    await consumer.subscribe({
        topic: Topic.TOPIC_NAME,
        fromBeginning: true,
    })

    await consumer.run({
        autoCommit: false,
        eachMessage: async ({ partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value?.toString()
            })

            await new Promise(r => setTimeout(r, 3000));

            await consumer.commitOffsets([{
                topic: Topic.TOPIC_NAME,
                partition,
                offset: (parseInt(message.offset) + 1).toString()
            }])
        }
    })
}

main().catch(console.error)