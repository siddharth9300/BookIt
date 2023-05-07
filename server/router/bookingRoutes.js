const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authenticate = require("../middleware/authenticate");



router.get('/bookings', authenticate, bookingController.getBookings);
router.get('/bookingsAdmin', authenticate, bookingController.getBookingAdmin);
router.get('/bookingsHod', authenticate, bookingController.getBookingHod);

router.get('/events',  bookingController.getEvents);
// router.get('/bookings/:id', bookingController.getBookingById);
router.get('/bookings/:userId',authenticate,  bookingController.getBookingByUserId);
router.post('/bookings',authenticate, bookingController.createBooking);
router.put('/bookings/:id',authenticate, bookingController.updateBooking);
router.delete('/bookings/:bookingId',authenticate, bookingController.deleteBooking);

module.exports = router;
