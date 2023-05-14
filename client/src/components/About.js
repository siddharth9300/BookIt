import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-toastify";
const About = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);



  const email = userData.email
  const emailVerified = userData.emailVerified

  const VerifyButton = () => {

    if (emailVerified) {
      return (
        <>
          <button
            className="text-white bg-green-600 shadow focus:shadow-outline ml-6  focus:outline-none border-0 py-2 px-5 font-bold  disable rounded text-sm"
          >
            Verified
          </button>
        </>
      )
    } else {

      return (

        <>
          <button
            type="submit"
            onClick={sendEmailVerificationLink}
            className="text-white bg-indigo-600 shadow focus:shadow-outline ml-6  focus:outline-none border-0 py-2 px-5 font-bold  hover:bg-indigo-800 rounded text-sm"
          >
            Verify Email
          </button>
        </>
      )
    }
  }




  const sendEmailVerificationLink = async (e) => {
    setIsLoading(true)
    e.preventDefault();


    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/emailVerificationLink`, {
        email
      }, {
        withCredentials: true, // include credentials in the request
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
      });

      const data = response.data

      if (data) {
        setIsLoading(false)

        // setAuthStatus("Please Check yout Email")    
        toast.success("Email Sent Successfull")
      }
      // setAuthStatus("")

    } catch (error) {
      if (error.response.status === 400 && error.response) {
        const data = error.response.data;
        // setAuthStatus(data.error)
        console.log(data.error)
        // window.alert(data.error);
      } else {
        // setAuthStatus("Something Went Worng")
        console.log(error.response.data)

      }
    }
  };



  const callAboutPage = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/about`, {
        withCredentials: true, // include credentials in the request
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });

      const data = response.data;
      console.log(data);
      setUserData(data);
      setIsLoading(false);

      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      // console.log(error);
      if (error.response.status === 401) {
        toast.warn("Unauthrized Access! Please Login!", {
          toastId: 'Unauthrized'
      })
        navigate("/login");
      }
      // navigate("/login");
    }
  };



  useEffect(() => {

    callAboutPage()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])





  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) :
        <div className="flex min-h-screen w-full items-center justify-center m-4">
          <div className="w-full rounded-xl p-12 shadow-2xl shadow-blue-200 md:w-8/12 lg:w-6/12 bg-white">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
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
                  <h2 className="text-2xl font-bold text-zinc-700">{userData.name}</h2>
                  <p className="mt-2 text-l font-semibold text-zinc-700">{userData.userType}</p>
                  {/* <p className="mt-4 text-zinc-500">I am a Front End Developer and UI/UX Designer</p> */}
                </div>

                <div className="mt-6 grid grid-cols-3 gap-8 text-center items-center lg:text-left">
                  <div>
                    <p className="font-bold text-zinc-700">User Id</p>
                  </div>

                  <div>
                    <p className="text-m font-semibold text-zinc-700">{userData._id}</p>
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



                <div className="mt-6 grid grid-cols-3 gap-8 text-center items-center lg:text-left">
                  <div>
                    <p className="font-bold text-zinc-700">Email</p>
                  </div>

                  <div>
                    <p className="text-m font-semibold text-zinc-700">{userData.email}</p>
                  </div>

                  <div>

                    <VerifyButton />
                    {/* {emailVerified? 
                  <button
                  type="submit"
                  
                  onClick={sendEmailVerificationLink}
                  className="text-white bg-indigo-600 shadow focus:shadow-outline ml-6  focus:outline-none border-0 py-2 px-5 font-bold  hover:bg-indigo-800 rounded text-sm"
                  >
                  Verify Email
                   </button>

                    :
                    <button
                    type="submit"
                    
                    onClick={sendEmailVerificationLink}
                    className="text-white bg-green-600 shadow focus:shadow-outline ml-6  focus:outline-none border-0 py-2 px-5 font-bold  hover:bg-indigo-800 rounded text-sm"
                    >
                    Verifyed
                     </button> 
                     } */}
                  </div>
                </div>

                {/* 
              <div className="mx-auto w-fit ">
              <div className="mx-auto">
                <button
                  type="submit"
                  
                  onClick={sendEmailVerificationLink}
                  className="text-white bg-indigo-600 shadow focus:shadow-outline focus:outline-none border-0 py-2 px-5 font-bold  hover:bg-indigo-800 rounded text-sm"
                >
                  Verify Email
                </button>
              </div>
            </div> */}



                <div className="mt-6 grid grid-cols-3 gap-8  text-center items-center lg:text-left">
                  <div>
                    <p className="font-bold text-zinc-700">Department</p>
                  </div>

                  <div>
                    <p className="text-m font-semibold text-zinc-700">{userData.department}</p>
                  </div>
                </div>


                <div className="mt-6 grid grid-cols-3 gap-8  text-center items-center lg:text-left">
                  <div>
                    <p className="font-bold text-zinc-700">Phone</p>
                  </div>

                  <div>
                    <p className="text-m font-semibold text-zinc-700">{userData.phone}</p>
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
      }
    </>
  );
};

export default About;
