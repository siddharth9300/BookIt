const Booking = require('../model/bookingSchema');
const Hall = require('../model/hallSchema');

const createBooking = async (req, res, next) => {
  try {
    const {
      userId,
      department,
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
      altNumber,
      isApproved
    } = req.body;

    const hall = await Hall.findById(bookedHallId);
    if (!hall) {
      return res.status(422).json({ error: 'Hall not found' });
    }

    if (!eventManager || !department || !phoneNumber || !altNumber || !eventName || !organizingClub || !eventDate || !startTime || !endTime) {
      return res.status(422).json({ error: "Please fill all details" });
    }
    // Regular expression to validate full name with at least two words separated by a space

    const nameRegex = /^[\w']+\s[\w']+$/;

    if (!nameRegex.test(eventManager)) {
      return res.status(422).json({ error: "Please enter your full Event Manager name" });
    }



    // Phone validation
    if (phoneNumber.length !== 10) {
      return res.status(422).json({ error: "Please enter a valid 10-digit phone number" });
    }

    if (altNumber.length !== 10) {
      return res.status(422).json({ error: "Please enter a valid 10-digit alternate number" });
    }
    // const now = new Date();
    // const bookingDate = new Date(eventDate);

    // if (bookingDate <= now) {
    //   return res
    //     .status(400)
    //     .json({ error: "Event date must be in the future" });
    // }
   // Validate start and end time
   const startDateTime = new Date(`2000-01-01T${startTime}:00Z`);
   const endDateTime = new Date(`2000-01-01T${endTime}:00Z`);
   
   // Check if end time is after start time
   if (endDateTime <= startDateTime) {
     return res.status(422).json({ error: 'End time should be after start time' });
    }

    const booking = new Booking({

      userId,
      department,
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
      altNumber,
      isApproved
    });
    // await booking.validate();
    await booking.save();

    res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    next(error);
  }
};



const getEvents = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ isApproved: "Approved By Admin" }).populate('bookedHallId');

    
    res.json({ bookings });
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

const getBookingByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const booking = await Booking.find({ userId: userId }).populate('bookedHallId');
    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //   return res.status(400).json({ message: 'Invalid userId' });
    // }
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ booking });
  } catch (error) {
    next(error);
  }
};


const getBookingAdmin = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ isApproved: { $in: ["Approved By HOD", "Approved By Admin", "Rejected By Admin"] } }).populate('bookedHallId');    ;

    
    res.json({ bookings });
  } catch (error) {
    next(error);
  }
};


const getBookingHod = async (req, res, next) => {
  const hodDepartment = req.rootUser.department
  console.log(hodDepartment);
  try {
    const bookings = await Booking.find({ department: hodDepartment }).populate('bookedHallId');    ;

    
    res.json({ bookings });
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
      // email,
      // bookedHallId,
      // hallId,
      isApproved
    } = req.body;

    // const hall = await Hall.findById(hallId);
    // if (!hall) {
    //   return res.status(404).json({ message: 'Hall not found' });
    // }

    const booking = await Booking.findByIdAndUpdate(
      id,
      {
        eventName, eventDate, startTime, endTime,

        //  hallId: hall._id,email,
        isApproved
      },
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
    const { bookingId } = req.params;
    const booking = await Booking.findByIdAndDelete(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createBooking, getBookings, getBookingById, updateBooking, deleteBooking, getBookingByUserId, getEvents,getBookingAdmin ,getBookingHod};
