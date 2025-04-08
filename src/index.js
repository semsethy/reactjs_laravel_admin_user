import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';



import ProductProvider from './user/contexts/ProductContext';
import SidebarProvider from './user/contexts/SidebarContext';
import CartProvider from './user/contexts/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SidebarProvider>
    <CartProvider>
      <ProductProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ProductProvider>
    </CartProvider>
  </SidebarProvider>
);
      
