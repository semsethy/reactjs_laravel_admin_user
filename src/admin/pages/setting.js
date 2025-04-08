import React, { useState, useEffect } from 'react';
import axios from 'axios';
import placeholder from '../images/logos/placeholder2.jpg';

const API_URL = 'http://127.0.0.1:8000'; // Adjust as per your backend API URL

const SettingsForm = () => {
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    email: '',
    phone_number: '',
    facebook_link: '',
    instagram_link: '',
    twitter_link: '',
    icon: null,
    logo: null,
  });
  const [isSettingsLoaded, setIsSettingsLoaded] = useState(false);
  const authToken = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  
  // Fetch existing settings when component mounts
  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/settings/4`, {headers: { Authorization: `Bearer ${authToken}` },});
      if (response.status === 200 && response.data) {
        const settings = response.data;
        setFormData({
          id: settings.id,
          title: settings.title,
          email: settings.email,
          phone_number: settings.phone_number,
          facebook_link: settings.facebook_link,
          instagram_link: settings.instagram_link,
          twitter_link: settings.twitter_link,
          icon: settings.icon,
          logo: settings.logo,
        });
        setIsSettingsLoaded(true); // Settings are loaded and exist
      } else {
        setIsSettingsLoaded(false); // No settings exist yet, so we can add new one
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  // Run the fetch settings function when the component mounts
  useEffect(() => {
    fetchSettings();
  }, []);

  // Handle form value changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  // Handle image preview
  const previewImage = (file, target) => {
    const reader = new FileReader();
    reader.onload = () => {
      target.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  // Handle form submission (create or update setting)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('title', formData.title);
    form.append('email', formData.email);
    form.append('phone_number', formData.phone_number);
    form.append('facebook_link', formData.facebook_link);
    form.append('instagram_link', formData.instagram_link);
    form.append('twitter_link', formData.twitter_link);

    if (formData.icon) {
      form.append('icon', formData.icon);
    }

    if (formData.logo) {
      form.append('logo', formData.logo);
    }

    try {
      let response;

      if (isSettingsLoaded) {
        // Update existing setting
        response = await axios.post(`${API_URL}/api/settings/4`, { ...formData,"_method": "Put"}, {
            headers: { Authorization: `Bearer ${authToken}`, "Content-Type": "multipart/form-data" },
          });
          
      } else {
        // Insert new setting
        response = await axios.post(
          `${API_URL}/api/settings`,
          form,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        if (response.status === 201) {
          alert('Settings added successfully!');
        }
      }

      // Re-fetch the settings after update or creation
      fetchSettings();

    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings.');
    }
  };

  return (
    <div className="container-fluid">
      <h1>Website Settings</h1>
      <div className="card p-3 mt-5">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Title */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          {/* Icon */}
          <div className="mb-3">
            <label htmlFor="icon" className="form-label">Icon</label>
            <input
              type="file"
              className="form-control"
              id="icon"
              name="icon"
              accept="image/*"
              onChange={(e) => {
                handleFileChange(e);
                previewImage(e.target.files[0], document.getElementById('image_icon_preview'));
              }}
            />
            <div className="mt-2">
              <div>Current Icon: </div>
              <img
                id="image_icon_preview"
                className="current-image"
                src={formData.icon || placeholder}
                alt="Current Icon"
                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px' }}
              />
            </div>
          </div>

          {/* Logo */}
          <div className="mb-3">
            <label htmlFor="logo" className="form-label">Logo</label>
            <input
              type="file"
              className="form-control"
              id="logo"
              name="logo"
              accept="image/*"
              onChange={(e) => {
                handleFileChange(e);
                previewImage(e.target.files[0], document.getElementById('image_logo_preview'));
              }}
            />
            <div className="mt-2">
              <div>Current Logo: </div>
              <img
                id="image_logo_preview"
                className="current-image"
                src={formData.logo || placeholder}
                alt="Current Logo"
                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px' }}
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Phone Number */}
          <div className="mb-3">
            <label htmlFor="phone_number" className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </div>

          {/* Social Media Links */}
          <div className="mb-3">
            <label htmlFor="facebook_link" className="form-label">Facebook Link</label>
            <input
              type="text"
              className="form-control"
              id="facebook_link"
              name="facebook_link"
              value={formData.facebook_link}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="instagram_link" className="form-label">Instagram Link</label>
            <input
              type="text"
              className="form-control"
              id="instagram_link"
              name="instagram_link"
              value={formData.instagram_link}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="twitter_link" className="form-label">Twitter Link</label>
            <input
              type="text"
              className="form-control"
              id="twitter_link"
              name="twitter_link"
              value={formData.twitter_link}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary">Save Settings</button>
        </form>
      </div>
    </div>
  );
};

export default SettingsForm;
