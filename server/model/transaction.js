const mongoose = require("mongoose") 
const Schema = mongoose.Schema

const transactionSchema = new Schema({
  months: {type: Array, required: true}
})

const Transaction = mongoose.model("Transaction", transactionSchema)
module.exports = Transaction
