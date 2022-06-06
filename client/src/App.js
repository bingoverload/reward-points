import './App.css'
import {
  ChakraProvider,
  extendTheme,
  Box,
  Grid,
} from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import TableData from './components/TableData'
import Page404 from './components/Page404'

const customTheme = extendTheme({
  fonts: {
    heading: `'Heading Font Name', sans-serif`,
    body: `'Press Start 2P', sans-serif`,
  },
})

function App() {
  
   return (
    <ChakraProvider theme={customTheme}>
    <Router>
      <Box textAlign="center" fontSize="xl">
        <Grid>
        <ColorModeSwitcher justifySelf="flex-end"/>
        <Routes>
          <Route path="/" element={<TableData/>}/>
          <Route path="*" element={<Page404/>}/>
        </Routes>
        </Grid>
      </Box>
    </Router>
  </ChakraProvider>
  );
}

export default App;
