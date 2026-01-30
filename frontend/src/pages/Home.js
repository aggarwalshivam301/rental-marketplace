import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <div className="hero">
        <div className="hero-content">
          <h1>🎒 Rent Anything, Anytime</h1>
          <p>Your neighborhood marketplace for peer-to-peer rentals. From power tools to camping gear - find it all!</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {!isAuthenticated ? (
              <>
                <Link to="/register" className="btn btn-primary">Get Started</Link>
                <Link to="/browse" className="btn btn-outline">Browse Items</Link>
              </>
            ) : (
              <>
                <Link to="/add-item" className="btn btn-primary">List an Item</Link>
                <Link to="/browse" className="btn btn-outline">Start Browsing</Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">1000+</div>
          <div className="stat-label">Items Available</div>
        </div>
        <div className="stat-card" style={{background: 'linear-gradient(135deg, #10b981, #059669)'}}>
          <div className="stat-value">500+</div>
          <div className="stat-label">Happy Users</div>
        </div>
        <div className="stat-card" style={{background: 'linear-gradient(135deg, #f59e0b, #d97706)'}}>
          <div className="stat-value">$50</div>
          <div className="stat-label">Avg Daily Rate</div>
        </div>
      </div>

      <div className="grid grid-3">
        <div className="card">
          <h3>🔍 Browse</h3>
          <p>Search through thousands of items available for rent in your area</p>
        </div>
        <div className="card">
          <h3>📅 Book</h3>
          <p>Reserve items for the dates you need with instant confirmation</p>
        </div>
        <div className="card">
          <h3>💰 Earn</h3>
          <p>List your unused items and start earning passive income today</p>
        </div>
      </div>

      <div className="card mt-4 text-center">
        <h2>How It Works</h2>
        <div className="grid grid-4 mt-3" style={{textAlign: 'left'}}>
          <div>
            <h3>1️⃣ Sign Up</h3>
            <p>Create your free account in seconds</p>
          </div>
          <div>
            <h3>2️⃣ List or Browse</h3>
            <p>Post items you want to rent out or find what you need</p>
          </div>
          <div>
            <h3>3️⃣ Connect</h3>
            <p>Chat with owners and arrange pickup</p>
          </div>
          <div>
            <h3>4️⃣ Rent & Review</h3>
            <p>Enjoy your rental and leave feedback</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
