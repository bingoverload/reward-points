const router = require('express').Router()
const {User} = require('../model')

router.get('/', async (req, res) => {
  return res.send({message: 'Server Response ok/200'})
})

router.get("/getTransaction", async (req, res) => {
  try {
      const allTransaction = await User.find({}).populate('transactions')
      let newTransaction = allTransaction.map(item => item.transactions)
      return res.status(200).send(newTransaction)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
})

module.exports = router