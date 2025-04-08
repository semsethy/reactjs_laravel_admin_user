import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        // Make API call to logout the user (replace with your actual API URL)
        const apiUrl = process.env.REACT_APP_API_URL + '/logout'; // Adjust the API URL as needed
        const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');

        if (token) {
          await axios.post(apiUrl, {}, {
            headers: {
              'Authorization': `Bearer ${token}` // Send the token in Authorization header
            }
          });

          // After logout API call, clear the local or session storage
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_id');
          sessionStorage.removeItem('auth_token');
          sessionStorage.removeItem('user_id');
          
          // Redirect the user to the login page after logout
          navigate('/login');
        } else {
          // If there's no token, just redirect to login
          navigate('/login');
        }
      } catch (error) {
        console.error("Logout error:", error);
        // If there is an error during logout, just clear the local storage and redirect
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_id');
        sessionStorage.removeItem('auth_token');
        sessionStorage.removeItem('user_id');
        navigate('/login');
      }
    };

    logoutUser();
  }, [navigate]);

  return null;  // Since the component is just for redirecting, it returns null
};

export default Logout;
