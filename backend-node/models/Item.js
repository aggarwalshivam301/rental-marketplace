const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['electronics', 'tools', 'sports', 'vehicles', 'furniture', 'camping', 'party', 'other']
  },
  pricePerDay: { type: Number, required: true, min: 1 },
  location: {
    city: String,
    state: String,
    zipCode: String
  },
  images: [String],
  available: { type: Boolean, default: true },
  condition: { type: String, enum: ['excellent', 'good', 'fair'], default: 'good' },
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  timesRented: { type: Number, default: 0 },
  deposit: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
