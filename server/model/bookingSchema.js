const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    userId: {
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
    // eventDate: {
    //   type: Date,
    //   required: true,
    //   validate: {
    //     validator: async function(date) {
    //       const bookings = await this.constructor.find({ hall: this.hall, eventDate: date });
    //       return bookings.length === 0;
    //     },
    //     message: 'This hall is already booked for the selected date.',
    //   },
    // },
  

    // startTime: {
    //   type: Date,
    //   required: true,
    //   validate: {
    //     validator: function(date) {
    //       const endTime = this.endTime;
    //       return !endTime || date < endTime;
    //     },
    //     message: 'The start time must be before the end time.',
    //   },
    // },
    // endTime: {
    //   type: Date,
    //   required: true,
    //   validate: {
    //     validator: function(date) {
    //       const startTime = this.startTime;
    //       return !startTime || date > startTime;
    //     },
    //     message: 'The end time must be after the start time.',
    //   },
    // },
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
      default: "Forwarded To HOD",
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
