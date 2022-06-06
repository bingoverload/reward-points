const {Transaction} = require('../model')

const transaction = [
    {
        months: [[100, 300, 200], [340, 0, 150], [400, 280, 90]]
    }
]

const transactionSeed = async () => {
    try {
        await Transaction.deleteMany({});
        const transactions = await Transaction.insertMany(transaction);
        console.log(transactions);
        return;
    } catch (error) {
        console.log(error);
        return;
    }
}

module.exports = {transactionSeed};