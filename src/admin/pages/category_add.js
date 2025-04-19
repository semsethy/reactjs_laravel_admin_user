import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const API_URL = 'http://127.0.0.1:8000';

const CategoryAdd = () => {
    const [category, setCategory] = useState({
        id: null,
        title: '',
        image: null,
        status: '1',
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const authToken = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
    useEffect(() => {
        const categoryData = location.state?.categoryData;
        if (categoryData) {
            setCategory({
                id: categoryData.id,
                title: categoryData.title,
                image: categoryData.image,
                status: categoryData.status.toString(),
            });
            setPreviewImage(categoryData.image || null);
            setIsEdit(true);
        }
    }, [location.state]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategory((prevCategory) => ({
            ...prevCategory,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setCategory((prevCategory) => ({
            ...prevCategory,
            image: file,
        }));

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', category.title);
        formData.append('status', category.status);
        if (category.image && typeof category.image !== 'string') {
            formData.append('image', category.image); // Only append image if it's a file
        }

        try {
            if (isEdit) {
                const response = await axios.post(
                  `${API_URL}/api/categories/${category.id}`,
                  {
                    ...category,
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
                await axios.post(`${API_URL}/api/categories`, formData, {
                    headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'multipart/form-data' },
                });
            }

        } catch (error) {
            console.error('Error saving category:', error);
        }
    };

    return (
        <div className="container-fluid">
            <h1>{isEdit ? 'Edit Category' : 'Add New Category'}</h1>
            <div className="card p-3">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Category Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={category.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Category Image</label>
                        <input
                            type="file"
                            className="form-control"
                            id="image"
                            accept="image/*"
                            onChange={handleFileChange}
                        />

                        <div className="mt-2">
                            {previewImage && (
                                <img
                                    className="current-image"
                                    src={previewImage || 'placeholder_image_path'}
                                    alt="Category Image"
                                    style={{
                                        marginTop: '20px',
                                        marginLeft: '20px',
                                        width: '80px',
                                        height: '80px',
                                        objectFit: 'cover',
                                        borderRadius: '5px',
                                        boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)',
                                    }}
                                />
                            )}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select
                            className="form-select"
                            id="status"
                            name="status"
                            value={category.status}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        {isEdit ? 'Save Changes' : 'Add Category'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CategoryAdd;

