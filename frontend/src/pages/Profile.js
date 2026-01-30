import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div style={{maxWidth: '600px', margin: '0 auto'}}>
      <div className="card">
        <h1>My Profile</h1>
        
        <div style={{marginTop: '2rem'}}>
          <div style={{marginBottom: '1.5rem'}}>
            <label style={{fontWeight: '600', display: 'block', marginBottom: '0.5rem'}}>Name</label>
            <p>{user?.name}</p>
          </div>

          <div style={{marginBottom: '1.5rem'}}>
            <label style={{fontWeight: '600', display: 'block', marginBottom: '0.5rem'}}>Email</label>
            <p>{user?.email}</p>
          </div>

          <div style={{marginBottom: '1.5rem'}}>
            <label style={{fontWeight: '600', display: 'block', marginBottom: '0.5rem'}}>Rating</label>
            <p>⭐ {user?.rating || 'No ratings yet'}</p>
          </div>

          <div style={{marginBottom: '1.5rem'}}>
            <label style={{fontWeight: '600', display: 'block', marginBottom: '0.5rem'}}>Total Reviews</label>
            <p>{user?.totalReviews || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
