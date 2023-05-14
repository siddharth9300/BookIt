import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"
import axios from 'axios';
import LoadingSpinner from "../LoadingSpinner";
// import { toast } from "react-toastify";
import {format,parseISO} from "date-fns"
// import BookingForm from "./BookingForm";

const Events = () => {
  // const navigate = useNavigate();
  const [eventData, setEventData] = useState({});
  const [isLoading, setIsLoading] = useState(true);




  const getEventData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/events`, {
        // withCredentials: true, // include credentials in the request
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });

      const data = response.data.bookings;
      console.log(data);


      const sortedEventData = data.sort((a, b) => {
        // Convert the event date strings to Date objects and compare them
        return new Date(a.eventDate) - new Date(b.eventDate);
      });


      

      setEventData(sortedEventData);

      // setEventData(data.bookings);   
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
      // if (error.response.status === 401) {
      //   toast.warn("Unauthrized Access! Please Login!")
      //   navigate("/login");
      // }
      // navigate("/login");
    }
  };






  useEffect(() => {

    getEventData();

  },[])









  return (
    <>

      <div className="mt-6">
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10">
          Upcomming<span className="text-indigo-700"> Events</span>  </h1>{isLoading ? (
            <LoadingSpinner />
          ) :
            Array.isArray(eventData) && eventData.length ? (
              eventData.map((event) => (
                <div key={event._id} className="my-2 ">
                  <div className="flex  w-full items-center justify-center m-4">
                    <div className="w-full rounded-xl p-12 shadow-2xl shadow-blue-200 md:w-8/12 lg:w-10/12 bg-white">
                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                        {/* <div className="grid-cols-1 lg:col-span-3">
                          <div className="mx-auto flex h-[90px] w-[90px] items-center justify-center rounded-full bg-blue-100 p-4">
                            <svg
                              id="logo-39"
                              width="50"
                              height="40"
                              viewBox="0 0 50 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M25.0001 0L50 15.0098V24.9863L25.0001 40L0 24.9863V15.0099L25.0001 0Z"
                                fill="#A5B4FC"
                                className="ccompli2"
                              ></path>
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M0 15.0098L25 0L50 15.0098V24.9863L25 40L0 24.9863V15.0098ZM25 33.631L44.6967 21.8022V18.1951L44.6957 18.1945L25 30.0197L5.30426 18.1945L5.3033 18.1951V21.8022L25 33.631ZM25 24.5046L40.1018 15.4376L36.4229 13.2298L25 20.0881L13.5771 13.2298L9.89822 15.4376L25 24.5046ZM25 14.573L31.829 10.4729L25 6.37467L18.171 10.4729L25 14.573Z"
                                fill="#4F46E5"
                                className="ccustom"
                              ></path>
                              <path
                                d="M25.0001 0L0 15.0099V24.9863L25 40L25.0001 0Z"
                                fill="#A5B4FC"
                                className="ccompli2"
                                fill-opacity="0.3"
                              ></path>
                            </svg>
                          </div>
                        </div> */}

                        <div className="col-span-1 lg:col-span-9">
                          <div className="text-center lg:text-left">
                            <h2 className="text-2xl font-bold text-zinc-700">{event.eventName}</h2>
                            {/* <p className="mt-2 text-l font-semibold text-zinc-700">{event.bookedHallName}</p> */}
                            {/* <p className="mt-4 text-zinc-500">I am a Front End Developer and UI/UX Designer</p> */}
                          </div>

                          
                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="font-bold text-zinc-700">Event Venue</p>
                            </div>

                            <div>
                              <p className="text-m font-semibold text-zinc-700">{event.bookedHallName}</p>
                            </div>
                          </div>

                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="font-bold text-zinc-700">Location</p>
                            </div>

                            <div>
                              <p className="text-m font-semibold text-zinc-700">{event.bookedHallId.location}</p>
                            </div>
                          </div>

                          



                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="font-bold text-zinc-700">Organizing Club</p>
                            </div>

                            <div>
                              <p className="text-m font-semibold text-zinc-700">{event.organizingClub}</p>
                            </div>
                          </div>

                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="font-bold text-zinc-700">Event Date</p>
                            </div>

                            <div>
                              <p className="text-m font-semibold text-zinc-700"> {format(new Date(event.eventDate), "EEEE dd-MM-yyyy")}</p>
                            </div>
                          </div>

                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="font-bold text-zinc-700">Starts At</p>
                            </div>

                            <div>
                              <p className="text-m font-semibold text-zinc-700">{format(parseISO((event.startTime).slice(0, -1)), "hh:mm aa")}</p>
                            </div>
                          </div>

                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="font-bold text-zinc-700">Ends At</p>
                            </div>

                            <div>
                              <p className="text-m font-semibold text-zinc-700">{format(parseISO((event.endTime).slice(0, -1)), "hh:mm aa")}</p>
                            </div>
                          </div>




                          {/* <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                <div>
                  <p className="font-bold text-zinc-700">Name</p>
                </div>

                <div>
                  <p className="text-m font-semibold text-zinc-700">Name</p>
                </div>
              </div> */}


                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="font-bold text-zinc-700">Event Manager</p>
                            </div>

                            <div>
                              <p className="text-m font-semibold text-zinc-700">{event.eventManager}</p>
                            </div>
                          </div>



                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="font-bold text-zinc-700">Phone</p>
                            </div>

                            <div>
                              <p className="text-m font-semibold text-zinc-700">{event.phoneNumber}</p>
                            </div>
                          </div>











                          {/* 
              <div className="mt-6 grid grid-cols-2 gap-4">
                <button className="w-full rounded-xl border-2 border-blue-500 bg-white px-3 py-2 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white">
                  Follow
                </button>

                <button className="w-full rounded-xl border-2 border-blue-500 bg-white px-3 py-2 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white">
                  View Profile
                </button>
              </div> */}


                        </div>
                      </div>
                    </div>
                  </div>
                </div>



              ))
            ) : (
              <h2 className="text-2xl font-bold text-zinc-700  text-center mt-10">No Upcomming Events.</h2>

            )}


      </div>
    </>
  );
};

export default Events;
