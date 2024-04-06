import { Box, Button, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CategoryStore from './CategoryStore'

import ProductsTable from './Products_Operations/Productsbar'
import CategoryTable from './CategoryOperationStore/Categorybar'

const MyStore = () => {
    const [toggle,setToggle]=useState(false)
  return (
    <>

  
   
    <Box mt={"5%"} p={"1%"}>
    <Box
  display="flex"
  justifyContent="space-evenly"
  alignItems="center"
  width="70%"
  margin="auto"
  backgroundColor="#41daee"
  borderRadius="md"
  boxShadow="md"

>
  <Box 
  onClick={()=>setToggle(true)}
    _hover={{ backgroundColor: "#c3dbf3", boxShadow: "md" }}
    width="50%"
    height="60px"
    cursor="pointer"
    borderRadius="md"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <Text  fontSize="lg" fontWeight="bold" color="#333">Categories</Text>
  </Box>
  <Box 
    _hover={{ backgroundColor: "#c3dbf3", boxShadow: "md" }}
    width="50%"
    height="60px"
    cursor="pointer"
    borderRadius="md"
    display="flex"
    alignItems="center"
    justifyContent="center"
    onClick={()=>setToggle(false)}
  >
    <Text  fontSize="lg" fontWeight="bold" color="#333">Products</Text>
  </Box>
</Box>

        
    </Box>
    <Box>
        {
            toggle?<CategoryTable/>:<ProductsTable/>
        }
    </Box>
    
    
    </>
  )
}

export default MyStore