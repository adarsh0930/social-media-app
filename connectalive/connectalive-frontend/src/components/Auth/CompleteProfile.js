// src/pages/CompleteProfile.js
import React, { useState } from 'react';
import api from '../../utils/authApi';
import { useNavigate } from 'react-router-dom';

const CompleteProfile = () => {
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('phone', phone);
    formData.append('bio', bio);
    formData.append('name', name);
    formData.append('dob', dob);
    if (profilePic) formData.append('profilePic', profilePic);

    try {
      const response = await api.post('/complete-profile', formData);
      if (response.data.user) {
        navigate('/profile');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="complete-profile">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <input type="text" placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} required />
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} required />
        <input type="file" accept="image/*" onChange={handleProfilePicChange} />
        {preview && <img src={preview} alt="Profile Preview" style={{ width: '100px', height: '100px' }} />}
        <button type="submit">Complete Profile</button>
      </form>
    </div>
  );
};

export default CompleteProfile;
