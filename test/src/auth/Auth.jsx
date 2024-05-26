import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import './Auth.css';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFetchAndProceed = async () => {
    if (!email.trim()) {
      alert('Please enter a valid email address.');
      return;
    }

    const hash = CryptoJS.MD5(email.trim().toLowerCase()).toString();
    const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?s=200`;

    const gravatarImage = new Image();
    gravatarImage.src = gravatarUrl;

    gravatarImage.onload = async function() {
      const githubUsername = email.split('@')[0];
      try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
        if (!response.ok) {
          throw new Error(`GitHub user not found for ${githubUsername}`);
        }
        const data = await response.json();
        const repos = data.map(repo => repo.name);
        localStorage.setItem('profile', JSON.stringify({ email, githubUsername, repos, gravatarUrl }));
        localStorage.setItem('gravatarFetched', 'true');
        setMessage('Gravatar fetched successfully. Redirecting...');
        setIsAuthenticated(true);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        localStorage.setItem('profile', JSON.stringify({ email, gravatarUrl }));
        localStorage.setItem('gravatarFetched', 'true');
        setMessage('Gravatar fetched successfully. Redirecting...');
        setIsAuthenticated(true);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    };

    gravatarImage.onerror = function() {
      localStorage.setItem('profile', JSON.stringify({ email }));
      localStorage.setItem('gravatarFetched', 'true');
      setMessage('Gravatar fetched successfully. Redirecting...');
      setIsAuthenticated(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    };
  };

  return (
   <div className='auth-wrapper'>
      <div id="auth-screen">
        <h1>Fetch Your Gravatar</h1>
        <input
          type="email"
          id="email-input"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
        />
        <button id="fetch-and-proceed" onClick={handleFetchAndProceed} disabled={!email.trim()}>
          Fetch Gravatar and Proceed
        </button>
        <div id="message-display">{message}</div>
      </div>
   </div>
  );
};

export default AuthScreen;
