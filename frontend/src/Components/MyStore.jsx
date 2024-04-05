import { Box, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CategoryStore from './CategoryStore'

import ProductsTable from './Products_Operations/Productsbar'

const MyStore = () => {
    const [toggle,setToggle]=useState(false)
  return (
    <>

  
   
    <Box mt={"5%"} p={"1%"}>
    <Box display={"flex"} justifyContent={"space-evenly"} alignItems={"center"} w={"70%"} m={"auto"} >
        <Box><Button onClick={()=>setToggle(true)}>Categories</Button></Box>
        <Box><Button onClick={()=>setToggle(false)}>Products</Button></Box>
    </Box>
        <Button><Link to={"/addproduct"}>Add</Link></Button>
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