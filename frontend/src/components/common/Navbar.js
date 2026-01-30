import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🏠 RentHub
        </Link>
        
        <ul className="navbar-links">
          <li><Link to="/browse">Browse Items</Link></li>
          
          {isAuthenticated ? (
            <>
              <li><Link to="/add-item">List Item</Link></li>
              <li><Link to="/my-items">My Items</Link></li>
              <li><Link to="/my-bookings">Bookings</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><button onClick={logout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Sign Up</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
