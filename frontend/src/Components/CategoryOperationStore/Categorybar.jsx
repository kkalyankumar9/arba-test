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

import NavBar from '../Navbar';
import { deleteCategory, getCategorydata } from '../../Redux/Category/action';


const CategoryTable = () => {
 

  const categoryData = useSelector((store) => store.CategoryReducer.categoryData);
  const isLoading = useSelector((store) => store.CategoryReducer.isLoading);
  const isError = useSelector((store) => store.CategoryReducer.isError);
  const isAuth = useSelector((store) => store.AuthReducer.isAuth);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    dispatch(getCategorydata());
  }, [dispatch]);

  const handleDelete = (taskId) => {
    dispatch(deleteCategory(taskId))
      .then(() => {
        toast({
          title: 'category Deleted',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        dispatch(getCategorydata());
      
      })
      .catch((error) => {
        console.log(error);
      });
  };

const handleRefreshClick=()=>{
  getCategorydata()
}

  return (
    <>
       <Box textAlign={"left"} ml={"12%"} p={"25px"}  >
          <Button onClick={handleRefreshClick} bgColor={"teal"} color={"white"}>Refresh</Button>

      <Button bgColor={"teal"} ml={"25px"} color='white ' ><Link to={"/addcategoy"}  >Add</Link></Button>
      </Box>
      <NavBar />
      <Box mx="auto" w="70%" my="4" p="4" borderWidth="1px" borderRadius="lg" mt={'50px'}>
        {isLoading && <p className="text-center">Loading...</p>}
        {isError && <p className="text-center text-red-500">Error fetching data</p>}
        {categoryData && (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Slug</Th>
                <Th>Image</Th>
                
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {categoryData?.map((task) => (
                <Tr key={task._id}>
                  <Td>{task.name}</Td>
                  <Td>{task.slug}</Td>
                  <Td><Image src={task.image} alt="" h="100px" /></Td>
             
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
                      <Link to={`/editcategoy/${task._id}`}>
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

export default CategoryTable;
