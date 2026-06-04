import { client } from "@repo/db";
import { Kafka } from "kafkajs";
import { Topic } from "@repo/events";

const kafka = new Kafka({
    clientId: "outbox-proccesor",
    brokers: ["localhost:9092"]
})

const producer = kafka.producer();

async function main() {
    await producer.connect()
    while (1) {

        const pendingRows = await client.zapRunOutbox.findMany({take:10})

        await producer.send({
            topic: Topic.TOPIC_NAME,
            messages: pendingRows.map(row => ({
                value: row.zapRunId
            }))
        })

        await client.zapRunOutbox.deleteMany({
            where: {
                id: { in: pendingRows.map((r) => (r.id)) }
            }
        })
    }
}
main();