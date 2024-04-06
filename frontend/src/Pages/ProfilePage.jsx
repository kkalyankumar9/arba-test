import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, Text } from "@chakra-ui/react";
import axios from 'axios';

const ProfilePage = () => {
  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profiledata, setProfiledata] = useState([]);
  const [updataprofile, setUpdataprofile] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
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
      console.log(data); // Assuming response data contains success message
    } catch (error) {
      setError('Failed to update profile');
      console.error('Profile update error:', error);
      // Handle error here
    }
  };

  return (
    <Box p={4}>
      <Stack spacing={4}>

        {profiledata.map((e, i) => (
          <Box key={e._id}>
            <img src={e.image} alt='avatar' />
            <Text>{e.userName}</Text>
            <Text>{e.email}</Text>
            <Button onClick={(e) => handleSubmit(e, e._id)}>Update Profile</Button>
          </Box>
        ))}

        <Stack direction="row" spacing={4}>
          <Button>T & C</Button>
          <Button>Change Password</Button>
        </Stack>

        {updataprofile && profiledata.length > 0 && (
          <Box>
            <Text fontSize="xl" mb={4}>Update Profile</Text>
            <form onSubmit={(e) => handleSubmit(e, profiledata[0]._id)}>
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
              <Button type="submit">Update Profile</Button>
            </form>
          </Box>
        )}

        {error && (
          <Text color="red">{error}</Text>
        )}

      </Stack>
    </Box>
  );
};

export default ProfilePage;
