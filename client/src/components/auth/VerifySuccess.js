import React, { useState, useEffect } from "react";
import {  Link } from "react-router-dom"

import LoadingSpinner from "../LoadingSpinner";
import axios from 'axios';
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const VerifySuccess = () => {

  // const navigate = useNavigate()
  // const [password, setPassword] = useState("");
  // const [cpassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [authStatus, setAuthStatus] = useState(false);
  const { id, token } = useParams();
  // //consolelog(email);

//consolelog(authStatus);
  const userValid = async () => {

    try {
    // const response = await axios.post("http://localhost:9002/login", {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/verifyEmail/${id}/${token}`, {
      // withCredentials: true, // To include credentials in the request
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data

    


    setIsLoading(false)
    if (data.status === 201) {
      //consolelog("user Valid");
      setAuthStatus(true)
      toast.success("Email Verified Successfull", {
        toastId: 'successfull'
    })

    }  else {
      //consolelog("user inValid");
      // navigate("/")
    }




    //   // }
    } catch (error) {
      if ((error.response.status === (401 ) || error.response.status === (500 )) && error.response) {
        // const data = error.response.data;
        // setAuthStatus(data.error)
        // setAuthStatus("Reset Link Exipired")  
        
        setAuthStatus(false)
        setIsLoading(false)

        toast.error("Link Exipired Verify Again!", {
          toastId: 'Unauthrized'
      })
        // navigate("/passwordReset")
        // //consolelog(data.error)
        // window.alert(data.error);
      }
      //  else {
      //   setAuthStatus(false)

      //   setAuthStatus("Something Went Worng")
      //   //consolelog(error)

      // }

      }
    // //consolelog(error);  
  }


  useEffect(() => {

    userValid();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])






  return (



    <>{isLoading ? (
      <LoadingSpinner />
    ) : !authStatus ? (

      

      <div className="flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
        <div className="w-full lg:w-1/2">
        <img alt='error' className="hidden lg:block" src="https://i.ibb.co/v30JLYr/Group-192-2.png" />
          <img alt='error' className="hidden md:block lg:hidden" src="https://i.ibb.co/c1ggfn2/Group-193.png" />
          <img alt='error' className="md:hidden" src="https://i.ibb.co/8gTVH2Y/Group-198.png" />
        </div>
        <div className="w-full lg:w-1/2">
          <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800 ">Verification Link Has Been Expired!</h1>
          <p className="py-4 text-xl text-gray-800">Please click on the below button and verify again.</p>
          {/* <p className="py-2 text-base text-gray-800">Sorry about that! Please visit our hompage to get where you need to go.</p> */}
          <div>

            <Link to="/about" ><button
              className="w-full lg:w-auto my-4 rounded-md px-1 sm:px-16 py-5 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Verify Again
            </button>
            </Link>
          </div>
        </div>
      </div>

    ) : (
      
      <div className="flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
        <div className="w-full lg:w-1/2">
          
          <img alt='error' className="hidden lg:block" src="https://gcdnb.pbrd.co/images/wpwpHmG9Wctv.png?o=1" />
          {/* <img alt='error' className="hidden md:block lg:hidden" src="https://i.ibb.co/c1ggfn2/Group-193.png" />
          <img alt='error' className="md:hidden" src="https://i.ibb.co/8gTVH2Y/Group-198.png" /> */}
        </div>
        <div className="w-full lg:w-1/2">
          <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800 ">Verification Has Been Done Successfully!</h1>
          <p className="py-4 text-xl text-gray-800">Please click on the below button to goto home page.</p>
          {/* <p className="py-2 text-base text-gray-800">Sorry about that! Please visit our hompage to get where you need to go.</p> */}
          <div>

            <Link to="/" ><button
              className="w-full lg:w-auto my-4 rounded-md px-1 sm:px-16 py-5 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Go back to Homepage
            </button>
            </Link>
          </div>
        </div>
      </div>
    )}
    </>

  )
}

export default VerifySuccess