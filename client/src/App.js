import "./App.css";
import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products"; // สมมติว่าคุณมีหน้าจัดการสินค้าอยู่แล้ว
import Categories from "./components/Category";
import Navbar from "./components/Navbar";
import Order from "./components/Order";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/category" element={<Categories />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
