import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Text,
} from '@chakra-ui/react';
import NavBar from './Navbar';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [emailToken, setEmailToken] = useState('');

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
      if (data.token) setEmailToken(data.token);
    } catch (error) {
      console.error(error);
      setMessage('Error sending reset email');
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await fetch('https://arba-test.onrender.com/forgot/reset_password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: emailToken, newPassword }),
      });
      const data = await response.json();
      setMessage(data.msg);
    } catch (error) {
      console.error(error);
      setMessage('Error resetting password');
    }
  };

  return (
    <>
   
    <Box maxW="md" mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="lg">
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
          <Input type="text" placeholder="Enter token" value={emailToken} readOnly />
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
