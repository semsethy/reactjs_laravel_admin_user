import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import UserPage from './UserPage';
import AdminPage from './AdminPage';
import LoginPage from './Auth/login';
import RegisterPage from './Auth/register';
import Logout from './Auth/logout';
import { Navigate } from 'react-router-dom';

const App = () => {
  return (
    <div className="overflow-hidden">
      <Router>
      <Routes>
        {/* Login/Register/Logout (Public) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/logout" element={<Logout />} />

        {/* Admin Pages (Protected) */}
        <Route path="/admin/*" element={<AdminPageWithRedirect />} />

        {/* User Pages (Protected) */}
        <Route path="/*" element={<UserPageWithRedirect />} />
      </Routes>
      </Router>
    </div>
  );
};

const UserPageWithRedirect = () => {
  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <UserPage />;
};

const AdminPageWithRedirect = () => {
  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <AdminPage />;
};


export default App;
