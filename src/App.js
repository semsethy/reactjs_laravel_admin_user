import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import UserPage from './UserPage';
import AdminPage from './AdminPage';
import LoginPage from './Auth/login';
import RegisterPage from './Auth/register';
import Logout from './Auth/logout';

const App = () => {
  return (
    <div className="overflow-hidden">
      <Router>
        <Routes>
          {/* User Pages */}
          <Route path="/*" element={<UserPage />} />
          {/* Admin Pages */}
          <Route path="/admin/*" element={<AdminPageWithRedirect />} />
          {/* Login Page */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </div>
  );
};

const AdminPageWithRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check for token in localStorage or sessionStorage
    const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');

    if (!token) {
      // If there's no token, redirect to the login page
      navigate('/login');
    } else {
      // Optionally make a backend call to validate the token here
    }
  }, [navigate]);

  return <AdminPage />;
};

export default App;
