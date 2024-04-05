import { Box, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CategoryStore from './CategoryStore'

import ProductsTable from './Products_Operations/Productsbar'

const MyStore = () => {
    const [toggle,setToggle]=useState(false)
  return (
    <>

    MyStore
    <Box display={"flex"} justifyContent={"space-evenly"} alignItems={"center"} w={"70%"} m={"auto"}>
        <Box><Button onClick={()=>setToggle(true)}>Categories</Button></Box>
        <Box><Button onClick={()=>setToggle(false)}>Products</Button></Box>
    </Box>
    <Box>
        {
            toggle?<CategoryStore/>:<ProductsTable/>
        }
    </Box>
    
    
    </>
  )
}

export default MyStore