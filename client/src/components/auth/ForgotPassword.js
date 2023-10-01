import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

import LoadingSpinner from "../LoadingSpinner";
import axios from 'axios';
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const ForgotPassword = () => {

  const navigate = useNavigate()
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState("");
  const { id, token } = useParams();
  // //consolelog(email);



  const userValid = async () => {

    try {
    // const response = await axios.post("http://localhost:9002/login", {
    // eslint-disable-next-line no-unused-vars
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/forgotPassword/${id}/${token}`, {
      // withCredentials: true, // To include credentials in the request
      headers: {
        "Content-Type": "application/json",
      },
    });

    // const data = response.data






    //   // }
    } catch (error) {
      if (error.response.status === 401 && error.response) {
        // const data = error.response.data;
        // setAuthStatus(data.error)
        // setAuthStatus("Reset Link Exipired")  
        toast.error("Link Exipired Reset Again!", {
          toastId: 'Unauthrized'
      })
        navigate("/passwordReset")
        // //consolelog(data.error)
        // window.alert(data.error);
      }
      //  else {
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






  const sendPassword = async (e) => {
    e.preventDefault();

setIsLoading(true)

    try {
      // const response = await axios.post("http://localhost:9002/login", {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/${id}/${token}`, {
        password,cpassword
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;

      //consolelog(data);

      if (data.status === 201) {
        setIsLoading(false)

        toast.success("Password Changed Successfully!")
        navigate("/login")
        //consolelog("user Valid");
  
      }  else {
        //consolelog("user inValid");
        // navigate("/")
      }

      // if (response.status === 400 || !data) {
      //   setAuthStatus("Invalid credentials");
      //   window.alert("invalid")
      // } else {


      // }
    } catch (error) {
      if (error.response.status === 401 && error.response) {
        const data = error.response.data;
        setAuthStatus(data.error)
        //consolelog(data.error)
        // window.alert(data.error);
      }else if (error.response.status === 422 && error.response) {
        const data = error.response.data;
        setAuthStatus(data.error);
        //consolelog(data.error);
        // window.alert(data.error);
      } else {
        setAuthStatus("Something Went Worng")
        //consolelog(error)

      }
      // //consolelog(error);  
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
              Reset <span className="text-indigo-600">Password</span>
            </h3>


            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold">
                New Password
              </label>
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="cpassword"
                className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold">
                Confirm New Password
              </label>
              <input
                required
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
                type="password"
                id="cpassword"
                name="cpassword"
                placeholder="Confirm Password"
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

                  onClick={sendPassword}
                  className="text-white bg-indigo-600 shadow focus:shadow-outline focus:outline-none border-0 py-2 px-10 font-bold  hover:bg-indigo-800 rounded text-lg"
                >
                  Change Password
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

export default ForgotPassword