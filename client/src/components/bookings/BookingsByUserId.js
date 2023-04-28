import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import axios from 'axios';
// import BookingForm from "./BookingForm";

const Bookings = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState({});

  const [userId, setUserId] = useState();

  const userContact = async () => {
    try {
      const response = await axios.get("http://localhost:9002/getdata", {
        withCredentials: true, // include credentials in the request
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      console.log(data);
      setUserId(data._id);

      if (response.status !== 200) {
        throw new Error(response.error);
      }

      getHallsData(data._id);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   userContact();
  // }, []);
  console.log(userId);

  const getHallsData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:9002/bookings/${userId}`, {
        withCredentials: true, // include credentials in the request
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });

      const data = response.data;
      console.log(data);
      setBookingData(data.booking);

      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      // console.log(error);
      // navigate("/login");
    }
  };



  useEffect(() => {
    userContact();



  }, [])

  const handleBookingClick = (hallId, hallName) => {
    navigate(`/bookingForm/${hallId}/${hallName}`)
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
          Your<span className="text-indigo-700"> Bookings</span> </h1>
        {Array.isArray(bookingData) && bookingData.length > 0 ? (
          bookingData.map((booking) => (
            <div key={booking._id} className="my-2 ">
              <div className="flex  w-full items-center justify-center ">
                <div className="w-full rounded-xl p-12 shadow-2xl shadow-blue-200 md:w-8/12 lg:w-6/12 bg-white ">

                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    <div className="grid-cols-1 lg:col-span-3">
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
                    </div>

                    <div className="col-span-1 lg:col-span-9">
                      <div className="text-center lg:text-left">
                        <h2 className="text-2xl font-bold text-zinc-700">{booking.name}</h2>
                        {/* <p className="mt-2 text-l font-semibold text-zinc-700">{booking.location}</p> */}
                        {/* <p className="mt-4 text-zinc-500">I am a Front End Developer and UI/UX Designer</p> */}
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">Hall Id</p>
                        </div>

                        <div>
                          <p className="text-m font-semibold text-zinc-700">{booking._id}</p>
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
                          <p className="font-bold text-zinc-700">bookedHallName</p>
                        </div>

                        <div>
                          <p className="text-m font-semibold text-zinc-700">{booking.bookedHallName}</p>
                        </div>
                      </div>



                      <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">createdAt</p>
                        </div>

                        <div>
                          <p className="text-m font-semibold text-zinc-700">{booking.createdAt}</p>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">eventManager</p>
                        </div>

                        <div>
                          <p className="text-m font-semibold text-zinc-700">{booking.eventManager}</p>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">phoneNumber</p>
                        </div>

                        <div>
                          <p className="text-m font-semibold text-zinc-700">{booking.phoneNumber}</p>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">altNumber</p>
                        </div>

                        <div>
                          <p className="text-m font-semibold text-zinc-700">{booking.altNumber}</p>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">eventName</p>
                        </div>

                        <div>
                          <p className="text-m font-semibold text-zinc-700">{booking.eventName}</p>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">organizingClub</p>
                        </div>

                        <div>
                          <p className="text-m font-semibold text-zinc-700">{booking.organizingClub}</p>
                        </div>
                      </div>


                      <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">eventDate</p>
                        </div>

                        <div>
                          <p className="text-m font-semibold text-zinc-700">{booking.eventDate}</p>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">startTime</p>
                        </div>

                        <div>
                          <p className="text-m font-semibold text-zinc-700">{booking.startTime}</p>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">endTime</p>
                        </div>

                        <div>
                          <p className="text-m font-semibold text-zinc-700">{booking.endTime}</p>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                        <div>
                          <p className="text-m  text-xl sm:text-3xl md:text-4xl  lg:text-3xl xl:text-3xl  text-zinc-700 font-bold ">Status</p>
                        </div>

                        <div>
                          <p className="text-m  text-xl sm:text-3xl md:text-4xl  lg:text-3xl xl:text-3xl  text-green-500 font-black ">Approved</p>
                        </div>
                      </div>















































{/* 
                      <div className="mt-6 grid grid-cols-2 gap-4 text-center">

                          <h1 className="text-xl sm:text-3xl md:text-4xl  lg:text-3xl xl:text-3xl text-center text-green-500 font-black leading-7  md:leading-10">
           Approved </h1>


                          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-center text-green-500 font-black leading-7  md:leading-10">
           Approved </h1>
                      {/* <button className="w-full rounded-xl border-2 border-green-500 bg-white px-3 py-2 font-semibold text-green-500 hover:bg-green-500 hover:text-white"
                        onClick={() => handleBookingClick(booking._id, booking.name)}
                      >
                        Approve
                      </button>
                      <button className="w-full rounded-xl border-2 border-red-500 bg-white px-3 py-2 font-semibold text-red-500 hover:bg-red-500 hover:text-white">
                          Reject
                       </button> 
                    </div>
 */}

                    </div>
                  </div>




{/* 

                  <div class="h-full w-full py-16">


                    <div class="container mx-auto">

                      <dh-component>
                        <div class="w-11/12 lg:w-2/6 mx-auto">
                          <div class="bg-gray-200 h-1 flex items-center justify-between">
                            <div class="w-1/3 bg-indigo-700 h-1 flex items-center">
                              <div class="bg-indigo-700 h-6 w-6 rounded-full shadow flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                  <path stroke="none" d="M0 0h24v24H0z" />
                                  <path d="M5 12l5 5l10 -10" />
                                </svg>

                              </div>
                            </div>
                            <div class="w-1/3 flex justify-between bg-indigo-700 h-1 items-center relative">
                              <div class="absolute right-0 -mr-2">
                                <div class="relative bg-white shadow-lg px-2 py-1 rounded mt-16 -mr-12">
                                  <svg class="absolute top-0 -mt-1 w-full right-0 left-0" width="16px" height="8px" viewBox="0 0 16 8" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                      <g id="Progress-Bars" transform="translate(-322.000000, -198.000000)" fill="#FFFFFF">
                                        <g id="Group-4" transform="translate(310.000000, 198.000000)">
                                          <polygon id="Triangle" points="20 0 28 8 12 8"></polygon>
                                        </g>
                                      </g>
                                    </g>
                                  </svg>
                                  <p tabindex="0" class="focus:outline-none text-indigo-700 text-xs font-bold">Request Pending</p>
                                </div>
                              </div>

                                <div class="absolute right-0 -mr-2">
                                <div class="relative bg-white shadow-lg px-2 py-1 rounded mt-16 -mr-12">
                                  <svg class="absolute top-0 -mt-1 w-full right-0 left-0" width="16px" height="8px" viewBox="0 0 16 8" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                      <g id="Progress-Bars" transform="translate(-322.000000, -198.000000)" fill="#FFFFFF">
                                        <g id="Group-4" transform="translate(310.000000, 198.000000)">
                                          <polygon id="Triangle" points="20 0 28 8 12 8"></polygon>
                                        </g>
                                      </g>
                                    </g>
                                  </svg>
                                  <p tabindex="0" class="focus:outline-none text-indigo-700 text-xs font-bold">Request Pending</p>
                                </div>
                              </div>






                              
                              <div class="bg-indigo-700 h-6 w-6 rounded-full shadow flex items-center justify-center -ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                  <path stroke="none" d="M0 0h24v24H0z" />
                                  <path d="M5 12l5 5l10 -10" />
                                </svg>
                              </div>
                              <div class="bg-white h-6 w-6 rounded-full shadow flex items-center justify-center -mr-3 relative">
                                <div class="h-3 w-3 bg-indigo-700 rounded-full"></div>
                              </div>

                            </div>

                            
                            <div class="w-1/3 flex justify-end">
                              <div class="bg-white h-6 w-6 rounded-full shadow"></div>
                            </div>
                          </div>
                        </div>
                      </dh-component>

                    </div>
                  </div> */}







                </div>
              </div>
            </div>
          ))
        ) : (
          // <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10">
          // Bookings user </h1>
          <h2 className="text-2xl font-bold text-zinc-700 text-center mt-4">No Bookings found.</h2>

        )}

      </div>
    </>
  );
};

export default Bookings;
