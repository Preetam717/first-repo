import React from "react";
import { useSelector } from "react-redux";
import Products from "./components/Products";

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
      <Products />
    </div>
  );
};

export default App;
