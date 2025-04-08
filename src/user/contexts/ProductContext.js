import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products`, {
          headers: {
            'Authorization': `Bearer ${token}` // Send the token in Authorization header
          }
        });

        console.log('Response Data:', response.data); // Debug: Log the response data
        
        // Ensure that products are an array
        if (Array.isArray(response.data.products)) {
          setProducts(response.data.products); // Set it as the products array
        } else {
          console.error('API response does not contain a products array:', response.data);
          setProducts([]); // Set products to empty array if response does not contain a products array
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]); // Set products to empty array on error
      }
    };

    fetchProducts();
  }, [token]);

  return <ProductContext.Provider value={{ products }}>{children}</ProductContext.Provider>;
};

export default ProductProvider;
