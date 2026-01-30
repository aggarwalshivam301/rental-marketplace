import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { itemAPI, bookingAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const ItemDetail = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    notes: ''
  });
  const [showBookingForm, setShowBookingForm] = useState(false);
  
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const { data } = await itemAPI.getOne(id);
      setItem(data.item);
    } catch (error) {
      toast.error('Error loading item');
      navigate('/browse');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to book');
      navigate('/login');
      return;
    }

    try {
      await bookingAPI.create({
        itemId: id,
        ...bookingData
      });
      toast.success('Booking request sent! 🎉');
      setShowBookingForm(false);
      navigate('/my-bookings');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    }
  };

  if (loading) return <div className="loading">Loading item details...</div>;
  if (!item) return <div className="empty-state">Item not found</div>;

  const isOwner = user?._id === item.owner?._id;

  return (
    <div>
      <div className="card">
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem'}}>
          <div>
            <img 
              src={item.images?.[0] || 'https://via.placeholder.com/600x400?text=No+Image'} 
              alt={item.title}
              style={{width: '100%', borderRadius: '1rem'}}
            />
          </div>

          <div>
            <span className="item-category">{item.category}</span>
            <h1>{item.title}</h1>
            <div className="item-price">${item.pricePerDay}/day</div>
            
            <div style={{margin: '1.5rem 0', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem'}}>
              <p><strong>📍 Location:</strong> {item.location?.city || 'Not specified'}</p>
              <p><strong>⭐ Condition:</strong> {item.condition}</p>
              <p><strong>👤 Owner:</strong> {item.owner?.name}</p>
              <p><strong>⭐ Rating:</strong> {item.owner?.rating || 'No ratings yet'}</p>
            </div>

            {!isOwner && item.available && (
              <div style={{marginTop: '2rem'}}>
                {!showBookingForm ? (
                  <button 
                    onClick={() => setShowBookingForm(true)} 
                    className="btn btn-primary"
                    style={{width: '100%', fontSize: '1.1rem'}}
                  >
                    📅 Book This Item
                  </button>
                ) : (
                  <form onSubmit={handleBooking} style={{background: '#f9fafb', padding: '1.5rem', borderRadius: '0.5rem'}}>
                    <h3>Book This Item</h3>
                    
                    <div className="form-group">
                      <label>Start Date</label>
                      <input
                        type="date"
                        value={bookingData.startDate}
                        onChange={(e) => setBookingData({...bookingData, startDate: e.target.value})}
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div className="form-group">
                      <label>End Date</label>
                      <input
                        type="date"
                        value={bookingData.endDate}
                        onChange={(e) => setBookingData({...bookingData, endDate: e.target.value})}
                        required
                        min={bookingData.startDate || new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div className="form-group">
                      <label>Notes (Optional)</label>
                      <textarea
                        value={bookingData.notes}
                        onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                        placeholder="Any special requirements..."
                        rows="3"
                      />
                    </div>

                    <div style={{display: 'flex', gap: '0.5rem'}}>
                      <button type="submit" className="btn btn-success">Confirm Booking</button>
                      <button type="button" onClick={() => setShowBookingForm(false)} className="btn btn-outline">Cancel</button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>

        <div style={{marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb'}}>
          <h3>Description</h3>
          <p style={{lineHeight: '1.8', marginTop: '1rem'}}>{item.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
