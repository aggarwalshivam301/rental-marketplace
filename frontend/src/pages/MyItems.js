import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { itemAPI } from '../services/api';
import { toast } from 'react-toastify';

const MyItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyItems();
  }, []);

  const fetchMyItems = async () => {
    try {
      const { data } = await itemAPI.getMyItems();
      setItems(data.items);
    } catch (error) {
      toast.error('Error loading items');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this item?')) {
      try {
        await itemAPI.delete(id);
        toast.success('Item deleted');
        setItems(items.filter(item => item._id !== id));
      } catch (error) {
        toast.error('Error deleting item');
      }
    }
  };

  if (loading) return <div className="loading">Loading your items...</div>;

  return (
    <div>
      <div className="flex-between mb-3">
        <h1>My Listed Items</h1>
        <Link to="/add-item" className="btn btn-success">+ Add New Item</Link>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <h3>No items listed yet</h3>
          <p>Start earning by listing your first item!</p>
          <Link to="/add-item" className="btn btn-primary">List an Item</Link>
        </div>
      ) : (
        <div className="grid grid-3">
          {items.map((item) => (
            <div key={item._id} className="card">
              <img 
                src={item.images?.[0] || 'https://via.placeholder.com/300x200?text=No+Image'} 
                alt={item.title}
                className="item-image"
              />
              <span className={`badge ${item.available ? 'badge-success' : 'badge-warning'}`}>
                {item.available ? 'Available' : 'Unavailable'}
              </span>
              <h3>{item.title}</h3>
              <div className="item-price">${item.pricePerDay}/day</div>
              <p style={{fontSize: '0.875rem', color: '#6b7280', margin: '0.5rem 0'}}>
                📍 {item.location?.city || 'No location'}
              </p>
              <p style={{fontSize: '0.875rem', color: '#6b7280'}}>
                Rented {item.timesRented} times
              </p>
              <div style={{display: 'flex', gap: '0.5rem', marginTop: '1rem'}}>
                <Link to={`/items/${item._id}`} className="btn btn-primary" style={{flex: 1}}>
                  View
                </Link>
                <button 
                  onClick={() => handleDelete(item._id)} 
                  className="btn"
                  style={{background: '#ef4444', color: 'white', flex: 1}}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyItems;
