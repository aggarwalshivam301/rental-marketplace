import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { itemAPI } from '../services/api';
import { toast } from 'react-toastify';

const Browse = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    city: ''
  });

  useEffect(() => {
    fetchItems();
  }, [filters]);

  const fetchItems = async () => {
    try {
      const { data } = await itemAPI.getAll(filters);
      setItems(data.items);
    } catch (error) {
      toast.error('Error loading items');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="loading">Loading items...</div>;

  return (
    <div>
      <h1>Browse Available Items</h1>
      
      <div className="filter-bar">
        <div className="filters">
          <div className="form-group" style={{marginBottom: 0}}>
            <input
              type="text"
              name="search"
              placeholder="🔍 Search items..."
              value={filters.search}
              onChange={handleFilterChange}
            />
          </div>

          <div className="form-group" style={{marginBottom: 0}}>
            <select name="category" value={filters.category} onChange={handleFilterChange}>
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="tools">Tools</option>
              <option value="sports">Sports</option>
              <option value="vehicles">Vehicles</option>
              <option value="furniture">Furniture</option>
              <option value="camping">Camping</option>
              <option value="party">Party</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group" style={{marginBottom: 0}}>
            <input
              type="text"
              name="city"
              placeholder="📍 City"
              value={filters.city}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <h3>No items found</h3>
          <p>Try adjusting your filters or check back later</p>
        </div>
      ) : (
        <>
          <p style={{marginBottom: '1rem', color: '#6b7280'}}>
            {items.length} {items.length === 1 ? 'item' : 'items'} available
          </p>
          <div className="grid grid-4">
            {items.map((item) => (
              <Link to={`/items/${item._id}`} key={item._id} style={{textDecoration: 'none'}}>
                <div className="card item-card">
                  <img 
                    src={item.images?.[0] || 'https://via.placeholder.com/300x200?text=No+Image'} 
                    alt={item.title}
                    className="item-image"
                  />
                  <span className="item-category">{item.category}</span>
                  <h3>{item.title}</h3>
                  <p style={{color: '#6b7280', fontSize: '0.875rem', margin: '0.5rem 0'}}>
                    {item.description.substring(0, 80)}...
                  </p>
                  <div className="item-price">${item.pricePerDay}/day</div>
                  <div style={{fontSize: '0.875rem', color: '#6b7280'}}>
                    📍 {item.location?.city || 'Location not set'}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Browse;
