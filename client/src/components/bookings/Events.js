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

      <div className="mt-6 min-h-screen">
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10">
          Upcomming<span className="text-indigo-700"> Events</span>  </h1>{isLoading ? (
            <LoadingSpinner />
          ) :
            Array.isArray(eventData) && eventData.length ? (
              eventData.map((event) => (
               <>
{/*                
               <div key={event._id} className="my-2 ">
                  <div className="flex  w-full items-center justify-center m-4">
                    <div className="w-full rounded-xl p-12 shadow-2xl shadow-blue-200 md:w-8/12 lg:w-10/12 bg-white">
                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">


                        <div className="col-span-1 lg:col-span-9">
                          <div className="text-center lg:text-left">
                            <h2 className="text-2xl font-bold text-zinc-700">{event.eventName}</h2>
                         
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


                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                 */}


                
                <div class="flex flex-col justify-center items-center my-10 ">
                    <div class="relative flex flex-col items-center  mx-auto  rounded-xl p-8 shadow-2xl shadow-blue-200 md:w-8/12 lg:w-10/12 bg-white">
                      <div class="mt-8 mb-8 w-full">
                        <h4 class="px-2 text-2xl font-bold text-navy-500 ">
                        {event.eventName}
                        </h4>

                      </div>
                      <div class="grid grid-cols-3 max-md:grid-cols-1 gap-4 px-2 w-full">
                        <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                          <p class="text-m font-bold text-gray-600">Event Venu</p>
                          <p class="text-base font-medium text-navy-700   ">
                          {event.bookedHallName}
                          </p>
                        </div>

                        <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                          <p class="text-m font-bold text-gray-600">Location</p>
                          <p class="text-base font-medium text-navy-700 ">
                          {event.bookedHallId.location}
                          </p>
                        </div>

                        <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                          <p class="ext-m font-bold text-gray-600">Organizing Club</p>
                          <p class="text-base font-medium text-navy-700 ">
                          {event.organizingClub}
                          </p>
                        </div>

                        <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                          <p class="ext-m font-bold text-gray-600">Event Date</p>
                          <p class="text-base font-medium text-navy-700 ">
                          {format(new Date(event.eventDate), "EEEE dd-MM-yyyy")}
                          </p>
                        </div>

                        <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                          <p class="ext-m font-bold text-gray-600">Starts At</p>
                          <p class="text-base font-medium text-navy-700 ">
                          {format(parseISO((event.startTime).slice(0, -1)), "hh:mm aa")}
                          </p>
                        </div>

                        <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                          <p class="ext-m font-bold text-gray-600">Ends At</p>
                          <p class="text-base font-medium text-navy-700 ">
                          {format(parseISO((event.endTime).slice(0, -1)), "hh:mm aa")}
                          </p>
                        </div>

                        <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                          <p class="ext-m font-bold text-gray-600">Event Manager</p>
                          <p class="text-base font-medium text-navy-700 ">
                          {event.eventManager}
                          </p>
                        </div>

                        <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                          <p class="ext-m font-bold text-gray-600">Department</p>
                          <p class="text-base font-medium text-navy-700 ">
                          {event.department}
                          </p>
                        </div>
                        <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                          <p class="ext-m font-bold text-gray-600">Phone</p>
                          <p class="text-base font-medium text-navy-700 ">
                            {event.phoneNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  </>




                ))
                  ) : (
                    <h2 className="text-2xl font-bold text-zinc-700  text-center mt-10">No Upcomming Events.</h2>

                  )}

      </div>



      
    </>
  );
};

export default Events;
