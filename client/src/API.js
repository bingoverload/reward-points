import Axios from 'axios'

const getTransaction = async () => {
    const  allTransaction = await Axios.get('/getTransaction')
    return allTransaction
}

export default {getTransaction}