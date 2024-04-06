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
  const categoryData = useSelector((store) => store.CategoryReducer.categoryData);
  console.log(categoryData);
 
  const [data, setData] = useState({
    image: "",
    name: "",
    slag:"",
    
  });
  const toast = useToast();

  useEffect(() => {
    const existingTask = categoryData?.find((task) => task._id === id); // Corrected property name to match your data structure

    console.log(existingTask);
    if (existingTask) {
      setData(existingTask);
    }
   
  }, [id, categoryData]);

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
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Slag</FormLabel>
              <Input
                type="text"
                name="slag"
                value={data.slag}
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
