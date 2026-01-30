const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createBooking,
  getMyBookings,
  getMyRentals,
  updateBookingStatus
} = require('../controllers/bookingController');

router.post('/', protect, createBooking);
router.get('/my-bookings', protect, getMyBookings);
router.get('/my-rentals', protect, getMyRentals);
router.put('/:id/status', protect, updateBookingStatus);

module.exports = router;
