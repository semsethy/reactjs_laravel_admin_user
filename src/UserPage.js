import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './user/components/Footer';
import Header from './user/components/Header';
import Home from './user/pages/Home';
import Product from './user/components/Products';
import Aboutus from './user/pages/About';
import Testimonial from './user/pages/Testimonial';
import Blog from './user/pages/Blog';
import ContactUs from './user/pages/ContactUs';
import Sidebar from './user/components/Sidebar';
import ProductDetails from './user/pages/ProductDetails';
import ViewCart from './user/components/ViewCart';
import Checkout from './user/components/Checkout';

function UserPage() {
  return (
    <div className="overflow-hidden">
      {/* Always render the Header and Sidebar for the user pages */}
      <Header />
      <Sidebar />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/:category" element={<Product />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/view-cart" element={<ViewCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </div>

      {/* Footer should always be at the bottom */}
      <Footer />
    </div>
  );
}

export default UserPage;
