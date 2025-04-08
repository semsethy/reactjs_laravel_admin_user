import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import placeholder from '../images/logos/placeholder2.jpg';

const API_URL = 'http://127.0.0.1:8000';

const SlideshowAdd = () => {
  const [slideshowData, setSlideshowData] = useState({
      title: null,
      description: null,
      caption: null,
      link: null,
      status: "1",
      category_id: "",
      image: null,
    });

    const [categories, setCategories] = useState([]);
      const [imagePreview, setImagePreview] = useState(null);
      const [isEdit, setIsEdit] = useState(false);
      const navigate = useNavigate();
      const location = useLocation();
      const authToken = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');

      useEffect(() => {
        // Fetch categories for the select dropdown
        axios.get(`${API_URL}/api/categories`, { headers: { Authorization: `Bearer ${authToken}`}})
          .then(response => {
            if (Array.isArray(response.data)) {
              setCategories(response.data);
            } else if (response.data.categories) {
              setCategories(response.data.categories);
            }
          })
          .catch(error => console.error("Error fetching categories:", error));
      
        // Fetch product data if editing an existing product
        const slideshowData = location.state?.slideshowData;
        if (slideshowData) {
          setSlideshowData({
            id: slideshowData.id,
            title: slideshowData.title,
            description: slideshowData.description,
            caption: slideshowData.caption,
            link: slideshowData.link,
            status: slideshowData.status,
            category_id: slideshowData.category_id,
            image: slideshowData.image,
          });
      
          // Set the image previews
          setImagePreview(API_URL+"/storage/"+slideshowData.image || null);
          setIsEdit(true);
        }
      }, [location.state]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSlideshowData((prevSlideshow) => ({
            ...prevSlideshow,
            image: file,
        }));

        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSlideshowData((prevSlideshow) => ({
        ...prevSlideshow,
        [name]: value,
    }));
};

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', slideshowData.title);
    formData.append('category_id', slideshowData.category_id);
    formData.append('caption', slideshowData.caption);
    formData.append('description', slideshowData.description);
    formData.append('link', slideshowData.link);
    formData.append('status', slideshowData.status);
    if (slideshowData.image) {
      formData.append('image', slideshowData.image);
    }

    try {
      if (isEdit) {
          const response = await axios.post(
            `${API_URL}/api/slideshows/${slideshowData.id}`,
            {
              ...slideshowData,
              "_method": "Put"
            },
            {
              headers: {
                  Authorization: `Bearer ${authToken}`,
                "Content-Type": "multipart/form-data"
              }
            }
          );
      } else {
          await axios.post(`${API_URL}/api/slideshows`, formData, {
              headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'multipart/form-data' },
          });
      }

    } catch (error) {
        console.error('Error saving category:', error);
    }
  };

  return (
    <div className="container-fluid">
      <h1>{isEdit ? "Edit Slide Show" : "Add New Slide Show"}</h1>
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
              value={slideshowData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Upload Image</label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
            <div id="image_preview" className="mt-2">
              {imagePreview && (
                  <img
                  className="current-image"
                  src={imagePreview || placeholder}
                  alt="Current Image"
                  style={{
                    marginTop: '20px',
                    marginLeft: '20px',
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '5px',
                    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)',
                    border: '1px solid lightgray',
                  }}
                />
              )}
            </div>
          </div>

          {/* Category */}
          <div className="mb-3">
            <label htmlFor="category_id" className="form-label">Category</label>
            <select
              className="form-select"
              id="category_id"
              name="category_id"
              value={slideshowData.category_id || ""}
              onChange={handleInputChange}
              required
            >
              {categories.length > 0 ? (
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))
              ) : (
                <option disabled>Loading categories...</option>
              )}
            </select>
          </div>

          {/* Caption */}
          <div className="mb-3">
            <label htmlFor="caption" className="form-label">Caption</label>
            <input
              type="text"
              className="form-control"
              id="caption"
              name="caption"
              value={slideshowData.caption}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={slideshowData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Link */}
          <div className="mb-3">
            <label htmlFor="link" className="form-label">Link</label>
            <input
              className="form-control"
              type="text"
              name="link"
              id="link"
              value={slideshowData.link}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Status */}
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              className="form-select"
              id="status"
              name="status"
              value={slideshowData.status}
              onChange={handleInputChange}
              required
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary">
            {isEdit ? 'Save Changes' : 'Save Slide'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SlideshowAdd;
