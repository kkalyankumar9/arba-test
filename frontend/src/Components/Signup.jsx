import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Flex,
  Text,
  Link as ChakraLink,
  useToast,
} from "@chakra-ui/react";
import { signUp } from "../Redux/Auth/action";

const Signup = () => {
  const initialData = {
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "", // Added confirmPassword field
  };
  const [signData, setSignData] = useState(initialData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setSignData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!signData.username || !signData.fullname || !signData.email || !signData.password || !signData.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Please enter all required fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (signData.password !== signData.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Passwords do not match.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const user = {
      userName: signData.username,
      fullName: signData.fullname,
      email: signData.email,
      password: signData.password,
    };

    try {
      const response = await dispatch(signUp(user));

      if (response.msg === "User Signup successfully") {
        toast({
          title: "Signup Successful",
          description: "You have successfully signed up.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/signin");
      } else {
        const errorMessage = response.msg;
        toast({
          title: "Signup Error",
          description: errorMessage || "An error occurred during signup. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      const errorMessage = error.msg;
      console.error("Signup error:", error);
      toast({
        title: "Signup Error",
        description: errorMessage || "An error occurred during signup. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Box display={"flex"} w={"100%"}>
        <Box bgColor={"#B2EBF2"} w={"50%"}>
          {/* Content */}
        </Box>
        <Flex align="center" justify="center" h="100vh" mt={"4%"} w={"50%"}>
          <Box />
          <Box maxW="md" w="full" bg="white" shadow="md" rounded="md" p="8">
            <Heading as="h1" size="xl" fontWeight="bold" mb="4">
              DEV
            </Heading>
            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
            <form onSubmit={handleSubmit}>
              <FormControl mb="4">
                <Input
                  type="text"
                  id="username"
                  placeholder="Username"
                  name="username"
                  value={signData.username}
                  onChange={handleChange}
                  className="input"
                />
              </FormControl>
              <FormControl mb="4">
                <Input
                  type="text"
                  id="fullname"
                  placeholder="Fullname"
                  name="fullname"
                  value={signData.fullname}
                  onChange={handleChange}
                  className="input"
                />
              </FormControl>
              <FormControl mb="4">
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  name="email"
                  value={signData.email}
                  onChange={handleChange}
                  className="input"
                />
              </FormControl>
              <FormControl mb="6">
                <Input
                  type="password"
                  id="password"
                  placeholder="Password"
                  name="password"
                  value={signData.password}
                  onChange={handleChange}
                  className="input"
                />
              </FormControl>
              <FormControl mb="6">
                <Input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={signData.confirmPassword}
                  onChange={handleChange}
                  className="input"
                />
              </FormControl>
              <Flex align="center" justify="center">
                <Button
                  type="submit"
                  bg="blue.500"
                  color="white"
                  _hover={{ bg: "blue.700" }}
                  fontWeight="bold"
                  rounded="md"
                >
                  Register
                </Button>
              </Flex>
            </form>
            <Text mt="2">Already have an account?</Text>
            <ChakraLink as={Link} to="/signin" color="blue.500" _hover={{ textDecoration: "underline" }}>
              Login
            </ChakraLink>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Signup;
