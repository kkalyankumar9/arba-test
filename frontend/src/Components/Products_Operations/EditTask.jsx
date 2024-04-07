import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { getProductdata, updateProduct } from '../../Redux/Products/action';

const EditProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const productsData = useSelector((store) => store.ProductsReducer.productsData);
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    image: "",
    price: ""
  });
  const toast = useToast();
const navigate=useNavigate("")
  useEffect(() => {
    const existingProduct = productsData.find((product) => product._id === id);
    if (existingProduct) {
      setProductData(existingProduct);
    }
  }, [id, productsData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = () => {
    dispatch(updateProduct(id, productData))
      .then(() => {
        toast({
          title: "Data updated",
          description: "You have successfully updated the product.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        dispatch(getProductdata());
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Error updating data",
          description: "Failed to update the product. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };
  const  handleClickback=()=>{
    navigate(-1)
    }
  return (
    <>
      <NavBar />
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Box shadow="md" w={{ base: "90%", sm: "400px" }} p={8} borderRadius="md">
          <Heading mb={4}>Edit Product</Heading>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                name="title"
                value={productData.title}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                name="description"
                value={productData.description}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Image</FormLabel>
              <Input
                type="text"
                name="image"
                value={productData.image}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input
                type="text"
                name="price"
                value={productData.price}
                onChange={handleChange}
              />
            </FormControl>
            <Button colorScheme="blue" onClick={handleUpdate}>
              Update Product
            </Button>
            <Button
          
          colorScheme="gray"
          _hover={{ bg: "blue.700" }}
          size="md"
          rounded="md"
          onClick={handleClickback}
        >
          Back 
        </Button>
          </VStack>
        </Box>
      
      </Box>
    </>
  );
};

export default EditProduct;
