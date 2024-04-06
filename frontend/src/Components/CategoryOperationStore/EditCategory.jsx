import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast
} from '@chakra-ui/react';
import NavBar from '../Navbar';

import { getCategorydata, updateCategory } from '../../Redux/Category/action';


const EditCategory = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Corrected to match the route parameter
  console.log(id);
  const productsData = useSelector((store) => store.ProductsReducer.productsData);
  console.log(productsData);
 
  const [data, setData] = useState({
    image: "",
    name: "",
    slag:"",
    
  });
  const toast = useToast();

  useEffect(() => {
    const existingTask = productsData?.find((task) => task._id === id); // Corrected property name to match your data structure

    console.log(existingTask);
    if (existingTask) {
      setData(existingTask);
    }
   
  }, [id, productsData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = () => {
    dispatch(updateCategory(id, data))
      .then(() => {
        alert('Data updated');
        toast({
          title: "Data updated",
          description: "You have successfully updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        
        dispatch(getCategorydata());
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Error updating data",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <NavBar />
      
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Box shadow="md" w={{ base: "90%", sm: "400px" }} p={8} borderRadius="md">
          <Heading mb={4}>Edit Task</Heading>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                name="title"
                value={data.title}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                name="description"
                value={data.description}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Image</FormLabel>
              <Input
                type="text"
                name="image"
                value={data.image}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input
                type="text"
                name="price"
                value={data.price}
                onChange={handleChange}
              />
            </FormControl>
            <Button colorScheme="blue" onClick={handleUpdate}>
              Update Task
            </Button>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default EditCategory;
