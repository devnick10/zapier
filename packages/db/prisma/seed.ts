import { client } from "..";

async function main() {
    await client.availableAction.createMany({
        data: [
            {
                image: "https://www.citypng.com/public/uploads/preview/png-round-email-red-icon-symbol-701751695032778p8dchvjdv5.png",
                name: "email",
            },
            {
                image: "https://thumbs.dreamstime.com/b/solana-sol-token-symbol-cryptocurrency-logo-circle-coin-icon-isolated-white-background-vector-illustration-222245595.jpg",
                name: "solana",
            }
        ]
    })
    await client.availableTrigger.create({
        data: {
            image: "https://cdn-icons-png.flaticon.com/128/919/919829.png",
            name: "webhook",
        }
    })
}
main()