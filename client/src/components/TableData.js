import {useState, useEffect} from 'react'
import {Table, Thead, Tbody, Tr, Th, Td, TableContainer, Image} from '@chakra-ui/react'
import API from '../API'

const TableData = () => {
    const [displayData, setDisplayData] = useState([])
    const [total, setTotal] = useState([])

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await API.getTransaction()
                setDisplayData(response.data[0].months)
            } catch (error) {
                console.log(error + 'No transaction returned')
            }
        }
        fetch()
    }, [])

    useEffect(() => {
        if(displayData){
        let grandTotal = 0;
        let newTotals = [];
        for(let i = 0; i < displayData.length; i++){
            let monthlyTotal = 0;
            for(let j = 0; j < displayData[i].length; j++){
            if(displayData[i][j] < 50) monthlyTotal += 0
            else if(displayData[i][j] > 50 && displayData[i][j] <= 100) monthlyTotal += displayData[i][j] - 50 
            else if(displayData[i][j] > 100) monthlyTotal += 50 + (2*(displayData[i][j] - 100))
            }
            newTotals.push(monthlyTotal)
            grandTotal += monthlyTotal
        }
        setTotal([...newTotals, grandTotal])
        }
    }, [displayData])

    if(!displayData) {
        return <div data-testid='loading'>Loading...</div>
    }

  return (
    <div>
        <h3 className='fontClass'>Points Checker</h3>
        <TableContainer>
            <p className='fontClass'>Total: {total[total.length - 1]} Points</p>
            <Table data-testid="table" variant='striped' colorScheme='teal' size='lg' maxWidth='80%'>
                <Thead>
                <Tr>
                    <Th fontFamily='Press Start 2P'>Monthly Transactions</Th>
                    <Th fontFamily='Press Start 2P'>Monthly Total</Th>
                </Tr>
                </Thead>
                <Tbody>
                    {displayData && displayData.map((item, index) => (
                        <Tr key={index}>
                            <Td>Month{index + 1}: {item.map((item) => '$' + item + ',')}</Td>
                            <Td>{total[index]} Points</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
        <Image 
            className="cardImage" 
            src='https://res.cloudinary.com/ddtqwizaf/image/upload/v1654545966/Pilfer_Credit_Card_Silver_axtz4h.png' 
            alt='Card'
        />
    </div>
  )
}

export default TableData