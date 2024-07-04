// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import api from '../../utils/authApi';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile');
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Error loading profile</div>;
  }

  return (
    <div className="profile">
      {profile.profilePicUrl && (
        <img src={profile.profilePicUrl} alt="Profile" />
      )}
      <h1>{profile.name}</h1>
      <p><strong>Bio:</strong> {profile.bio}</p>
      <p><strong>Phone:</strong> {profile.phone}</p>
      <p><strong>Date of Birth:</strong> {profile.dob}</p>
    </div>
  );
};

export default Profile;
