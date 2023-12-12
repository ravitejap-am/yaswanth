import React from 'react';
import './home.css';
import Homeheader from '../../layouts/homeheader/HomeHeader';

const Home = () => {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#2c3e50', // Background color
        color: '#ffffff', // Text color
      }}
    >
      <Homeheader />

      {/* Message */}
      <div style={{ textAlign: 'center', fontSize: '30px', marginBottom: '50px' }}>
      Document search was never so easy, would you like to know more, subscribe here!!
      </div>

      {/* Buttons */}
      <div>
	<button
          style={{
            flex: 1,
	          marginRight: '30px',
            backgroundColor: '#3498db',
            fontSize: 17,
            color: '#ffffff',
            padding: '8px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Sign Up
        </button>

        <button
          style={{
            flex: 1,
            backgroundColor: '#3498db',
            fontSize: 17,
            color: '#ffffff',
            padding: '8px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Sign In
        </button>

      </div>

      {/* Forgot Password */}
      <div style={{ fontSize: '14px', marginBottom: '20px', fontSize: 16, cursor: 'pointer'}}>Forgot Password</div>

      {/* Footer */}
      <div style={{ position: 'absolute', bottom: '10px', left: '10px', color: '#ffffff', fontSize: '14px' }}>
        All Rights Reserved by Areteminds @ 2023
      </div>
    </div>
  );
};

export default Home;