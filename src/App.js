import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/home";
import Products from "./pages/products";
import Weather from "./pages/weather";
import Navbar from "./components/NavBar";

import "./App.scss";

const App = () => {
  // return (
  //   <div>
  //     <div className="app">
  //       {/* <h1>Initial App</h1> */}
  //       {/* <h2>{process.env.REACT_APP_APP_NAME}</h2> */}
  //       {/* <p>Environment: {process.env.REACT_APP_ENV}</p>
  //       <p>API URL: {process.env.REACT_APP_API_URL}</p> */}
  //     </div>
  //     <h1>Product store</h1>
  //     <Products />
  //   </div>
  // );
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <h1>Product Store</h1>
        <p>Environment: {process.env.REACT_APP_ENV}</p>
        <div>Cart: {cartItems.length} items</div>
      </header>
      {/* <Products /> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </div>
  );
};

export default App;
