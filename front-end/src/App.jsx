import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import HomePage from "./components/HomePage";
import ProductsPage from "./components/ProductsPage";
import ProductDetailPage from "./components/ProductDetailPage";
import CartPage from "./components/CartPage";
import SmartBotPage from "./components/SmartBotPage";

import { CartProvider } from "./components/carts/CartContext/CartContext";
import { SmartBotProvider } from "./components/smartBot/SmartBotContext/SmartBotContext";

function App() {
  return (
    <SmartBotProvider>
      <CartProvider>
        <Router className="w-100 vh-100 d-flex justify-content-center align-items-center">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/products" element={<ProductsPage />}></Route>
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/smartbot" element={<SmartBotPage />}></Route>
          </Routes>
        </Router>
      </CartProvider>
    </SmartBotProvider>
  );
}

export default App;
