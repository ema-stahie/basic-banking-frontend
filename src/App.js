import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CustomersPage from "./pages/CustomersPage";
import AccountsPage from "./pages/AccountsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  const handleLogin = (username) => {
    setUsername(username);
  };

  const handleLogout = () => {
    setUsername('');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('password'); // Remove other details if necessary
  };

  return (
    <Router>
      <div className="d-flex flex-column vh-100">
        <Header username={username} onLogout={handleLogout} />
        <div className="d-flex flex-grow-1">
          <Sidebar username={username} onLogout={handleLogout} />
          <div className="container-fluid flex-grow-1 p-3">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/accounts" element={<AccountsPage />} />
              <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
              <Route path="/register" element={<RegisterPage onRegister={handleLogin} />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
