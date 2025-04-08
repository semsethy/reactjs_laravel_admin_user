import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setModalType('error');
      setModalMessage('Passwords do not match!');
      setIsModalVisible(true);
      return;
    }

    try {
      // Call the API to register the user
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        name,
        email,
        password,
      });

      // Check if the user already exists
      if (response.data.message === 'User already exists!') {
        setModalType('error');
        setModalMessage('User already exists!');
        setIsModalVisible(true);
      } else {
        // Registration successful
        setModalType('success');
        setModalMessage('Registration successful!');
        setIsModalVisible(true);
      }
    } catch (error) {
      setModalType('error');
      setModalMessage('An error occurred during registration.');
      setIsModalVisible(true);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center">Sign Up</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 py-3">Sign Up</button>
              </form>
              <div className="text-center mt-3">
                <p>Already have an Account? <a href="/login" className="text-primary">Sign In</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
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

export default RegisterForm;
