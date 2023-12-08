import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";
import axios from "axios";
import { parseISO } from "date-fns";
import { DepartmentList, InstitutionList } from "../InstitutionDeptartmentList";
import notVerified from "../../assets/notVerified.jpg";
const BookingForm = () => {
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);

  const { hallId, hallName } = useParams();
  //consolelog(hallId);
  const [isLoading, setIsLoading] = useState(true);
  // const { hallId, hallName } = props.location.state;
  const [bookingData, setBookingData] = useState({
    userId: "",
    eventManager: "",
    department: "",
    institution: "",
    eventName: "",
    eventDateType: "",
    eventDate: "",
    eventStartDate: "",
    eventEndDate: "",
    startTime: "",
    endTime: "",
    email: "",
    userType: "",
    bookedHallId: hallId,
    bookedHallName: hallName,
    organizingClub: "",
    phoneNumber: "",
    altNumber: "",
    isApproved: "",
  });

  const userContact = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/getdata`,
        {
          withCredentials: true, // include credentials in the request
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      //consolelog(data);

      let status;
      // if(data.userType === "admin"){
      //   status = "Approved By Admin"
      // }else if (data.userType === "hod"){
      //   status = "Approved By HOD"
      // }

      if (data.emailVerified) {
        setEmailVerified(true);
      }

      setBookingData({
        ...bookingData,
        userId: data._id,
        eventManager: data.name,
        email: data.email,
        department: data.department,
        institution: data.institution,
        userType:data.userType,
        isApproved: status,
        // phoneNumber: data.phone,
      });

      setIsLoading(false);

      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      // //consolelog(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    userContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handle change here

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBookingData({ ...bookingData, [name]: value });
  };

  //consolelog(bookingData);

  // send to backend

  const bookingForm = async (e) => {
    e.preventDefault();
    // setShowModal(false)
    setIsLoading(true);
    const {
      eventManager,
      userId,
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
      userType,
      bookedHallId,

      bookedHallName,
      organizingClub,
      phoneNumber,
      altNumber,
      isApproved,
    } = bookingData;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/bookings`,
        {
          userId,
          department,
          institution,
          eventManager,
          eventName,
          eventDate,
          eventDateType,
          eventStartDate,
          eventEndDate,
          startTime: parseISO(`2000-01-01T${startTime}:00.000Z`),
          endTime: parseISO(`2000-01-01T${endTime}:00.000Z`),
          email,
          userType,
          bookedHallId,
          bookedHallName,
          organizingClub,
          phoneNumber,
          altNumber,
          isApproved,
        },
        {
          withCredentials: true, // To include credentials in the request
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (data.message === "Booking created successfully") {
        toast.success("Booking created successfully!");
        navigate("/bookings");
      } else {
        toast.error("Request not sent!");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          const data = error.response.data;
          // Handle validation errors
          // You can set specific error messages for different fields if needed
          if (data && data.error) {
            const errorMessage = data.error;
            setAuthStatus(errorMessage);
            toast.error(errorMessage);
          }
        } else if (error.response.status === 403) {
          toast.error("Unauthorized request!");
        } else {
          console.error(error);
          toast.error("An error occurred while creating the booking.");
        }
      } else {
        console.error(error);
        toast.error("An error occurred while creating the booking.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const institutionName = InstitutionList[bookingData.institution] || bookingData.institution;
  const departmentName = DepartmentList[bookingData.department] || bookingData.department;

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : !emailVerified ? (
        <div className="flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
          <div className="w-full lg:w-1/3">
            {/* <img alt='error' className="hidden lg:block" src="https://i.ibb.co/v30JLYr/Group-192-2.png" />
          <img alt='error' className="hidden md:block lg:hidden" src="https://i.ibb.co/c1ggfn2/Group-193.png" /> */}
            <img
              alt="error"
              className="hidden lg:block"
              src={notVerified}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800 ">
              Looks Like Yout Have Not Verified Your Email!
            </h1>
            <p className="py-4 text-xl text-gray-800">
              Please click on the below button and verify email before booking.
            </p>
            {/* <p className="py-2 text-base text-gray-800">Sorry about that! Please visit our hompage to get where you need to go.</p> */}
            <div>
              <Link to="/profile">
                <button className="w-full lg:w-auto my-4 rounded-md px-1 sm:px-16 py-5 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                  Verify Email
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="max-w-screen-md mx-auto p-5 my-10 bg-white shadow-2xl shadow-blue-200">
            <div className="text-center mb-16">
              <p className="mt-4 text-sm leading-7 text-gray-500 font-regular uppercase">
                Book Hall
              </p>
              <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                Book Your <span className="text-indigo-600">Hall </span>Now
              </h3>
            </div>

            <form method="POST" className="w-full">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    for="grid-event-manager">
                    Event Manager Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-event-manager"
                    type="text"
                    value={bookingData.eventManager}
                    name="eventManager"
                    onChange={handleInputs}
                    placeholder="Event Manager Name"
                  />
                  {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>

                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-event-name">
                    Event Name
                  </label>
                  <input
                    value={bookingData.eventName}
                    name="eventName"
                    onChange={handleInputs}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-event-name"
                    type="text"
                    placeholder="Event Name"
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-organizing-club">
                    Organizing Club
                  </label>
                  <input
                    value={bookingData.organizingClub}
                    name="organizingClub"
                    onChange={handleInputs}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-organizing-club"
                    type="text"
                    placeholder="Organizing Club"
                  />
                  {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>

                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-event-date-type">
                    Event Date Type
                  </label>

                  <select
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="eventDateType"
                    name="eventDateType"
                    value={bookingData.eventDateType}
                    onChange={handleInputs}>
                    <option value="">Select</option>
                    <option value="half">Half Day</option>
                    <option value="full">Full Day</option>
                    <option value="multiple">Multiple Days</option>
                  </select>

                  {/* <input
                value={bookingData.eventDate}
                name="eventDate"
                onChange={handleInputs}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-event-date"
                type="date"
                placeholder="Event Date"
                min={new Date().toISOString().split("T")[0]}

              /> */}
                </div>

                {/* <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-event-date"
              >
                Event Date
              </label>
              <input
                value={bookingData.eventDate}
                name="eventDate"
                onChange={handleInputs}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-event-date"
                type="date"
                placeholder="Event Date"
                min={new Date().toISOString().split("T")[0]}

              />
            </div> */}
              </div>

              {/* 
{bookingData.eventDateType === "full" && (



          <div className="flex flex-wrap -mx-3 mb-6">


              <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-event-date"
              >
                Event Date
              </label>
              <input
                value={bookingData.eventDate}
                name="eventDate"
                onChange={handleInputs}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-event-date"
                type="date"
                placeholder="Event Date"
                min={new Date().toISOString().split("T")[0]}

              />
            </div>
  
          </div>



                )
                } */}

              {bookingData.eventDateType === "multiple" && (
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-event-date">
                      Event Start Date
                    </label>
                    <input
                      value={bookingData.eventStartDate}
                      name="eventStartDate"
                      onChange={handleInputs}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-event-date"
                      type="date"
                      placeholder="Event Date"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-event-start-date">
                      Event End Date
                    </label>
                    <input
                      value={bookingData.eventEndDate}
                      name="eventEndDate"
                      onChange={handleInputs}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-event-end-date"
                      type="date"
                      placeholder="Event Date"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-wrap -mx-3 mb-6">
                {(bookingData.eventDateType === "full" ||
                  bookingData.eventDateType === "half") && (
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-event-date">
                      Event Date
                    </label>
                    <input
                      value={bookingData.eventDate}
                      name="eventDate"
                      onChange={handleInputs}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-event-date"
                      type="date"
                      placeholder="Event Date"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                )}

                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    for="grid-hall-name">
                    Hall Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-hall-name"
                    type="text"
                    value={bookingData.bookedHallName}
                    name="bookedHallName"
                    onChange={handleInputs}
                    placeholder="Hall Name"
                    disabled
                  />
                </div>
              </div>

              {bookingData.eventDateType === "half" && (
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                      for="grid-start-time">
                      Start Time
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-start-time"
                      type="time"
                      value={bookingData.startTime}
                      name="startTime"
                      onChange={handleInputs}
                      placeholder="Start Time"
                    />
                    {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-end-time">
                      End Time
                    </label>
                    <input
                      value={bookingData.endTime}
                      name="endTime"
                      onChange={handleInputs}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-end-time"
                      type="time"
                      placeholder="End Time"
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    for="grid-institution">
                    Institution
                  </label>








                  {bookingData.userType !== "admin" && (



                    <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-institution"
                    type="text"
                    value={institutionName}
                    // value={bookingData.institution}
                    name="institution"
                    onChange={handleInputs}
                    placeholder="Institution"
                    disabled
                    />

                    
                    )}








{bookingData.userType === "admin" && (


                  <select
                  
                    className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="institution"
                    name="institution"
                    value={bookingData.institution}
                    onChange={handleInputs}>
                    <option value="null">Select</option>
                    <option value="AITR">
                      Acropolis Institute of Technology and Research
                    </option>
                    <option value="AIMSR">
                      Acropolis Institute of Management Studies & Research
                    </option>
                    <option value="AIPER">
                      Acropolis Institute Of Pharmaceutical Education & Research
                    </option>
                    <option value="AMR">
                      Acropolis Faculty of Management and Research
                    </option>
                    <option value="CDC">
                      Carrer Development Cell
                                            </option>
                      <option value="AC">
                      Acro Care
                      </option>
                  </select>

)}
                  {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>

                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    for="grid-department">
                    Department
                  </label>
                 
                  {/* {bookingData.department === 'Other' && (<></> */}
                  {bookingData.userType !== "admin" && (
  <input
    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    id="grid-department"
    type="text"
    value={departmentName}
    name="department"
    onChange={handleInputs}
    placeholder="Department"
    disabled
  />
  )}
 

  {bookingData.userType === "admin" && (<>
   


    {bookingData.institution === "null" && (
                    <select
                      className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="department"
                      name="department"
                      value={bookingData.department}
                      onChange={handleInputs}>
                      <option value="">
                      Select
                      </option>
                     
                      
                    </select>
                  )}

                   {bookingData.institution === "CDC" && (
                    <select
                      className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="department"
                      name="department"
                      value={bookingData.department}
                      onChange={handleInputs}>
                      <option value="CDC">
                      Carrer Development Cell
                      </option>
                     
                      
                    </select>
                  )}

                    {bookingData.institution === "AC" && (
                    <select
                      className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="department"
                      name="department"
                      value={bookingData.department}
                      onChange={handleInputs}>
                      <option value="AC">
                      Acro Care
                      </option>
                     
                      
                    </select>
                  )}
                  {bookingData.institution === "AIPER" && (
                    <select
                      className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="department"
                      name="department"
                      value={bookingData.department}
                      onChange={handleInputs}>
                      <option value="AIPER">
                        Acropolis Institute Of Pharmaceutical Education &
                        Research
                      </option>
                      
                      
                    </select>
                  )}

                  {bookingData.institution === "AMR" && (
                    <select
                      className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="department"
                      name="department"
                      value={bookingData.department}
                      onChange={handleInputs}>
                      <option value="AMR">
                        Acropolis Faculty of Management and Research
                      </option>
                      
                    </select>
                  )}

                  {bookingData.institution === "AIMSR" && (
                    <select
                      className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="department"
                      name="department"
                      value={bookingData.department}
                      onChange={handleInputs}>
                      <option value="">Select</option>
                      <option value="BSC">Bio Science</option>
                      <option value="BBA">
                        Bachelor of Business Administration
                      </option>
                      <option value="LAW">LAW</option>
                      <option value="AIMSR">Acropolis Institute of Management Studies & Research</option>
                    </select>
                  )}

                  {bookingData.institution === "AITR" && (
                    <select
                      className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="department"
                      name="department"
                      value={bookingData.department}
                      onChange={handleInputs}>
                      <option value="">Select</option>
                      <option value="CE">Civil Engineering</option>
                      <option value="ME">Mechanical Engineering</option>
                      <option value="EC">Electronics & Communication</option>
                      <option value="CSE">
                        Computer Science & Engineering
                      </option>
                      <option value="AIML">
                        Artificial Intelligence and Machine Learning
                      </option>
                      <option value="IT">Information Technology</option>
                      <option value="CSIT">
                        Computer Science and Information Technology
                      </option>
                      <option value="FCA">
                        Faculty of Computer Applications
                      </option>
                      <option value="HUMI">Huminities</option>
                      <option value="CHEM">Chemistry</option>
                      
                    </select>
                  )} 
</>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    for="grid-phone-number">
                    Phone Number
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-phone-number"
                    type="number"
                    value={bookingData.phoneNumber}
                    name="phoneNumber"
                    onChange={handleInputs}
                    placeholder="Phone Number"
                  />
                  {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>

                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    for="grid-alt-number">
                    Alternate Number
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-alt-number"
                    type="number"
                    value={bookingData.altNumber}
                    name="altNumber"
                    onChange={handleInputs}
                    placeholder="Alternate Number"
                  />
                </div>
              </div>

              <div className="my-4">
                <p className="text-s text-red-600	 font-bold">{authStatus}</p>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                {/* <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-password"
              >
                Your Message
              </label>
              <textarea
                value={bookingData.message}
                name="message"
                onChange={handleInputs}
                rows="10"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              ></textarea>
            </div> */}
                <div className="flex justify-between w-full px-3">
                  <button
                    // onClick={handleConfirmModal}
                    onClick={bookingForm}
                    className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                    type="submit">
                    Send Request
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingForm;
