import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from "@chakra-ui/react";
import axios from 'axios';
import NavBar from '../Components/Navbar';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profiledata, setProfiledata] = useState([]);
  const [updataprofile, setUpdataprofile] = useState(false);
  const navigate=useNavigate("")
  const dispatch=useDispatch()
  const [error, setError] = useState('');
  function fetchdata(){
    fetch("https://arba-test.onrender.com/updateprofile/get", {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setProfiledata(res);
      })
      .catch((error) => {
        setError('Failed to fetch profile data');
        console.log(error);
      });

  }

  useEffect(() => {
    fetchdata()
  }, []);

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    setUpdataprofile(true);
    setError('');

    try {
      const response = await fetch(`https://arba-test.onrender.com/updateprofile/profile_update/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          fullName,
          avatar,
          newPassword
        }),
      });

      if (!response.ok) {
        throw new Error('Profile update failed');
      }

      const data = await response.json();
      fetchdata()
      console.log(data); 
      onClose(); 
    } catch (error) {
      setError('Failed to update profile');
      console.error('Profile update error:', error);
      
    }
  };
  const handleChangePassword=(id)=>{

    navigate(`/changepassword/${id}`)

  }
  
  return (
    <>
      <NavBar />
      <Box p={4}  m={"auto"}>
      <Box  mt={"10%"}>
  <Box  display="flex" justifyContent="center" alignItems="center" >
    {profiledata.map((e, i) => (
      <Box key={e._id} borderWidth="1px" borderRadius="lg" p={4} mb={4} boxShadow="md" maxW="400px" w="200%">
        <Box display="flex" alignItems="center" justifyContent="center" >
          <Image src={e.avatar} alt='avatar'  boxSize="100px" />
        </Box>
        <Box textAlign="center" mt={4}>
          <Text fontSize="xl" fontWeight="bold">{e.fullName}</Text>
          <Text fontSize="sm" color="gray.500">{e.email}</Text>
        </Box>
        <Button onClick={onOpen} mt={4} colorScheme="blue" size="sm" width="100%">Update Profile</Button>

        <Box display={"flex"} justifyContent={"space-evenly"} alignItems={"center"} spacing={15} m={4}>
          <Button >See T&C</Button>
          <Button  onClick={()=>handleChangePassword(e._id)}> Change Password</Button>
        </Box>
      </Box>
    ))}
  </Box>
  

</Box>



      
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Full Name:</FormLabel>
                <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Avatar:</FormLabel>
                <Input type="text" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>New Password:</FormLabel>
                <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>Close</Button>
              <Button onClick={(e) => handleSubmit(e, profiledata[0]._id)}>Update Profile</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {error && (
          <Text color="red">{error}</Text>
        )}
      </Box>
    </>
  );
};

export default ProfilePage;



