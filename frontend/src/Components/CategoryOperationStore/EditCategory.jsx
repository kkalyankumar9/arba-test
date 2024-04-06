import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  const { id } = useParams();
  const categoryData = useSelector((store) => store.CategoryReducer.categoryData);
  const [category, setCategory] = useState({
    image: "",
    name: "",
    slag: ""
  });
  const toast = useToast();

  useEffect(() => {
    const existingCategory = categoryData.find((category) => category._id === id);
    if (existingCategory) {
      setCategory(existingCategory);
    }
  }, [id, categoryData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
  };

  const handleUpdate = () => {
    dispatch(updateCategory(id, category))
      .then(() => {
        toast({
          title: "Data updated",
          description: "Category updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        dispatch(getCategorydata());
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Error updating category",
          description: "Failed to update category. Please try again later.",
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
          <Heading mb={4}>Edit Category</Heading>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={category.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Slag</FormLabel>
              <Input
                type="text"
                name="slag"
                value={category.slag}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Image</FormLabel>
              <Input
                type="text"
                name="image"
                value={category.image}
                onChange={handleChange}
              />
            </FormControl>
            <Button colorScheme="blue" onClick={handleUpdate}>
              Update Category
            </Button>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default EditCategory;
