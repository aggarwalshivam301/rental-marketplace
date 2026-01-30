import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookingAPI } from '../services/api';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [activeTab, setActiveTab] = useState('bookings');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [bookingsRes, rentalsRes] = await Promise.all([
        bookingAPI.getMyBookings(),
        bookingAPI.getMyRentals()
      ]);
      setBookings(bookingsRes.data.bookings);
      setRentals(rentalsRes.data.rentals);
    } catch (error) {
      toast.error('Error loading bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await bookingAPI.updateStatus(id, status);
      toast.success('Status updated');
      fetchData();
    } catch (error) {
      toast.error('Error updating status');
    }
  };

  if (loading) return <div className="loading">Loading bookings...</div>;

  return (
    <div>
      <h1>My Bookings</h1>
      
      <div style={{display: 'flex', gap: '1rem', marginBottom: '2rem'}}>
        <button 
          onClick={() => setActiveTab('bookings')} 
          className={`btn ${activeTab === 'bookings' ? 'btn-primary' : 'btn-outline'}`}
        >
          My Rentals ({bookings.length})
        </button>
        <button 
          onClick={() => setActiveTab('rentals')} 
          className={`btn ${activeTab === 'rentals' ? 'btn-primary' : 'btn-outline'}`}
        >
          Requests Received ({rentals.length})
        </button>
      </div>

      {activeTab === 'bookings' && (
        bookings.length === 0 ? (
          <div className="empty-state">
            <h3>No bookings yet</h3>
            <Link to="/browse" className="btn btn-primary">Browse Items</Link>
          </div>
        ) : (
          <div>
            {bookings.map((booking) => (
              <div key={booking._id} className="card mb-2">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                  <div>
                    <h3>{booking.item?.title}</h3>
                    <p>Owner: {booking.owner?.name}</p>
                    <p>📅 {format(new Date(booking.startDate), 'MMM dd')} - {format(new Date(booking.endDate), 'MMM dd, yyyy')}</p>
                    <p><strong>Total: ${booking.totalPrice}</strong> ({booking.totalDays} days × ${booking.pricePerDay}/day)</p>
                  </div>
                  <span className={`badge badge-${booking.status === 'confirmed' ? 'success' : booking.status === 'pending' ? 'warning' : 'primary'}`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {activeTab === 'rentals' && (
        rentals.length === 0 ? (
          <div className="empty-state">
            <h3>No rental requests yet</h3>
            <Link to="/add-item" className="btn btn-primary">List an Item</Link>
          </div>
        ) : (
          <div>
            {rentals.map((rental) => (
              <div key={rental._id} className="card mb-2">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                  <div>
                    <h3>{rental.item?.title}</h3>
                    <p>Renter: {rental.renter?.name}</p>
                    <p>📅 {format(new Date(rental.startDate), 'MMM dd')} - {format(new Date(rental.endDate), 'MMM dd, yyyy')}</p>
                    <p><strong>Total: ${rental.totalPrice}</strong> ({rental.totalDays} days)</p>
                    {rental.notes && <p style={{fontStyle: 'italic'}}>Note: {rental.notes}</p>}
                  </div>
                  <div>
                    <span className={`badge badge-${rental.status === 'confirmed' ? 'success' : 'warning'}`}>
                      {rental.status}
                    </span>
                    {rental.status === 'pending' && (
                      <div style={{marginTop: '0.5rem', display: 'flex', gap: '0.5rem'}}>
                        <button onClick={() => handleStatusUpdate(rental._id, 'confirmed')} className="btn btn-success">
                          Confirm
                        </button>
                        <button onClick={() => handleStatusUpdate(rental._id, 'cancelled')} className="btn" style={{background: '#ef4444', color: 'white'}}>
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default MyBookings;
