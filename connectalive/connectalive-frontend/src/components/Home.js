// src/pages/Home.js
import React from 'react';

const Home = () => {
  return (
    <div className="home">
      <h2>Welcome to ConnectaLive</h2>
      <p>Stay connected. Stay live.</p>
      <div className="home-content">
        <p>ConnectaLive is the ultimate social media platform to keep you connected with your friends and family. Share your moments, chat, and stay updated with the latest happenings around you.</p>
        <div className="home-buttons">
          <button onClick={() => window.location.href = '/signup'}>Sign Up</button>
          <button onClick={() => window.location.href = '/login'}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Home;