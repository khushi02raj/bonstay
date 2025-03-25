import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Hotels from "./components/Hotels";
import Bookings from "./components/Bookings";
import './App.css'
import Book from "./components/Book";

const App = () => {
  return (
    <BrowserRouter>
      <div
        style={{
          backgroundImage: "url('https://www.thespruce.com/thmb/GtlHim5EsWERYoVi62TnWpu6JTA=/5472x3648/filters:fill(auto,1)/GettyImages-9261821821-5c69c1b7c9e77c0001675a49.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        <nav data-testid="nav-bar" className="navbar navbar-expand-lg navbar-light bg-custom">
          <Link className="nav-link" style={{ fontFamily: "cursive" }} to="">
            BONSTAY
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/hotels">
                Hotels
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/bookings">
                Bookings
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="">
                Logout
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/book/:hotelId" element={<Book />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;