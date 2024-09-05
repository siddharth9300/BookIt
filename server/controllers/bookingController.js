const Booking = require('../model/bookingSchema');
const Hall = require('../model/hallSchema');
const User = require('../model/userSchema');
const nodemailer = require("nodemailer");





 // transporter for sending email
 const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:process.env.SENDER_EMAIL,
    pass:process.env.SENDER_PASSWORD
  }
})

const generateBookingEmailTemplate = (eventName, bookedHallName, organizingClub, institution, department, bookingId) => {
  return `


  <head>
  <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
  <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
  <style>
    a,
    a:link,
    a:visited {
      text-decoration: none;
      color: #00788a;
    }
  
    a:hover {
      text-decoration: underline;
    }
  
    h2,
    h2 a,
    h2 a:visited,
    h3,
    h3 a,
    h3 a:visited,
    h4,
    h5,
    h6,
    .t_cht {
      color: #000 !important;
    }
  
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td {
      line-height: 100%;
    }
  
    .ExternalClass {
      width: 100%;
    }
  </style>
  </head>
  
  <body style="font-size: 1.25rem;font-family: 'Roboto', sans-serif;padding-left:20px;padding-right:20px;padding-top:20px;padding-bottom:20px; background-color: #FAFAFA; width: 75%; max-width: 1280px; min-width: 600px; margin-right: auto; margin-left: auto">
  <table cellpadding="12" cellspacing="0" width="100%" bgcolor="#FAFAFA" style="border-collapse: collapse;margin: auto">

    <tbody>
    <tr>
      <td style="padding: 50px; background-color: #fff; max-width: 660px">
        <table width="100%" style="">
          <tr>
            <td style="text-align:center">
            <h1 style="font-size: 30px; color: #4f46e5; margin-top: 0;">New Booking Request</h1> 
            <h1 style="font-size: 30px; color: #202225; margin-top: 0;">Hello Admin</h1>
              <p style="font-size: 18px; margin-bottom: 30px; color: #202225; max-width: 60ch; margin-left: auto; margin-right: auto">A new booking has been requested on our platform. Please review the booking details provided below and click the button to view the booking.</p>
               <h1 style="font-size: 25px;text-align: left; color: #202225; margin-top: 0;">Booking Details</h1>
              <div style="text-align: justify; margin:20px; display: flex;">
                
                <div style="flex: 1; margin-right: 20px;">
                  <h1 style="font-size: 20px; color: #202225; margin-top: 0;">EVENT NAME	 :</h1>
                  <h1 style="font-size: 20px; color: #202225; margin-top: 0;">HALL NAME	 :</h1>
                  <h1 style="font-size: 20px; color: #202225; margin-top: 0;">ORGANIZING CLUB	 :</h1>
                  <h1 style="font-size: 20px; color: #202225; margin-top: 0;">INSTITUTION :</h1>
                       <h1 style="font-size: 20px; color: #202225; margin-top: 0;">DEPARTMENT :</h1>
                 
                </div>
                <div style="flex: 1;">
                  <h1 style="font-size: 20px; color: #202225; margin-top: 0;">${eventName}</h1>
                  <h1 style="font-size: 20px; color: #202225; margin-top: 0;">${bookedHallName}</h1>
                  <h1 style="font-size: 20px; color: #202225; margin-top: 0;">${organizingClub}</h1>
                  <h1 style="font-size: 20px; color: #202225; margin-top: 0;">${institution}</h1>
                       <h1 style="font-size: 20px; color: #202225; margin-top: 0;">${department}</h1>
              
                </div>
              </div>
              
              <a href="${process.env.CLIENT_URL}/bookingsView/${bookingId}" style="background-color: #4f46e5; color: #fff; padding: 8px 24px; border-radius: 8px; border-style: solid; border-color: #4f46e5; font-size: 14px; text-decoration: none; cursor: pointer">View Booking</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </tbody>

  </table>
  </body>


  `;
};



const createBooking = async (req, res, next) => {
  try {
    const {
      userId,
      eventManager,
      department,
      institution,
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

    if (!eventManager || !phoneNumber  || !department || !institution
      // || !altNumber 
      || !eventName || !organizingClub ) {
      return res.status(422).json({ error: "Please fill all details" });

    }
    // Regular expression to validate full name with at least two words separated by a space

        const nameRegex = /^[\w'.]+\s[\w'.]+\s*[\w'.]*\s*[\w'.]*\s*[\w'.]*\s*[\w'.]*$/;

    if (!nameRegex.test(eventManager)) {
      return res.status(422).json({ error: "Please enter your full Event Coordinator name" });
    }

   
      

    // Phone validation
    if (phoneNumber.length !== 10) {
      return res.status(422).json({ error: "Please enter a valid 10-digit phone number" });
    }

    // if (altNumber.length !== 10) {
    //   return res.status(422).json({ error: "Please enter a valid 10-digit alternate number" });
    // }

   // Validate start and end time
   const startDateTime = new Date(`2000-01-01T${startTime}:00Z`);
   const endDateTime = new Date(`2000-01-01T${endTime}:00Z`);
   
   // Check if end time is after start time
   if (endDateTime <= startDateTime) {
     return res.status(422).json({ error: 'End time should be after start time' });
    }

 
    

    const booking = new Booking({

      userId:user._id,
      institution,
      department,
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




    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: hall.hallCreater, // Use the hall creator's email here
      subject: 'New Booking Request',
      html:   generateBookingEmailTemplate(eventName, bookedHallName, organizingClub, institution, department, booking._id),
      
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });


  



    res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    next(error);
  }
};




 


// const getEvents = async (req, res, next) => {
//   try {
//     const bookings = await Booking.find({ isApproved: "Approved By Admin" }).populate('bookedHallId');

    
//     res.json({ bookings });
//   } catch (error) {
//     next(error);
//   }
// };



const getEvents = async (req, res, next) => {
  try {
    const currentDate = new Date().toISOString();

    const bookings = await Booking.find({
      isApproved: "Approved By Admin",
      $or: [
        {
          eventDateType: { $in: ["full", "half"] },
          eventDate: { $gte: currentDate }
        },
        {
          eventDateType: "multiple",
          eventEndDate: { $gte: currentDate }
        }
      ]
    }).populate('bookedHallId');
    
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
  // console.log("function called");

  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId).populate('bookedHallId').populate('userId');
    // console.log(booking);
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
    // console.log("admin bookng");
    // console.log(adminEmail);
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
      // console.log(bookings);
    res.json({ bookings });
  } catch (error) {
    next(error);
  }
};


const getBookingHod = async (req, res, next) => {
  const hodDepartment = req.rootUser.department
  // console.log(hodDepartment);
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
      rejectionReason,
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
        isApproved,
        rejectionReason,
      },
      { new: true },
    ).populate('bookedHallId');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }


        // Send email based on the updated approval status

    if (isApproved === 'Approved By Admin') {
      // Send email for approval
      sendApprovalEmail(booking, bookingId);
    } else if (isApproved === 'Rejected By Admin') {
      // Send email for rejection
      sendRejectionEmail(booking, bookingId , rejectionReason);
    }

    res.json({ message: 'Booking updated successfully', booking });
  } catch (error) {
    next(error);
  }
};



    const sendApprovalEmail = async (booking, bookingId) => {
      try {
       
    
        const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: process.env.SENDER_EMAIL, // Use the user's email associated with the booking
          subject: 'Booking Request Approved',
          html: sendApprovalEmailTemplate(booking.eventName, booking.bookedHallName, booking.organizingClub, booking.institution, booking.department, bookingId),
        };
    
        await transporter.sendMail(mailOptions);
      } catch (error) {
        next(error);
      }
    };


    const sendRejectionEmail = async (booking,  bookingId ,rejectionReason) => {
      try {
       
    
        const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: process.env.SENDER_EMAIL, // Use the user's email associated with the booking
          subject: "Booking Request Rejected",
          html: sendRejectionEmailTemplate(booking.eventName, booking.bookedHallName, booking.organizingClub, booking.institution, booking.department, bookingId ,rejectionReason),
        };
    
        await transporter.sendMail(mailOptions);
      } catch (error) {
        console.error('Error sending email:', error);
      }
    };

    const sendRejectionEmailTemplate = (eventName, bookedHallName, organizingClub, institution, department, bookingId ,rejectionReason) => {
      return `
    

      <head>
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
      <style>
        a,
        a:link,
        a:visited {
          text-decoration: none;
          color: #00788a;
        }
      
        a:hover {
          text-decoration: underline;
        }
      
        h2,
        h2 a,
        h2 a:visited,
        h3,
        h3 a,
        h3 a:visited,
        h4,
        h5,
        h6,
        .t_cht {
          color: #000 !important;
        }
      
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td {
          line-height: 100%;
        }
      
        .ExternalClass {
          width: 100%;
        }
      </style>
      </head>
      
      <body style="font-size: 1.25rem;font-family: 'Roboto', sans-serif;padding-left:20px;padding-right:20px;padding-top:20px;padding-bottom:20px; background-color: #FAFAFA; width: 75%; max-width: 1280px; min-width: 600px; margin-right: auto; margin-left: auto">
      <table cellpadding="12" cellspacing="0" width="100%" bgcolor="#FAFAFA" style="border-collapse: collapse;margin: auto">
  
        <tbody>
        <tr>
          <td style="padding: 50px; background-color: #fff; max-width: 660px">
            <table width="100%" style="">
              <tr>
                <td style="text-align:center">
                 
                  <h1 style="font-size: 30px; color: #ef4444; margin-top: 0;">Booking Request Rejected</h1>
                  
                  <h1 style="font-size: 30px; color: #202225; margin-top: 0;">Hello User</h1>
                  <p style="font-size: 18px; margin-bottom: 30px; color: #202225; max-width: 60ch; margin-left: auto; margin-right: auto">Your booking request has been rejected due to following reason. Please review the booking details provided below and click the button below to view the booking.</p>
                    <h1 style="font-size: 25px;text-align: left; color: #202225; margin-top: 0;">Reason for Rejection</h1>
                  <p style="font-size: 18px; margin-bottom: 30px; color: #202225; max-width: 60ch; text-align: left;">${rejectionReason}</p>
                   <h1 style="font-size: 25px;text-align: left; color: #202225; margin-top: 0;">Booking Details</h1>
                  
                  <div style="text-align: justify; margin:20px; display: flex;">
                    
                    <div style="flex: 1; margin-right: 20px;">
                      <h1 style="font-size: 20px; color: #202225; margin-top: 0;">EVENT NAME	 :</h1>
                      <h1 style="font-size: 20px; color: #202225; margin-top: 0;">HALL NAME	 :</h1>
                      <h1 style="font-size: 20px; color: #202225; margin-top: 0;">ORGANIZING CLUB	 :</h1>
                      <h1 style="font-size: 20px; color: #202225; margin-top: 0;">INSTITUTION :</h1>
                           <h1 style="font-size: 20px; color: #202225; margin-top: 0;">DEPARTMENT :</h1>
                     
                    </div>
                    <div style="flex: 1;">
                    <h1 style="font-size: 20px; color: #202225; margin-top: 0;">${eventName}</h1>
                    <h1 style="font-size: 20px; color: #202225; margin-top: 0;">${bookedHallName}</h1>
                    <h1 style="font-size: 20px; color: #202225; margin-top: 0;">${organizingClub}</h1>
                    <h1 style="font-size: 20px; color: #202225; margin-top: 0;">${institution}</h1>
                         <h1 style="font-size: 20px; color: #202225; margin-top: 0;">${department}</h1>
                
                  </div>
                  </div>
                  
                  <a href="${process.env.CLIENT_URL}/bookingsView/${bookingId}"  style="background-color: #4f46e5; color: #fff; padding: 8px 24px; border-radius: 8px; border-style: solid; border-color: #4f46e5; font-size: 14px; text-decoration: none; cursor: pointer">View Booking</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </tbody>
  
      </table>
      </body>
  
  
  
      `;
    };

    const sendApprovalEmailTemplate = (eventName, bookedHallName, organizingClub, institution, department, bookingId) => {
      return `
    

      <head>
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
      <style>
        a,
        a:link,
        a:visited {
          text-decoration: none;
          color: #00788a;
        }
      
        a:hover {
          text-decoration: underline;
        }
      
        h2,
        h2 a,
        h2 a:visited,
        h3,
        h3 a,
        h3 a:visited,
        h4,
        h5,
        h6,
        .t_cht {
          color: #000 !important;
        }
      
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td {
          line-height: 100%;
        }
      
        .ExternalClass {
          width: 100%;
        }
      </style>
      </head>
      
      <body style="font-size: 1.25rem;font-family: 'Roboto', sans-serif;padding-left:20px;padding-right:20px;padding-top:20px;padding-bottom:20px; background-color: #FAFAFA; width: 75%; max-width: 1280px; min-width: 600px; margin-right: auto; margin-left: auto">
      <table cellpadding="12" cellspacing="0" width="100%" bgcolor="#FAFAFA" style="border-collapse: collapse;margin: auto">
  
        <tbody>
        <tr>
          <td style="padding: 50px; background-color: #fff; max-width: 660px">
            <table width="100%" style="">
              <tr>
                <td style="text-align:center">
                 
                  <h1 style="font-size: 30px; color: #16a34a; margin-top: 0;">Booking Request Approved</h1>
                  
                  <h1 style="font-size: 30px; color: #202225; margin-top: 0;">Hello User</h1>
                  <p style="font-size: 18px; margin-bottom: 30px; color: #202225; max-width: 60ch; margin-left: auto; margin-right: auto">Your booking request has been approved. Please review the booking details provided below and click the button below to view the booking.</p>
                   <h1 style="font-size: 25px;text-align: left; color: #202225; margin-top: 0;">Booking Details</h1>
                  
                  <div style="text-align: justify; margin:20px; display: flex;">
                    
                    <div style="flex: 1; margin-right: 20px;">
                      <h1 style="font-size: 20px; color: #202225; margin-top: 0;">EVENT NAME	 :</h1>
                      <h1 style="font-size: 20px; color: #202225; margin-top: 0;">HALL NAME	 :</h1>
                      <h1 style="font-size: 20px; color: #202225; margin-top: 0;">ORGANIZING CLUB	 :</h1>
                      <h1 style="font-size: 20px; color: #202225; margin-top: 0;">INSTITUTION :</h1>
                           <h1 style="font-size: 20px; color: #202225; margin-top: 0;">DEPARTMENT :</h1>
                     
                    </div>
                    <div style="flex: 1;">
                    <h1 style="font-size: 20px; color: #202225; margin-top: 0;">${eventName}</h1>
                    <h1 style="font-size: 20px; color: #202225; margin-top: 0;">${bookedHallName}</h1>
                    <h1 style="font-size: 20px; color: #202225; margin-top: 0;">${organizingClub}</h1>
                    <h1 style="font-size: 20px; color: #202225; margin-top: 0;">${institution}</h1>
                         <h1 style="font-size: 20px; color: #202225; margin-top: 0;">${department}</h1>
                
                  </div>
                  </div>
                  
                  <a href="${process.env.CLIENT_URL}/bookingsView/${bookingId}"  style="background-color: #4f46e5; color: #fff; padding: 8px 24px; border-radius: 8px; border-style: solid; border-color: #4f46e5; font-size: 14px; text-decoration: none; cursor: pointer">View Booking</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </tbody>
  
      </table>
      </body>
  
  
      `;
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
