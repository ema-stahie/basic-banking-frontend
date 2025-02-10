import React from "react";
import { Link } from "react-router-dom";

const Header = ({ username, onLogout }) => (
  <header className="bg-dark text-white p-3">
    <button
      className="btn btn-outline-light btn-sm"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvas"
    >
      <i className="bi bi-list fs-3"></i>
    </button>
    <div className="container d-flex justify-content-between align-items-center">
      <h1 className="h4 mb-0">Customer and Account Management</h1>
      <div>
        {username ? (
          <>
            <span className="me-3">Welcome, {username}</span>
            <button className="btn btn-outline-light btn-sm" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="btn btn-outline-light btn-sm me-2">Login</button>
            </Link>
            <Link to="/register">
              <button className="btn btn-outline-light btn-sm">Register</button>
            </Link>
          </>
        )}
      </div>
    </div>
  </header>
);

export default Header;
