require('dotenv').config()
const chai = require('chai')
const expect = require('chai').expect
const ChaiHttp = require('chai-http')
const mongoose = require('mongoose')
const transactionRoutes = require('../routes/transactionRoutes')

chai.use(ChaiHttp)

describe('Test connection to mongoose', () => {
    it('Check MongoDb Connection', (done) => {
        mongoose.connect(process.env.MONGOKEY)
        const db = mongoose.connection
        db.on('error', console.error.bind(console, 'Connection error'))
        db.once('Open', () => {
            console.log('Connected to database')
        })
        done()
    })
})

describe('Should connect to express port', () => {
    it('Check Express Port', (done) => {
        chai.request(transactionRoutes)
        .get('/')
        .end((error, res) => {
            if(error) {
                console.log(error)
            } else {
                chai.assert.equal(res.status, 200, 'Port connected')
                console.log('Passed')
                return
            }
        })
        done()
    })
})

describe('Should get all transaction in database', () => {
    it('Get Transaction', (done) => {
        chai.request(transactionRoutes)
        .get('/getTransaction')
        .end((error, res) => {
            if(error) {
                console.log(error)
                expect(500)
            } else {
                chai.assert.equal(res.status, 200, 'Got all transactions')
                console.log('Passed')
                return
            }
        })
        done()
    })
})

describe('Should get all months in transaction database', () => {
    it('Get Transaction data', (done) => {
        chai.request(transactionRoutes)
        .get('/getTransaction')
        .end((error, res) => {
            if(error) {
                console.log(error)
                expect(500)
            } else {
                expect(res.body).to.have.property('months')
                console.log('Passed')
                return
            }
        })
        done()
    })
})

describe('Checking if value returned is correct from database', () => {
    let months = [[100, 300, 200], [340, 0, 150], [400, 280, 90]]
    it('Check database response value', (done) => {
        chai.request(transactionRoutes)
        .get('/getTransaction')
        .end((error, res) => {
            if(error) {
                console.log(error)
                expect(500)
            } else {
                expect(res.body).to.have.property('months', months)
                console.log('Passed')
                return
            }
        })
        done()
    })
})

