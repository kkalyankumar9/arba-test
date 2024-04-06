import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";
import { useParams } from 'react-router-dom';
import NavBar from '../Components/Navbar';

const ChangePassPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const { id } = useParams();
  const toast = useToast(); // Initialize the useToast hook

  const handlePasswordChange = async () => {
    try {
      const response = await fetch(`https://arba-test.onrender.com/updateprofile/change_password/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          oldPassword,
          newPassword
        }),
      });

      if (!response.ok) {
        throw new Error('Password change failed');
      }

      const data = await response.json();
      console.log(data);
    
      setOldPassword('');
      setNewPassword('');
    
      toast({
        title: "Password changed successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Password change error:', error);
 
      toast({
        title: "Failed to change password. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <NavBar/>
      <Box p={4} display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Box maxW="400px" borderWidth="1px" borderRadius="lg" p={6}>
          <FormControl>
            <FormLabel>Old Password</FormLabel>
            <Input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>New Password</FormLabel>
            <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </FormControl>
          <Button onClick={handlePasswordChange} colorScheme="teal" mt={6} width="100%">
            Change Password
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ChangePassPage;
