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
    <Box display={"flex"} justifyContent={"space-evenly"} alignItems={"center"} w={"70%"}  m={"auto"}bgColor={" #41daee"} >
        <Box _hover={{bgColor:"#c3dbf3"}} w={"50%"}><Text size={"md"} onClick={()=>setToggle(true)}>Categories</Text></Box>
        <Box _hover={{bgColor:"#c3dbf3"}} w={"50%"}><Text size={"md"} onClick={()=>setToggle(false)}>Products</Text></Box>
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