import React, { useState } from "react";

import LoadingSpinner from "../LoadingSpinner";
import axios from 'axios';
import { toast } from "react-toastify";

const PasswordReset = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [authStatus, setAuthStatus] = useState("");

//consolelog(email);



  const forgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true)


    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/passwordLink`, {
        email

      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

       const data = response.data

            if(data){
              setIsLoading(false)

                setAuthStatus("Please Check yout Email")    
                toast.success("Email Sent Successfull")
            }
          setEmail("")
          setAuthStatus("")

    } catch (error) {
      if (error.response.status === 400 && error.response) {
        const data = error.response.data;
        setIsLoading(false);
        setAuthStatus(data.error)
        //consolelog(data.error)
        // window.alert(data.error);
      } else {
        setAuthStatus("Something Went Worng")
        //consolelog(error.response.data)

      }
    }
  };


  return (

    
    <>{isLoading ? (
      <LoadingSpinner />
    ) :
      <section className="text-gray-600 body-font h-screen flex items-center justify-center bg-white">
        <div className="lg:w-2/6 md:w-1/2  bg-white shadow-2xl shadow-blue-200 rounded-lg p-8 flex flex-col md:ml-auto md:mr-auto mt-10 md:mt-0">
          <form method="POST">
            {/* <h2 className="text-gray-900 font-medium text-3xl title-font mt-10 mb-5">
              Login
            </h2> */}



            <h3 className="text-3xl my-8 sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
              Forget <span className="text-indigo-600">Password</span>
            </h3>


            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 block uppercase tracking-wide text-gray-700 text-s font-bold"
              >
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                placeholder="Enter Your Email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

           

            <div className="my-4">
              <p className="text-s text-red-600	 font-bold">

                {authStatus}
              </p>
            </div>




            <div className="mx-auto w-fit">
              <div className="mx-auto">
                <button
                  type="submit"
                  
                  onClick={forgotPassword}
                  className="text-white bg-indigo-600 shadow focus:shadow-outline focus:outline-none border-0 py-2 px-10 font-bold  hover:bg-indigo-800 rounded text-lg"
                >
                  Send
                </button>
              </div>
            </div>

          </form>

        </div>
      </section>
    }
    </>
    
  )
}

export default PasswordReset