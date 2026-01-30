import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { itemAPI } from '../services/api';
import { toast } from 'react-toastify';

const AddItem = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'tools',
    pricePerDay: '',
    condition: 'good',
    location: {
      city: '',
      state: '',
      zipCode: ''
    },
    deposit: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: { ...formData[parent], [child]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await itemAPI.create({
        ...formData,
        pricePerDay: Number(formData.pricePerDay),
        deposit: Number(formData.deposit) || 0
      });
      toast.success('Item listed successfully! 🎉');
      navigate('/my-items');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error listing item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{maxWidth: '700px', margin: '0 auto'}}>
      <div className="card">
        <h1>List Your Item</h1>
        <p style={{color: '#6b7280', marginBottom: '2rem'}}>
          Fill in the details to start earning from your unused items
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Item Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Professional DSLR Camera"
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="6"
              placeholder="Describe your item in detail..."
            />
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
            <div className="form-group">
              <label>Category *</label>
              <select name="category" value={formData.category} onChange={handleChange}>
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

            <div className="form-group">
              <label>Condition *</label>
              <select name="condition" value={formData.condition} onChange={handleChange}>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
            <div className="form-group">
              <label>Price Per Day ($) *</label>
              <input
                type="number"
                name="pricePerDay"
                value={formData.pricePerDay}
                onChange={handleChange}
                required
                min="1"
                placeholder="25"
              />
            </div>

            <div className="form-group">
              <label>Security Deposit ($)</label>
              <input
                type="number"
                name="deposit"
                value={formData.deposit}
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem'}}>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="location.city"
                value={formData.location.city}
                onChange={handleChange}
                placeholder="San Francisco"
              />
            </div>

            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="location.state"
                value={formData.location.state}
                onChange={handleChange}
                placeholder="CA"
              />
            </div>

            <div className="form-group">
              <label>Zip</label>
              <input
                type="text"
                name="location.zipCode"
                value={formData.location.zipCode}
                onChange={handleChange}
                placeholder="94102"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{width: '100%'}} disabled={loading}>
            {loading ? 'Listing Item...' : 'List Item'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
