import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,

} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../Redux/Products/action";
import NavBar from "../Navbar";



const AddProduct = () => {
  const initialData = {
    title: "",
    description: "",
    price:"",
    image:""
   
  };

  const [taskAdd, setTaskAdd] = useState(initialData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setTaskAdd((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(taskAdd))
      .then(() => {
        alert("Data added successfully");
        // You can redirect to another page or handle success as needed
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });
  };
 const  handleClickback=()=>{
  navigate(-1)
  }

  return (
    <>
      <NavBar />
  
      <VStack width={"400px"}  align="center" justify="center" m={"auto"}  h="full" mt={"200px"}  boxShadow= "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" p={9}>

        <form onSubmit={handleSubmit} style={{ width: "300px" }}  >
          <FormControl mb="4" >
            <FormLabel htmlFor="name">Title</FormLabel>
            <Input
              type="text"
              id="title"
              placeholder="Enter title"
              name="title"
              value={taskAdd.title}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel htmlFor="description"> Description</FormLabel>
            <Input
              type="text"
              id="description"
              placeholder=" Enter description"
              name="description"
              value={taskAdd.description}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb="4" >
            <FormLabel htmlFor="name">Price</FormLabel>
            <Input
              type="text"
              id="price"
              placeholder="Enter price"
              name="price"
              value={taskAdd.price}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel htmlFor="description"> Image</FormLabel>
            <Input
              type="text"
              id="image"
              placeholder="  Image"
              name="image"
              value={taskAdd.image}
              onChange={handleChange}
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            _hover={{ bg: "blue.700" }}
            size="md"
            rounded="md"
          >
            Add
          </Button>
        </form>
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
 
    </>
  );
};

export default AddProduct;
