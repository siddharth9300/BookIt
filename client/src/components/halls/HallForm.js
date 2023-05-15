import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import axios from 'axios';
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";
// import { useParams } from "react-router-dom";
// import BookingForm from "./BookingForm";

const HallForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState("");
  // const { hallId, hallName } = useParams();
  const [hallData, setHallData] = useState({
    
    name:"",location:"",capacity:"",amenities:"",description:""
  });
  const [emailVerified, setEmailVerified] = useState(false);


  const userContact = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getdata`, {
        withCredentials: true, // include credentials in the request
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      console.log(data);

      if(data.emailVerified){
        setEmailVerified(true)
      }



      setIsLoading(false);

      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
   
      // console.log(error);
      
    }
  };

  useEffect(() => {
    userContact();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const CreateHall = async (e) => {
    e.preventDefault();
    const { name,location,capacity,amenities,description } = hallData;
    // setIsLoading(true)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/halls`,
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
      setIsLoading(false)

      if (!data) {
        toast.error("Request not send!")
        // console.log("Message not send");
      } else {
        toast.success("Hall Created Successfull!")
        // alert("Message send");
        navigate("/halls")
        // setBookingData({ ...bookingData });
      }
    } catch (error) {
      if (error.response.status === 422 && error.response) {
        const data = error.response.data;
        setAuthStatus(data.error);
        console.log(data.error);
        // window.alert(data.error);
      } else {
        console.error(error);
      }
      // console.log(error);
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
        )  : !emailVerified ? (

      

          <div class="flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
            <div class="w-full lg:w-1/2">
              {/* <img alt='error' class="hidden lg:block" src="https://i.ibb.co/v30JLYr/Group-192-2.png" />
              <img alt='error' class="hidden md:block lg:hidden" src="https://i.ibb.co/c1ggfn2/Group-193.png" /> */}
              <img alt='error' class="hidden lg:block"  src="https://gcdnb.pbrd.co/images/2PF5rEtb8fJL.png?o=1" />
              
            </div>
            <div class="w-full lg:w-1/2">
              <h1 class="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800 ">Looks Like Yout Have Not Verified Your Email!</h1>
              <p class="py-4 text-xl text-gray-800">Please click on the below button and verify email before booking.</p>
              {/* <p class="py-2 text-base text-gray-800">Sorry about that! Please visit our hompage to get where you need to go.</p> */}
              <div>
    
                <Link to="/about" ><button
                  class="w-full lg:w-auto my-4 rounded-md px-1 sm:px-16 py-5 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Verify Email
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
            Create Hall
            </p>
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
              Create Your <span className="text-indigo-600">Hall </span>
            </h3>
          </div>
  
          <form method="POST" className="w-full">
  
  
            <div className="flex flex-wrap -mx-3 mb-6">
  
  
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                  for="grid-event-manager"
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
                  for="grid-capacity"
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
                  for="grid-amenities"
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
                  for="grid-location"
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
                  for="grid-description"
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
                  for="grid-end-time"
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
                  onClick={CreateHall}
                  className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                  type="submit"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
           ) }

































   
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

export default HallForm;
