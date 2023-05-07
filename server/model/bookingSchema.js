const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    department:{
      type: String,
      required: true
    },
    eventManager: {
      type: String,
      required: true
    },
    eventName: {
      type: String,
      required: true
    },
    eventDate: {
      type: Date,
      required: true,
  
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    
    bookedHallId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hall',
      required: true
    },
    bookedHallName: {
      type: String,
      required: true
    },
    organizingClub: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: Number,
      required: true
    },
    altNumber: {
      type: Number,
      required: true
    },
    isApproved: {
      default: "Request Sent",
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

bookingSchema.index({ eventDate: 1 }, { expireAfterSeconds: 86400 });
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
