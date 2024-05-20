import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./page/home"; // Đảm bảo rằng đường dẫn đến Home.js là chính xác
import Banner from "./component/banner";
import Register from "./page/register";
import Login from "./page/login";
import Cart from "./page/cart";
import Luong from "./page/coban";
import Ketoan from "./page/ketoan";
function App() {
  return (
    
    <div className="App">
      <Banner/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/luong" element={<Luong/>} />
        <Route path="/ketoan" element={<Ketoan/>} />
      </Routes>
    </div>
  );
}

export default App;
