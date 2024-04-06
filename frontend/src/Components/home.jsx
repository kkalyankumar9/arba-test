import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from './Navbar'
import Productsdisplay from '../Pages/Productsdisplay'
import { Box } from '@chakra-ui/react'

const Homepage = () => {
  return (
    <Box>
        <NavBar/>
        <Box  >
          <Productsdisplay/>
        </Box>
        

    </Box>
  )
}

export default Homepage