import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
// import Log from './components/Log'

import Login from "./pages/Login/Login";
import React from "react";

// import axios from "axios";

function App() {
  // axios.interceptors.res.use(
  //   function (res) {
    
  //     return res;
  //   },
  //   function (error) {
  //     if (401 === error.res.status) {
  //       localStorage.clear();
  //       window.location.href = "/login";
  //     }
  //     // Any status codes that falls outside the range of 2xx cause this function to trigger
  //     // Do something with response error
  //     return Promise.reject(error);
  //   }
  // );

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Home/>} />
        <Route path="/" element={<Login/>}  />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
