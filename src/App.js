import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./page/home"; // Đảm bảo rằng đường dẫn đến Home.js là chính xác

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
