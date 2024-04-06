import React, { useState } from 'react';
import axios from 'axios';

const ProfilePage= () => {
  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e,id) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`https://arba-test.onrender.com/updateprofile/profile_update/${id}`, {
        fullName,
        avatar,
        newPassword
      });

      console.log(response.data); // Assuming response data contains success message
    } catch (error) {
      console.error('Profile update error:', error);
      // Handle error here
    }
  };

  return (
    <div>
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </label>
        <br />
        <label>
          Avatar:
          <input type="text" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
        </label>
        <br />
        <label>
          New Password:
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;
