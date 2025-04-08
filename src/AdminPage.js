import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './admin/components/nav';
import Header from './admin/components/header';
import Dashboard from './admin/pages/dashboard';
import SlideShowList from './admin/pages/slideshow_list';
import SlideShowAdd from './admin/pages/slideshow_add';
import ProductList from './admin/pages/product_list';
import ProductAdd from './admin/pages/product_add';
import OrderList from './admin/pages/Orders';
import CategoryList from './admin/pages/category_list';
import Category_add from './admin/pages/category_add';
import Setting from './admin/pages/setting';
import './admin/css/styles.min.css';

function AdminPage() {
  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
      data-sidebar-position="fixed" data-header-position="fixed">
      {/* Nav should be rendered only on Admin Pages */}
      <Nav />
      <div className="body-wrapper">
        {/* Admin Header */}
        <Header />
        {/* Admin Content */}
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/slideshow_list" element={<SlideShowList />} />
            <Route path="/slideshow_add" element={<SlideShowAdd />} />
            <Route path="/product_list" element={<ProductList />} />
            <Route path="/product_add" element={<ProductAdd />} />
            <Route path="/orders_list" element={<OrderList />} />
            <Route path="/category_add" element={<Category_add />} />
            <Route path="/category_list" element={<CategoryList />} />
            <Route path="/setting" element={<Setting />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
