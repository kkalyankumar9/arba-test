import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';
import NavBar from './Navbar';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [emailToken, setEmailToken] = useState('');
  const toast = useToast();
console.log(emailToken)
  const handleForgotPassword = async () => {
    try {
      const response = await fetch('https://arba-test.onrender.com/forgot/forgot_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setMessage(data.msg);
      if (data.emailtoken) {
        setEmailToken(data.emailtoken);
        toast({
          title: "Reset Email Sent",
          description: data.msg,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      setMessage('Error sending reset email');
      toast({
        title: "Error",
        description: "Error sending reset email",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await fetch('https://arba-test.onrender.com/forgot/reset_password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailtoken: emailToken, newPassword }),
      });
      const data = await response.json();
      setMessage(data.msg);
      toast({
        title: "Password Reset Successful",
        description: data.msg,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      setMessage('Error resetting password');
      toast({
        title: "Error",
        description: "Error resetting password",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
    <Box>
    <NavBar/>
    </Box>

      <Box maxW="md" mx="auto" mt={70} p={4} borderWidth="1px" borderRadius="lg">
        <Heading as="h2" mb={4}>Forgot Password</Heading>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <Button mt={4} colorScheme="teal" onClick={handleForgotPassword}>Send Reset Email</Button>

        <Box mt={8}>
          <Heading as="h2" mb={4}>Reset Password</Heading>
          <FormControl id="token" isRequired>
            <FormLabel>Token</FormLabel>
            <Input type="text" placeholder="Enter token" value={emailToken} onChange={(e) => setEmailToken(e.target.value)} />
          </FormControl>
          <FormControl id="newPassword" isRequired mt={4}>
            <FormLabel>New Password</FormLabel>
            <Input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </FormControl>
          <Button mt={4} colorScheme="teal" onClick={handleResetPassword}>Reset Password</Button>
        </Box>

        {message && <Text mt={4}>{message}</Text>}
      </Box>
    </>
  );
};

export default ForgotPassword;


