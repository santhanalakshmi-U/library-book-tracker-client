import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container-fluid px-5">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-book-half me-2"></i>Library Book Tracker
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/available">Available Books</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/issued">Issued Books</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/penalties">Penalties</Link>
            </li>
            {user.role === 'Admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/students">Students</Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <span className="text-white me-3 d-none d-lg-inline">
              <i className="bi bi-person-circle me-1"></i>
              {user.name} ({user.role})
            </span>
            <button className="btn btn-outline-light btn-sm fw-bold px-3" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-1"></i>Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
