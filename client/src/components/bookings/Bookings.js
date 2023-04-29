import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import axios from 'axios';
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "react-toastify";
import { format, parseISO } from "date-fns"
// import BookingForm from "./BookingForm";

const Bookings = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState({});
  const [isLoading, setIsLoading] = useState(true);




  const getBookingData = async () => {
    try {
      const response = await axios.get("http://localhost:9002/bookings", {
        withCredentials: true, // include credentials in the request
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });

      const data = response.data;
      console.log(data);

      const sortedBookingData = data.bookings.sort((a, b) => {
        // Convert the event date strings to Date objects and compare them
        return new Date(a.eventDate) - new Date(b.eventDate);
      });

      setBookingData(sortedBookingData);

      // setBookingData(data.bookings);
      setIsLoading(false);



      // if (response.status === 401) {
      //   toast.warn("Unauthrized Access!")
      //   navigate("/login");
      //   // throw new Error(response.error);
      // }

      // if (response.status === 401) {
      //   toast.warn("Unauthrized Access!")
      //   navigate("/login");
      // } else 


      if (response.status !== 200) {

        throw new Error(response.status);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        toast.warn("Unauthrized Access! Please Login!")
        navigate("/login");
      }
      // navigate("/login");
    }
  };






  useEffect(() => {

    getBookingData();

  }, [])


  // navigate(`/bookingForm/${hallId}/${hallName}`)


  const updateBooking = async (bookingId, isApproved) => {
    setIsLoading(true);

    console.log(isApproved);
    try {
      const response = await axios.put(`http://localhost:9002/bookings/${bookingId}`, {
        isApproved: isApproved
      }, {
        withCredentials: true, // include credentials in the request
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });

      const data = response.data;
      console.log(data);


      // setBookingData(data.bookings);
      
      getBookingData();
      // setIsLoading(false);
      toast.success(`Request ${isApproved} Successfull!`)

      if (response.status !== 200) {

        throw new Error(response.error);
      }
    } catch (error) {

      console.log(error);
      // navigate("/login");
    }
  };





  // const hallId =userData.hallId
  // const hallName = userData.hallName

  // const handleBookingClick = (hallId,hallName) => {
  //   navigate('/bookingForm', { state: { hallId, hallName } });

  // };


  // const handleBookingClick = () => {
  //   sendData(data);
  // };


  return (
    <>

      <div className="mt-6">
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10">
          Booking<span className="text-indigo-700"> Requests</span>  </h1>{isLoading ? (
            <LoadingSpinner />
          ) :
            Array.isArray(bookingData) && bookingData.length > 0 ? (
              bookingData.map((booking) => (
                <div key={booking._id} className="my-2 ">
                  
                  <div className="flex  w-full items-center justify-center ">
                    <div className="w-full rounded-xl p-12  shadow-2xl shadow-blue-200 md:w-8/12  lg:w-10/12 bg-white ">

                      <div className="grid grid-cols-1 gap-6  lg:grid-cols-12">

{/* 
                        <div className="grid-cols-1 lg:col-end-12 col-span-1">
                         a
                        </div> */}


                        <div className="col-span-1 lg:col-span-12 ">
                          <div className="text-center lg:text-left">
                            <h2 className="text-2xl font-bold text-zinc-700">{booking.name}</h2>
                            {/* <p className="mt-2 text-l font-semibold text-zinc-700">{booking.location}</p> */}
                            {/* <p className="mt-4 text-zinc-500">I am a Front End Developer and UI/UX Designer</p> */}
                          </div>
                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="font-bold text-zinc-700">Booked Hall Name</p>
                            </div>

                            <div>
                              <p className="text-m font-semibold text-zinc-700">{booking.bookedHallName}</p>
                            
                            </div>
                            
                          </div>

                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="font-bold text-zinc-700">Event Name</p>
                            </div>

                            <div>
                              <p className="text-m font-semibold text-zinc-700">{booking.eventName}</p>
                            </div>
                          </div>


                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="font-bold text-zinc-700">Organizing Club</p>
                            </div>

                            <div>
                              <p className="text-m font-semibold text-zinc-700">{booking.organizingClub}</p>
                            </div>
                          </div>
                          {/* <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">Booking Id</p>
                        </div>

                        <div>
                          <p className="text-m font-semibold text-zinc-700">{booking._id}</p>
                        </div>
                      </div> */}


                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="font-bold text-zinc-700">Event Date</p>
                            </div>

                            <div>
                              <p className="text-m font-semibold text-zinc-700"> {format(new Date(booking.eventDate), "EEEE dd-MM-yyyy")}</p>
                            </div>
                          </div>

                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="font-bold text-zinc-700">Start Time</p>
                            </div>

                            <div>
                              <p className="text-m font-semibold text-zinc-700">{format(parseISO((booking.startTime).slice(0, -1)), "hh:mm aa")}</p>
                            </div>
                          </div>

                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="font-bold text-zinc-700">End Time</p>
                            </div>

                            <div>
                              <p className="text-m font-semibold text-zinc-700">{format(parseISO((booking.endTime).slice(0, -1)), "hh:mm aa")}</p>
                            </div>
                          </div>




                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="font-bold text-zinc-700">Event Manager</p>
                            </div>

                            <div>
                              <p className="text-m font-semibold text-zinc-700">{booking.eventManager}</p>
                            </div>
                          </div>

                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="font-bold text-zinc-700">Phone Number</p>
                            </div>

                            <div>
                              <p className="text-m font-semibold text-zinc-700">{booking.phoneNumber}</p>
                            </div>
                          </div>

                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="font-bold text-zinc-700">Alternate Number</p>
                            </div>

                            <div>
                              <p className="text-m font-semibold text-zinc-700">{booking.altNumber}</p>
                            </div>
                          </div>

                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="font-bold text-zinc-700">Created At</p>
                            </div>

                            <div>
                              <p className="text-m font-semibold text-zinc-700">{format(parseISO((booking.createdAt)), "EEEE dd-MM-yyyy hh:mm aa")}</p>
                            </div>
                          </div>

                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="text-m  text-xl sm:text-3xl md:text-4xl  lg:text-3xl xl:text-3xl  text-zinc-700 font-bold ">Status</p>
                            </div>

                            <div>
                              {booking.isApproved === "Approved" && (
                                <p className="text-m text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-green-500 font-black">
                                  {booking.isApproved}
                                </p>
                              )}
                              {booking.isApproved === "Pending" && (
                                <p className="text-m text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-yellow-500 font-black">
                                  {booking.isApproved}
                                </p>
                              )}
                              {booking.isApproved === "Rejected" && (
                                <p className="text-m text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-red-500 font-black">
                                  {booking.isApproved}
                                </p>
                              )}
                            </div>
                          </div>









                          <div className="mt-6 grid grid-cols-2 gap-4">
                            {/* <Link to={`/bookingForm`}> */}
                            <button className="w-full rounded-xl border-2 border-green-500 bg-white px-3 py-2 font-semibold text-green-500 hover:bg-green-500 hover:text-white"
                              onClick={() => updateBooking(booking._id, "Approved")}
                            >
                              <>
                              {isLoading ? (
                                <LoadingSpinner />
                                ) : 
                                 
                                    "Approve"}
                                    </>
                            </button>
                            {/* </Link> */}
                            <button className="w-full rounded-xl border-2 border-red-500 bg-white px-3 py-2 font-semibold text-red-500 hover:bg-red-500 hover:text-white"
                              onClick={() => updateBooking(booking._id, "Rejected")}>
                               <>
                              {isLoading ? (
                                <LoadingSpinner />
                                ) : 
                                 
                                    "Reject"}
                                    </>
                            </button>
                          </div>


                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h2 className="text-2xl font-bold text-zinc-700  text-center mt-4">No Bookings Requests found.</h2>

            )}


      </div>
    </>
  );
};

export default Bookings;
