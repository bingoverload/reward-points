const mongoose = require("mongoose") 
const Schema = mongoose.Schema

const userSchema = new Schema({
  user: {type: String, required: true},
  transactions: { type: Schema.Types.ObjectId, ref: "Transaction" },
})

const User = mongoose.model("User", userSchema)
module.exports = User
