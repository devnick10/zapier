import { client } from "@repo/db";
import { Kafka } from "kafkajs";
import { Topic } from "@repo/events";
import type { JsonObject } from "../../packages/db/generated/prisma/internal/prismaNamespace";

const kafka = new Kafka({
    clientId: "outbox-proccesor",
    brokers: ["localhost:9092"]
})


async function main() {
    const producer = kafka.producer()
    await producer.connect();

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

            if (!message.value?.toString()) return;

            const parsedData = JSON.parse(message.value?.toString())

            const zapRunId = parsedData.zapRunId;
            const stage = parsedData.stage;

            const zapRunDetails = await client.zapRun.findUnique({
                where: {
                    id: zapRunId
                },
                include: {
                    zap: {
                        include: {
                            action: {
                                include: {
                                    type: true
                                }
                            }
                        }
                    }
                }
            })

            const currentAction = zapRunDetails?.zap.action.find(a => a.sortingOrder === stage)
            if (!currentAction) {
                console.error("Current action not found!, data: ", currentAction)
                return;
            }

            if (currentAction.type.name === "email") {
                const to = (currentAction.metadata as JsonObject)?.to;
                const body = (currentAction.metadata as JsonObject)?.body;
                // sendMail({
                //     to,
                //     body
                // })
                console.log("sending mail ")
            }
            if (currentAction.type.name === "solana") {
                const to = (currentAction.metadata as JsonObject)?.to;
                const amount = (currentAction.metadata as JsonObject)?.amount;
                // sendSolana({
                //     to,
                //     amount
                // })
                console.log("sending Solana")
            }

            // check is it last stage if yes then stop action execution;
            const isLastStage = (zapRunDetails?.zap.action.length || 1) - 1;
            if (isLastStage === stage) {
                console.log("All action executed of zapRunId:", zapRunId)
                return;
            }

            // update the stage to + 1 and publish again .
            producer.send({
                topic: Topic.TOPIC_NAME,
                messages: [{
                    value: JSON.stringify({ zapRunId, stage: stage + 1 })
                }]
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