const Booking = require('../model/bookingSchema');
const Hall = require('../model/hallSchema');
const User = require('../model/userSchema');

const createBooking = async (req, res, next) => {
  try {
    const {
      userId,
      eventManager,
      eventName,
      eventDateType,
      eventDate,
      eventStartDate,
      eventEndDate,
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

    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(422).json({ error: 'user not found' });
    }


    if (eventDateType === "full") {
      if (!eventDate ) {
        return res.status(422).json({ error: "Please fill all details" });
      }
    }else if(eventDateType === "half") {
      if (!startTime || !endTime || !eventDate ) {
        return res.status(422).json({ error: "Please fill all details" });
      }
    }else if(eventDateType === "multiple") {
      if (!eventStartDate || !eventStartDate ) {
        return res.status(422).json({ error: "Please fill all details" });
      }else{

        // Check if eventStartDate is before eventEndDate
        const eventStartDateTime = new Date(eventStartDate);
        const eventEndDateTime = new Date(eventEndDate);
        
        if (eventEndDateTime <= eventStartDateTime) {
          return res.status(422).json({ error: 'Event end date should be after event start date' });
        }
      }
    }

    if (!eventManager || !phoneNumber || !altNumber || !eventName || !organizingClub ) {
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

   // Validate start and end time
   const startDateTime = new Date(`2000-01-01T${startTime}:00Z`);
   const endDateTime = new Date(`2000-01-01T${endTime}:00Z`);
   
   // Check if end time is after start time
   if (endDateTime <= startDateTime) {
     return res.status(422).json({ error: 'End time should be after start time' });
    }

 
    

    const booking = new Booking({

      userId:user._id,
      institution:user.institution,
      department:user.department,
      eventManager,
      eventName,
      eventDateType,
      eventDate,
      eventStartDate,
      eventEndDate,
      startTime,
      endTime,
      email,
      bookedHallId: hall._id,
      bookedHall:hall,
      bookedHallName,
      organizingClub,
      // eventDetailFile,
      // eventDetailText,
      phoneNumber,
      altNumber,
      isApproved
    });
    // await booking.validate();
    // booking.bookedHallId = hall;
    // await booking.populate(bookedHallId);
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
    const bookings = await Booking.find().populate('bookedHallId').populate('userId');

    
    res.json({ bookings });
  } catch (error) {
    next(error);
  }
};


const getBookingById = async (req, res, next) => {
  console.log("function called");

  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId).populate('bookedHallId').populate('userId');
    console.log(booking);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    res.json({ booking });
  } catch (error) {
    next(error);
  }
};

const getBookingByUserId = async (req, res, next) => {
  try {
    // const { userId } = req.params;
    const userId = req.rootUser._id
    const booking = await Booking.find({  userId }).populate('bookedHallId').populate('userId');
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
    let statusArray = ["Approved By HOD", "Approved By Admin", "Rejected By Admin"];
    const adminEmail = req.rootUser.email;
    const userId = req.rootUser._id;
    console.log("admin bookng");
    console.log(adminEmail);
    if (process.env.REACT_APP_HOD_FEATURE != "true") {
      statusArray.unshift("Request Sent"); // Add "Request Sent" at the beginning if HOD feature is on
    }

    const bookings = await Booking.find({
       isApproved: { $in: statusArray },
  $or: [
    { email: adminEmail},
    // Add other conditions as needed
    {'bookedHall.hallCreater': adminEmail },
  ],
}
    ).populate('bookedHallId')
      .populate('userId');
      console.log(bookings);
    res.json({ bookings });
  } catch (error) {
    next(error);
  }
};


const getBookingHod = async (req, res, next) => {
  const hodDepartment = req.rootUser.department
  console.log(hodDepartment);
  try {
    const bookings = await Booking.find({ department: hodDepartment }).populate('bookedHallId');

    
    res.json({ bookings });
  } catch (error) {
    next(error);
  }
};




const updateBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;

    const {
      eventName,
      eventDateType,
      eventStartDate,
      eventEndDate,
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
      bookingId,
      {
        eventName, eventDate, startTime, endTime,eventDateType,
        eventStartDate,
        eventEndDate,

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
