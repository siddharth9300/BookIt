import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";
import { useParams } from "react-router-dom";
// import BookingForm from "./BookingForm";

const HallsEdit = () => {
  const navigate = useNavigate();
  const [hallData, setHallData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [authStatus, setAuthStatus] = useState("");
  const { hallId } = useParams();
 



  const getHallsData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/halls/${hallId}`, {
        withCredentials: true, // include credentials in the request
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });

      const data = response.data;
      // console.log(data.hall);
      setHallData(data.hall);
      setIsLoading(false);

      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      // console.log(error);
      navigate("/login");
    }
  };



  useEffect(() => {

    getHallsData();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])







  const UpdateHallForm = async (e) => {
    e.preventDefault();
    const { name,location,capacity,amenities,description } = hallData;

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/halls/${hallId}`,
        {
          name,location,capacity,amenities,description 
        },
        {
          withCredentials: true, // To include credentials in the request
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (!data) {
        toast.error("Request not send!")
        // console.log("Message not send");
      } else {
        toast.success("Hall Updated Successfull!")
        // alert("Message send");
        navigate("/halls")
        // setBookingData({ ...bookingData });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          const data = error.response.data;
          // Handle validation errors
          // You can set specific error messages for different fields if needed
          if (data && data.errors) {
            const errorMessage = data.errors.join(", ");
            toast.error(errorMessage);
            setAuthStatus(errorMessage);
          }
        } else if (error.response.status === 403) {
          toast.error("Unauthorized request!");
        } else {
          console.error(error);
          toast.error("An error occurred while updating the hall.");
        }
      } else {
        console.error(error);
        toast.error("An error occurred while updating the hall.");
      }
    }
  };


  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setHallData({ ...hallData, [name]: value });
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
<>{isLoading ? (
          <LoadingSpinner />
        ) : 



        <div>
        <div className="max-w-screen-md mx-auto p-5 my-10 bg-white shadow-2xl shadow-blue-200">
          <div className="text-center mb-16">
            <p className="mt-4 text-sm leading-7 text-gray-500 font-regular uppercase">
              Update Hall
            </p>
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
              Update Your <span className="text-indigo-600">Hall </span>
            </h3>
          </div>
  
          <form method="POST" className="w-full">
  
  
            <div className="flex flex-wrap -mx-3 mb-6">
  
  
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                  htmlFor="grid-event-manager"
                >
                  Hall Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-hall-name"
                  type="text"
                  value={hallData.name}
                  name="name"
                  onChange={handleInputs}
                  placeholder="Hall Name"
                />
                {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
              </div>
  
  
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-capacity"
                >
                 Capacity
                </label>
                <input
                  value={hallData.capacity}
                  name="capacity"
                  onChange={handleInputs}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-capacity"
                  type="number"
                  placeholder="Capacity"
                />
              </div>
            </div>
  
  
  
  
            <div className="flex flex-wrap -mx-3 mb-6">
  
  
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-amenities"
                >
                  Amenities
                </label>
                <input
                  value={hallData.amenities}
                  name="amenities"
                  onChange={handleInputs}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-amenities"
                  type="text"
                  placeholder="Amenities"
                />
                {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
              </div>
  
  
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-location"
                >
                  Location
                </label>
                <input
                  value={hallData.location}
                  name="location"
                  onChange={handleInputs}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-location"
                  type="text"
                  placeholder="Location"
  
                />
              </div>
            </div>
  
  
  
  
  
            <div className="flex flex-wrap -mx-3 mb-6">
  
  
              <div className="w-full md:w-2/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                  htmlFor="grid-description"
                >
                  Description
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-description"
                  type="text"
                  value={hallData.description}
                  name="description"
                  onChange={handleInputs}
                  placeholder="Description"
                />
                {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
              </div>
              {/* <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-end-time"
                >
                  End Time
                </label>
                <input
                  value={hallData.capacity}
                  name="endTime"
                  onChange={handleInputs}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-end-time"
                  type="time"
                  placeholder="End Time"
                />
              </div> */}
            </div>
  
  
  
            
  
  
  
        
  
  
  
  
  
  
  
  
  
  
  
  
  
            <div className="my-4">
                <p className="text-s text-red-600	 font-bold">{authStatus}</p>
              </div>
  
  
  
  
  
  
  
  
            <div className="flex flex-wrap -mx-3 mb-6">
              {/* <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
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
                  onClick={UpdateHallForm}
                  className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
            }

































   
        {/* ) */}
        {/* ) */}
      {/* )  */}
      {/* : (
        <h2 className="text-2xl font-bold text-zinc-700  text-center mt-4">No halls found.</h2>

      )} */}

      
{/* } */}
    </>
  );
};

export default HallsEdit;
