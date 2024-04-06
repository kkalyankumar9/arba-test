import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../Redux/Auth/action";
import { Link, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Flex,
  useToast,
  FormErrorMessage,
  Text
} from "@chakra-ui/react";

const Signin = () => {
  const initialData = {
    email: "",
    password: "",
  };
  const [signData, setSignData] = useState(initialData);
  const [inputErrors, setInputErrors] = useState({ email: false, password: false });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setSignData((prev) => ({ ...prev, [name]: value }));

    if (name === 'email') {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setInputErrors({ ...inputErrors, email: !isValidEmail });
    } else if (name === 'password') {
      const isValidPassword = validatePassword(value);
      setInputErrors({ ...inputErrors, password: !isValidPassword });
    }
  };

  function validatePassword(password) {
    const pattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~])(?=.{8,})/;
    return pattern.test(password);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!signData.email || !signData.password) {
      toast({
        title: "Validation Error",
        description: "Please enter both email and password.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const user = {
      email: signData.email,
      password: signData.password,
    };

    try {
      const response = await dispatch(signIn(user));

      // Check if response exists
      if (!response) {
        toast({
          title: "Login Error",
          description: "An error occurred during login. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      // Check if login was successful
      if (response.token) {
        navigate("/");
        toast({
          title: "Login Successful",
          description: "You have successfully logged in.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Login Error",
          description: response.msg || "An error occurred during login. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      // Display generic error message
      console.error("Signin error:", error);
      toast({
        title: "Login Error",
        description: error.message || "An error occurred during login. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Flex>
      <Box w={"50%"} bgColor={"#B2EBF2"}></Box>
      <Box display={"flex"} alignItems="center" h="100vh" justifyContent={"center"} m={"auto"}>
        <Box bg="white"   shadow="md" rounded="md" p="8" w="96">
          <Heading as="h1" size="xl" fontWeight="bold" mb="4">
            Sign In
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl mb="4" isInvalid={inputErrors.email}  borderBottom={"2px solid #B2EBF2"}>

              <Input
                type="email"
                id="email"
                placeholder="Email"
                name="email"
                value={signData.email}
                onChange={handleChange}
                border={"none"}

              />
              <FormErrorMessage>Enter a valid email address</FormErrorMessage>
            </FormControl>
            <FormControl mb="6" isInvalid={inputErrors.password}  borderBottom={"2px solid #B2EBF2"}>
            
              <Input
                type="password"
                id="password"
                placeholder="Password"
                name="password"
                value={signData.password}
                onChange={handleChange}
                border={"none"}
              />
              <FormErrorMessage>Password is required</FormErrorMessage>
            </FormControl>
            <Flex justify="space-between">
              <Button
                type="submit"
                bg="blue.500"
                color="white"
                _hover={{ bg: "blue.700" }}
                fontWeight="bold"
                rounded="md"
              >
                Sign In
              </Button>
              <Text>
                <Link to={"/forgotpassword"}>Forgot password?</Link>
              </Text>
            </Flex>
          </form>
          <Flex justify={"center"} align={"center"}>
            <Button onClick={handleBack} ml={"20px"}>
              Back
            </Button>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default Signin;
