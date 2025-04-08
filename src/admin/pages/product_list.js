import React, { useState, useEffect } from 'react';
import axios from 'axios';
import placeholder from '../images/logos/placeholder2.jpg';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://127.0.0.1:8000';
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [productsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
    
    const fetchProducts = async (page, perPage) => {
        try {
            const response = await axios.get(`${API_URL}/api/products`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Send the token in Authorization header
                  },
                params: { page, perPage } // Pass the current page and perPage value to the API
            });

            console.log('Response Data:', response.data); // Log the response to verify the structure

            // Update the products state with the fetched products
            setProducts(response.data.products);
            setTotalProducts(response.data.total_products); // Total number of products
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    
    useEffect(() => {
        
        fetchProducts(page, productsPerPage);
    }, [page, productsPerPage]);

    

    const handleDelete = async (product) => {
        let response;
        try{
            response = await axios.delete(`${API_URL}/api/products/${product.id}`);
            console.log('product deleted successfully:', response.data);
            fetchProducts(page, productsPerPage);
        } catch(error){
          console.log(error);
        }
    };
    

    const handleEdit = (product) => {
        navigate('/admin/product_add', {
            state: { productData: product }
        });
    };

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    return (
        <div className="container-fluid">
            <h1>Product List</h1>

            <div className="mb-4" style={{ textAlign: 'right' }}>
                <a href="/admin/product_add" style={{ backgroundColor: '#28a745', color: 'white', borderRadius: '4px', padding: '8px 12px', border: 'none', cursor: 'pointer' }}>+ New</a>
            </div>

            {/* Dropdown for selecting number of products per page */}
            {/* <div className="mb-3">
                <label htmlFor="itemsPerPage" className="form-label">Products per page:</label>
                <select
                    id="itemsPerPage"
                    value={productsPerPage}
                    className="form-select"
                    aria-label="Select number of products per page"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                </select>
            </div> */}

            <div className="table-container">
                <div className="card p-3">
                    <div className="table-responsive text-nowrap">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 ? (
                                    products.map((product) => {
                                        const statusColor = product.status === 1 ? 'rgb(3, 232, 95)' : 'rgb(172, 8, 17)';
                                        const statusText = product.status === 1 ? 'Active' : 'Inactive';
                                        const categoryTitle = product.category?.title || 'Unknown Category';

                                        return (
                                            <tr key={product.id}>
                                                <td>{product.id}</td>
                                                <td>
                                                    <img 
                                                        src={API_URL+"/storage/"+product.main_image_url || placeholder} 
                                                        alt="Product Image" 
                                                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} 
                                                    />
                                                </td>
                                                <td>{product.product_name}</td>
                                                <td>{categoryTitle}</td> 
                                                <td>${product.price}</td>
                                                <td>{product.stock_quantity}</td>
                                                <td><span style={{ color: statusColor }}>{statusText}</span></td>
                                                <td>
                                                    <div className="dropdown">
                                                        <button type="button" className="btn dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                            <i className="bx bx-dots-vertical-rounded"></i>
                                                        </button>
                                                        <div className="dropdown-menu">
                                                            <button className="dropdown-item" onClick={() => handleEdit(product)}><i className="bx bx-edit-alt"></i> Edit</button>
                                                            <button className="dropdown-item" onClick={() => handleDelete(product)} style={{ color: 'red' }}><i className="bx bx-trash"></i> Delete</button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr><td colSpan="8" className="text-center">No products found</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <nav aria-label="Product Pagination">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => setPage(page - 1)} aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </button>
                            </li>
                            {[...Array(totalPages)].map((_, index) => (
                                <li className={`page-item ${index + 1 === page ? 'active' : ''}`} key={index}>
                                <a
                                    className="page-link"
                                    onClick={() => setPage(index + 1)}
                                >
                                    {index + 1}
                                </a>
                                </li>
                            ))}
                            <li className={`page-item ${page >= totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => setPage(page + 1)} aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default ProductList;



