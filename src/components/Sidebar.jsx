import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css"

const Sidebar = ({ username, onLogout }) => (
  <div
    className="offcanvas offcanvas-start"
    tabIndex="-1"
    id="offcanvas"
    aria-labelledby="offcanvasLabel"
  >
    <div className="offcanvas-header">
      <h6 className="offcanvas-title" id="offcanvasLabel">Menu</h6>
      <button
        type="button"
        className="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div className="offcanvas-body px-0">
      <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
        <li className="nav-item">
          <Link to="/" className="nav-link text-truncate link-black">
            <i className="fs-5 bi-house"></i>
            <span className="ms-1 d-none d-sm-inline">Home</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/customers" className="nav-link text-truncate link-black">
            <i className="fs-5 bi-person-circle"></i>
            <span className="ms-1 d-none d-sm-inline">Customers</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/accounts" className="nav-link text-truncate link-black">
            <i className="fs-5 bi-person"></i>
            <span className="ms-1 d-none d-sm-inline">Accounts</span>
          </Link>
        </li>
        {username ? (
          <>
            <li className="nav-item">
              <span className="nav-link text-truncate link-black">
                Welcome, {username}
              </span>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link text-truncate link-black" onClick={onLogout}>
                <i className="fs-5 bi-box-arrow-right"></i>
                <span className="ms-1 d-none d-sm-inline">Logout</span>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/login" className="nav-link text-truncate link-black">
                <i className="fs-5 bi-box-arrow-in-right"></i>
                <span className="ms-1 d-none d-sm-inline">Login</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link text-truncate link-black">
                <i className="fs-5 bi-person-plus"></i>
                <span className="ms-1 d-none d-sm-inline">Register</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  </div>
);

export default Sidebar;
