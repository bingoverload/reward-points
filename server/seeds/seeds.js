const db = require('../config/connect')
const {transactionSeed} = require('./transactionSeeds')
const {userSeed} = require('./userSeeds')

db.once("open", async () => {
    try {
        await userSeed()
        await transactionSeed()
        console.log("All data seeded")
      process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
})