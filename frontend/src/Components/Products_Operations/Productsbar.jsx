import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  useToast,

  Image
} from '@chakra-ui/react';
import { deleteProduct, getProductdata } from '../../Redux/Products/action';
import NavBar from '../Navbar';
const ProductsTable = () => {


  const productsData = useSelector((store) => store.ProductsReducer.productsData);
  const isLoading = useSelector((store) => store.ProductsReducer.isLoading);
  const isError = useSelector((store) => store.ProductsReducer.isError);
  const isAuth = useSelector((store) => store.AuthReducer.isAuth);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    dispatch(getProductdata());
  }, [dispatch]);

  const handleDelete = (taskId) => {
    dispatch(deleteProduct(taskId))
      .then(() => {
        toast({
          title: 'Product Deleted',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        dispatch(getProductdata());
        
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleRefreshClick = () => {
    dispatch(getProductdata());
    };
  
  

  return (
    <>
      <NavBar />
      <Box textAlign={"left"} ml={"12%"} p={"25px"} > 
      <Button onClick={handleRefreshClick} bgColor={"teal"} color={"white"}>Refresh</Button>
      
      
      {/* <Button onClick={onOpen}>Filter</Button> */}
      
      <Button  ml={"25px"} bgColor={"teal"} color={"white"}><Link to={"/addproduct"} >Add</Link></Button>
      
      </Box>
     
      <Box mx="auto" w="70%" my="4" p="4" borderWidth="1px" borderRadius="lg" mt={'40px'}>
        {isLoading && <p className="text-center">Loading...</p>}
        {isError && <p className="text-center text-red-500">Error fetching data</p>}
        {productsData && (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Description</Th>
                <Th>Image</Th>
                <Th>Price</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {productsData.map((task) => (
                <Tr key={task._id}>
                  <Td>{task.title}</Td>
                  <Td>{task.description}</Td>
                  <Td><Image src={task.image} alt="" h="100px" /></Td>
                  <Td>{task.price}</Td>
                  <Td>
                    <Flex align="center">
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          handleDelete(task._id)
                        }}
                        disabled={!isAuth}
                      >
                        Delete
                      </Button>
                      <Link to={`/editproduct/${task._id}`}>
                        <Button colorScheme="blue" ml={2} disabled={!isAuth}>
                          Edit
                        </Button>
                      </Link>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    
  
    </>
  );
};

export default ProductsTable;
