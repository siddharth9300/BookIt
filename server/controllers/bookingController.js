const Booking = require('../model/bookingSchema');
const Hall = require('../model/hallSchema');
const authenticate = require("../middleware/authenticate");
const createBooking =  async (req, res, next) => {
    try {
      const { 
        eventManager,
        eventName,
        eventDate,
        startTime,
        endTime,
        email,
        bookedHallId,
        bookedHallName,
        organizingClub,
        phoneNumber,
        altNumber
      } = req.body;
  
      const hall = await Hall.findById(bookedHallId);
      if (!hall) {
        return res.status(404).json({ message: 'Hall not found' });
      }else{

        
      }
  
      const booking = new Booking({
        eventManager,
        eventName,
        eventDate,
        startTime,
        endTime,
        email,
        bookedHallId: hall._id,
        bookedHallName,
        organizingClub,
        // eventDetailFile,
        // eventDetailText,
        phoneNumber,
        altNumber
      });
      await booking.save();
  
      res.status(201).json({ message: 'Booking created successfully' });
    } catch (error) {
      next(error);
    }
  };

const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate('bookedHallId');
    res.json({ bookings });
  } catch (error) {
    next(error);
  }
};

const getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id).populate('bookedHallId');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ booking });
  } catch (error) {
    next(error);
  }
};

const updateBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const { 
      eventName,
      eventDate,
      startTime,
      endTime,
      email,
      bookedHallId,
      hallId
    } = req.body;

    const hall = await Hall.findById(hallId);
    if (!hall) {
      return res.status(404).json({ message: 'Hall not found' });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { eventName, email, eventDate, startTime, endTime, hallId: hall._id },
      { new: true },
    ).populate('bookedHallId');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking updated successfully', booking });
  } catch (error) {
    next(error);
  }
};

const deleteBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {authenticate, createBooking, getBookings, getBookingById, updateBooking, deleteBooking };
