import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../admin/images/logos/logos.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true); // Default 'Remember Me' is checked
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setModalType('error');
      setModalMessage('Email and Password are required!');
      setIsModalVisible(true);
      return;
    }

    try {
      // Send login request to API using axios
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password,
        rememberMe,
      });

      if (response.data.token) {
        // On success, store the token and user information
        const { token, userId } = response.data;

        if (rememberMe) {
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user_id', userId);
        } else {
          sessionStorage.setItem('auth_token', token);
          sessionStorage.setItem('user_id', userId);
        }

        // Redirect to the admin page
        navigate('/admin/');
      } else {
        setModalType('error');
        setModalMessage(response.data.message || 'Login failed');
        setIsModalVisible(true);
      }
    } catch (error) {
      setModalType('error');
      setModalMessage('An error occurred. Please try again later.');
      setIsModalVisible(true);
    }
  };

  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
      <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            <div className="login-container col-md-8 col-lg-6 col-xxl-3">
              <div className="card mb-0">
                <div className="card-body">
                  <div className="logo text-center">
                    <img src={logo} alt="Logo" height="100" />
                  </div>
                  <p className="text-center">Your Social Campaigns</p>

                  {/* Login Form */}
                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="d-flex justify-content-between mb-4">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="rememberMe"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="rememberMe">
                          Remember this Device
                        </label>
                      </div>
                      <a href="#" className="text-primary fw-bold">Forgot Password?</a>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                      Sign In
                    </button>

                    <div className="d-flex justify-content-center mt-4">
                      <p className="fs-4 mb-0">New to Modernize?</p>
                      <a href="/register" className="text-primary fw-bold ms-2">Create an account</a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success/Error Modal */}
      {isModalVisible && (
        <div className={`modal show`} tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content" style={{ background: modalType === 'success' ? '#dffffa' : '#ffe8e8' }}>
              <div className="modal-header">
                <h5 className="modal-title">{modalType === 'success' ? 'Success' : 'Error'}</h5>
                <button type="button" className="btn-close" onClick={() => setIsModalVisible(false)}></button>
              </div>
              <div className="modal-body">
                {modalMessage}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalVisible(false)}>
                  Okay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
