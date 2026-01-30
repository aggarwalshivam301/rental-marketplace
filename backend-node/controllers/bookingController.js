const Booking = require('../models/Booking');
const Item = require('../models/Item');

exports.createBooking = async (req, res) => {
  try {
    const { itemId, startDate, endDate, notes } = req.body;
    
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    
    if (!item.available) {
      return res.status(400).json({ success: false, message: 'Item not available' });
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    if (days < 1) {
      return res.status(400).json({ success: false, message: 'Invalid dates' });
    }
    
    const booking = await Booking.create({
      item: itemId,
      renter: req.user._id,
      owner: item.owner,
      startDate: start,
      endDate: end,
      totalDays: days,
      pricePerDay: item.pricePerDay,
      totalPrice: days * item.pricePerDay,
      notes
    });
    
    res.status(201).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ renter: req.user._id })
      .populate('item', 'title pricePerDay images category')
      .populate('owner', 'name phone email')
      .sort('-createdAt');
    
    res.json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyRentals = async (req, res) => {
  try {
    const rentals = await Booking.find({ owner: req.user._id })
      .populate('item', 'title pricePerDay images')
      .populate('renter', 'name phone email')
      .sort('-createdAt');
    
    res.json({ success: true, count: rentals.length, rentals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    if (booking.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    
    booking.status = req.body.status;
    await booking.save();
    
    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
