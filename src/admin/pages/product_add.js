import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';

const API_URL = 'http://127.0.0.1:8000';

const ProductAdd = () => {
  const [productData, setProductData] = useState({
    product_name: "",
    description: "",
    price: 0,
    stock_quantity: 0,
    status: "1",
    category_id: "",
    main_image_url: "",
    collection_image_url: [],
  });

  const [categories, setCategories] = useState([]);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [collectionImagePreview, setCollectionImagePreview] = useState([]);
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
    const productData = location.state?.productData;
    if (productData) {
      setProductData({
        id: productData.id,
        product_name: productData.product_name,
        description: productData.description,
        price: productData.price,
        stock_quantity: productData.stock_quantity,
        status: productData.status,
        category_id: productData.category_id,
        main_image_url: productData.main_image_url,
        collection_image_url: Array.isArray(productData.collection_image_url) ? productData.collection_image_url : [],
      });
  
      // Set the image previews
      setMainImagePreview(API_URL+"/storage/"+productData.main_image_url || null);
      // Parse collection images from JSON if needed and set previews
      let collectionImages = [];
      if (typeof productData.collection_image_url === 'string') {
        try {
          // Try to parse if it's a JSON string
          collectionImages = JSON.parse(productData.collection_image_url);
        } catch (e) {
          console.error("Error parsing collection images:", e);
          collectionImages = [];
        }
      } else if (Array.isArray(productData.collection_image_url)) {
        collectionImages = productData.collection_image_url;
      }

      // Create preview URLs with the API_URL prefix
      const previewUrls = collectionImages.map(img => `${API_URL}/storage/${img}`);
      setCollectionImagePreview(previewUrls);
      setIsEdit(true);
    }
  }, [location.state]);
  
  
  

  const handleFileChange = (e) => {
    if (e.target.name === "main_image_url") {
      const file = e.target.files[0];
      setProductData((prevProduct) => ({
        ...prevProduct,
        main_image_url: file, 
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else if (e.target.name === "collection_image_url") {
      const files = Array.from(e.target.files);
      setProductData((prevProduct) => ({
        ...prevProduct,
        collection_image_url: files, 
      }));
      
      // Create preview URLs for all selected files
      const imagePreviewUrls = [];
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          imagePreviewUrls.push(reader.result);
          // Update preview state when all files are processed
          if (imagePreviewUrls.length === files.length) {
            setCollectionImagePreview(imagePreviewUrls);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product_name", productData.product_name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("stock_quantity", productData.stock_quantity);
    formData.append("status", productData.status);
    formData.append("category_id", productData.category_id);
    
    // Append main image file to FormData if it's available
    if (productData.main_image_url && typeof productData.main_image_url !== 'string') {
      formData.append("main_image_url", productData.main_image_url);
    }
  
    // Handle collection image uploads
    if (Array.isArray(productData.collection_image_url)) {
      for (let i = 0; i < productData.collection_image_url.length; i++) {
        const file = productData.collection_image_url[i];
        if (file instanceof File) {
          formData.append("collection_image_url[]", file);
        }
      }
    }
  
    try {
      if (isEdit) {
        const response = await axios.post(`${API_URL}/api/products/${productData.id}`, { ...productData,"_method": "Put"}, {
          headers: { Authorization: `Bearer ${authToken}`, "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`${API_URL}/api/products/`, formData, {
          headers: { Authorization: `Bearer ${authToken}`, "Content-Type": "multipart/form-data" },
        });
      }
      // navigate('/products'); 
    } catch (error) {
      console.error("Error saving product:", error);
      alert("There was an error saving the product.");
    }
  };
  
  
  

  return (
    <div className="container">
      <h1>{isEdit ? "Edit Product" : "Add New Product"}</h1>
      <div className="card p-4">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              className="form-control"
              value={productData.product_name}
              onChange={(e) => setProductData({ ...productData, product_name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              value={productData.description}
              onChange={(e) => setProductData({ ...productData, description: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              className="form-control"
              value={productData.category_id || ""}
              onChange={(e) => setProductData({ ...productData, category_id: e.target.value })}
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


          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              className="form-control"
              value={productData.price}
              onChange={(e) => setProductData({ ...productData, price: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Stock Quantity</label>
            <input
              type="number"
              className="form-control"
              value={productData.stock_quantity}
              onChange={(e) => setProductData({ ...productData, stock_quantity: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Main Image</label>
            <input
              type="file"
              className="form-control"
              name="main_image_url"
              accept="image/*"
              onChange={handleFileChange}
            />
            {mainImagePreview && <img src={mainImagePreview} alt={`Preview`} width={100} />}
          </div>

          <div className="form-group">
              <label>Collection Images</label>
              <input
                type="file"
                className="form-control"
                name="collection_image_url"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
              <div className="d-flex flex-wrap mt-2">
                {Array.isArray(collectionImagePreview) && collectionImagePreview.length > 0 ? (
                  collectionImagePreview.map((image, idx) => (
                    <img 
                      key={idx} 
                      src={image} 
                      alt={`Collection preview`} 
                      width={100} 
                      className="m-1"
                    />
                  ))
                ) : (
                  <p>No collection images selected{collectionImagePreview}</p>
                )}
              </div>
            </div>

          <div className="form-group">
            <label>Status</label>
            <select
              className="form-control"
              name="status"
              value={productData.status}
              onChange={(e) => setProductData({ ...productData, status: e.target.value })}
              required
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductAdd;


