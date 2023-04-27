const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/bookings', bookingController.getBookings);
router.get('/bookings/:id', bookingController.getBookingById);
router.post('/bookings', bookingController.createBooking);
router.put('/bookings/:id', bookingController.updateBooking);
router.delete('/bookings/:id', bookingController.deleteBooking);

module.exports = router;
