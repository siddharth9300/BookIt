import React, { useEffect, useState ,useContext} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";
import axios from "axios";
import { parseISO, format } from 'date-fns';
import { UserContext } from "../../App";

import {RequestSent , ApprovedByAdmin,ApprovedByHod,RejectedByAdmin,RejectedByHod } from "../Steps"
const BookingsView = (props) => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  console.log(bookingId);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingData, setBookingData] = useState(
    {
    });
    const { state } = useContext(UserContext)

    console.log(state.userType);
  const getbookingById = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/bookings/${bookingId}`, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = response.data.booking;
      console.log(data);
      setBookingData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getbookingById();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  console.log(bookingData);


  const updateBooking = async (bookingId, isApproved) => {
    setIsLoading(true);
    console.log(isApproved);
    try {
      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/bookingsEdit/${bookingId}`, {
        isApproved: isApproved
      }, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      const data = response.data;
      console.log(data);
      getbookingById();
      toast.success(`Request ${isApproved} Successfull!`)
      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const deleteBooking = async (bookingId) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/bookings/${bookingId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      if (!data) {
        toast.error("Request not send!")
      } else {
        toast.success("Request send Successfull!")
        navigate("/")
      }
    } catch (error) {
      if (error.response.status === 404 && error.response) {
        const data = error.response.data;
        console.log(data.error);
      } else {
        console.error(error);
      }
    }
  };
  const handleEditClick = (bookingId) => {
    navigate(`/bookingsEdit/${bookingId}`)
  };
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="max-w-screen-md mx-auto p-5 my-10 bg-white shadow-2xl shadow-blue-200">
            <div className="text-center mb-16">
              <p className="mt-4 text-sm leading-7 text-gray-500 font-regular uppercase">
                View Booking
              </p>
              <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                View <span className="text-indigo-600">Booking </span>
              </h3>
            </div>
            <form method="POST" className="w-full">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    for="grid-event-manager"
                  >
                    Event Manager Name
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-event-manager"
                  >{bookingData.eventManager}</p>
                  {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-event-name"
                  >
                    Event Name
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-event-name"
                  >{bookingData.eventName}</p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-organizing-club"
                  >
                    Organizing Club
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-organizing-club"
                  >{bookingData.organizingClub}</p>
                  {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>



                {/* <div className="w-full md:w-1/2 px-3">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-event-date"
                  >
                    Event Date
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-event-date"
                  >{format(new Date(bookingData.eventDate), "EEEE dd-MM-yyyy")}</p>
                </div> */}

                <div className="w-full md:w-1/2 px-3">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-event-date"
                  >
                    Event Date type
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-event-date"
                  >
  {bookingData.eventDateType === 'multiple' ? 'Multiple Days' : bookingData.eventDateType === 'half' ? 'Half Day' : 'Full Day'}
                    </p>
                </div>


              </div>



              {bookingData.eventDateType === "half" && (
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    for="grid-start-time"
                  >
                    Start Time
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-start-time"
                  >{format(parseISO((bookingData.startTime).slice(0, -1)), "hh:mm aa")}</p>
                  {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-end-time"
                  >
                    End Time
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-end-time"
                  >{format(parseISO((bookingData.endTime).slice(0, -1)), "hh:mm aa")}</p>
                </div>
              </div>

              )}


{bookingData.eventDateType === "multiple" && (
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    for="grid-start-time"
                  >
                    Event Start Date
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-start-time"
                  >{format(new Date(bookingData.eventStartDate), "EEEE dd-MM-yyyy")}</p>
                  {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-end-time"
                  >
                    Event End Date
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-end-time"
                  >{format(new Date(bookingData.eventEndDate), "EEEE dd-MM-yyyy")}</p>
                </div>
              </div>

              )}


              <div className="flex flex-wrap -mx-3 mb-6">

              {(bookingData.eventDateType === "full" || bookingData.eventDateType === "half") &&(

                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    for="grid-department"
                  >
                    Event Date
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-department"
                  >{format(new Date(bookingData.eventDate), "EEEE dd-MM-yyyy")}</p>
                  {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                    )}

                <div className="w-full md:w-1/2 px-3">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    for="grid-hall-name"
                  >
                    Hall Name
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-hall-name"
                  >{bookingData.bookedHallName}</p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    for="grid-phone-number"
                  >
                    Phone Number
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-phone-number"
                  >{bookingData.phoneNumber}</p>
                  {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    for="grid-alt-number"
                  >
                    Alternate Number
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-alt-number"
                  >{bookingData.altNumber}</p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    for="grid-phone-number"
                  >
                    Institution
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-phone-number"
                  >{bookingData.userId.institution}</p>
                  {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    for="grid-alt-number"
                  >
                    Department
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-alt-number"
                  >{bookingData.userId.department}</p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    for="grid-phone-number"
                  >
                    Requested By
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-phone-number"
                  >{bookingData.userId.name}</p>
                  {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    for="grid-alt-number"
                  >
                    Request Created At
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-alt-number"
                  >{format(parseISO((bookingData.createdAt)), "EEEE dd-MM-yyyy hh:mm aa")}</p>
                </div>
              </div>
              {/* 
          <div className="my-4">
              <p className="text-s text-red-600	 font-bold">{authStatus}</p>
            </div>
 */}
              <div className="mt-6 ">
                {/* <div>
                              <p className="text-m  text-xl sm:text-3xl md:text-4xl  lg:text-3xl xl:text-3xl  text-zinc-700 font-bold ">Status</p>
                            </div> */}
                {bookingData.isApproved === "Approved By Admin" && (
                  <ApprovedByAdmin />
                )}
                {bookingData.isApproved === "Approved By HOD" && (
                  <ApprovedByHod />
                )}
                 {bookingData.isApproved === "Rejected By HOD" && (
                  <RejectedByHod />
                )}
                {bookingData.isApproved === "Rejected By Admin" && (
                  <RejectedByAdmin />
                )}
                 {bookingData.isApproved === "Request Sent" && (
                  <RequestSent/>
                )}
                
              </div>
              <div class="px-5 py-5 text-l flex font-bold  bg-white justify-between border-gray-200">
                {/* <button onClick={() => handleViewClick(bookingData._id)} className="text-m font-semibold ml-5 leading-none text-gray-600 py-3 px-5 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none">View</button> */}
                {/* <button onClick={() => handleEditClick(bookingData._id)}
                  className="   leading-none text-gray-600 py-3 px-5 bg-yellow-200 rounded hover:bg-yellow-300 focus:outline-none">Edit</button>
               */}


               {state.userType === "admin" &&
               
               <>
                <button onClick={() => handleEditClick(bookingData._id)}
                  className="   leading-none text-gray-600 py-3 px-5 bg-yellow-200 rounded hover:bg-yellow-300 focus:outline-none">Edit</button>
              
               <button
               onClick={() => updateBooking(bookingData._id, "Approved By Admin")} className="   leading-none text-gray-600 py-3 px-5 bg-green-200 rounded hover:bg-green-300 focus:outline-none">Approve</button>
               <button
               onClick={() => updateBooking(bookingData._id, "Rejected By Admin")} className="   leading-none text-gray-600 py-3 px-5 bg-red-200 rounded hover:bg-red-300 focus:outline-none">Reject</button>
             
             <button
                  onClick={() => deleteBooking(bookingData._id)} className="   leading-none text-gray-600 py-3 px-5 bg-red-400 rounded hover:bg-red-500 focus:outline-none">Delete</button>
           
               </>
    }
    {state.userType === "hod" &&
                  <>
                   <button onClick={() => handleEditClick(bookingData._id)}
                  className="   leading-none text-gray-600 py-3 px-5 bg-yellow-200 rounded hover:bg-yellow-300 focus:outline-none">Edit</button>
              
              <button
              onClick={() => updateBooking(bookingData._id, "Approved By HOD")} className="   leading-none text-gray-600 py-3 px-5 bg-green-200 rounded hover:bg-green-300 focus:outline-none">Approve</button>
              <button
              onClick={() => updateBooking(bookingData._id, "Rejected By HOD")} className="   leading-none text-gray-600 py-3 px-5 bg-red-200 rounded hover:bg-red-300 focus:outline-none">Reject</button>
            
            <button
                  onClick={() => deleteBooking(bookingData._id)} className="   leading-none text-gray-600 py-3 px-5 bg-red-400 rounded hover:bg-red-500 focus:outline-none">Delete</button>
           
              </>
                
              }


{/* 
                <button
               onClick={() => updateBooking(bookingData._id, `Approved By ${state.userType}`)} className="   leading-none text-gray-600 py-3 px-5 bg-green-200 rounded hover:bg-green-300 focus:outline-none">Approve</button>
               <button
               onClick={() => updateBooking(bookingData._id, `Rejected By ${state.userType}`)} className="   leading-none text-gray-600 py-3 px-5 bg-red-200 rounded hover:bg-red-300 focus:outline-none">Reject</button>
              */}

{/* 
                <button
                  onClick={() => deleteBooking(bookingData._id)} className="   leading-none text-gray-600 py-3 px-5 bg-red-400 rounded hover:bg-red-500 focus:outline-none">Delete</button> */}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default BookingsView;
