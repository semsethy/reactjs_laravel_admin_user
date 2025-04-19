import React, { useState, useEffect } from 'react';
import axios from 'axios';
import placeholder from '../images/logos/placeholder2.jpg';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://127.0.0.1:8000';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });
    const navigate = useNavigate();
    const authToken = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/categories`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            console.log('Response Data:', response.data); // Log the response to verify the structure
            // Update the categories state with response.data.categories
            setCategories(response.data.categories);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setLoading(false);
        }
    };
    

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/categories/${id}`, {headers:{Authorization: `Bearer ${authToken}`}});
            setAlert({ show: true, message: 'Category deleted successfully', type: 'success' });
            fetchCategories();
        } catch (error) {
            setAlert({ show: true, message: 'Error deleting category', type: 'danger' });
            console.error('Error deleting category:', error);
        }
    };

    const handleEdit = (category) => {
        navigate('/admin/category_add', {
            state: { categoryData: category }
        });
    };

    return (
        <div className="container-fluid">
            <h1>Category List</h1>
            {alert.show && (
                <div className={`alert alert-${alert.type}`} style={{ marginBottom: '20px' }}>
                    {alert.message}
                </div>
            )}
            <div className="mb-4" style={{ textAlign: 'right' }}>
                <button
                    onClick={() => navigate('/admin/category_add')}
                    style={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        borderRadius: '4px',
                        padding: '8px 12px',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    + New
                </button>
            </div>
            <div className="table-container">
                <div className="card p-3">
                    <div className="table-responsive text-nowrap">
                        {loading ? (
                            <div className="text-center">Loading...</div>
                        ) : (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th><strong>ID</strong></th>
                                        <th><strong>Image</strong></th>
                                        <th><strong>Name</strong></th>
                                        <th><strong>Status</strong></th>
                                        <th><strong>Actions</strong></th>
                                    </tr>
                                </thead>
                                <tbody className="table-border-bottom-0">
                                    {categories.length > 0 ? (
                                        categories.map((category) => {
                                            const statusColor = category.status === 1 ? 
                                                { color: 'rgb(3, 232, 95)' } : 
                                                { color: 'rgb(172, 8, 17)' };
                                            const statusText = category.status === 1 ? 'Active' : 'Inactive';

                                            return (
                                                <tr key={category.id}>
                                                    <td>{category.id}</td>
                                                    <td><img
                                                        src={category.image ? category.image : placeholder}
                                                        alt="Category Image"
                                                        className="product-img"
                                                        style={{
                                                            width: '50px',
                                                            height: '50px',
                                                            objectFit: 'cover',
                                                            borderRadius: '5px',
                                                            boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)',
                                                        }}
                                                    /></td>
                                                    <td>{category.title}</td>
                                                    <td><span style={statusColor}>{statusText}</span></td>
                                                    <td>
                                                        <div className="dropdown">
                                                            <button
                                                                className="btn dropdown-toggle hide-arrow d-flex align-items-center justify-content-center"
                                                                data-bs-toggle="dropdown"
                                                            >
                                                                <i className="bx bx-dots-vertical-rounded p-0"></i>
                                                            </button>
                                                            <div className="dropdown-menu">
                                                                <button
                                                                    className="dropdown-item"
                                                                    onClick={() => handleEdit(category)}
                                                                >
                                                                    <i className="bx bx-edit-alt me-1"></i> Edit
                                                                </button>
                                                                <button
                                                                    className="dropdown-item"
                                                                    style={{ color: 'red' }}
                                                                    onClick={() => handleDelete(category.id)}
                                                                >
                                                                    <i className="bx bx-trash me-1"></i> Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center">No categories found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryList;


