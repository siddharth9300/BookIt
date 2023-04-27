import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

  
const Home = () => {


  const [userName,setUserName]=useState({});

  const [show,setShow]= useState(false)

  const userHomePage = async () => {
    try {
      const response = await axios.get("http://localhost:9002/getdata", {
        withCredentials: true, // include credentials in the request
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      console.log(data);
      setUserName ({
        ...userName,
        name: data.name,

      });
      setShow(true)
    } catch (error) {
      console.log(error);
    }
  };
  


  useEffect(() => {
    
  userHomePage();

  },[])
  










  return (
<>



  {/* <!--   more free components available at www.TailwindUIKit.com --> */}
  
  <div className="bg-gray-100">
    <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
      <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 font-black leading-7 md:leading-10">
        { show ? userName.name : (<>We are 
          <span className="text-indigo-700"> MERN </span>
          Developer</>)
          }
        </h1>
        <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-400 font-normal text-center text-sm sm:text-lg"> { show ? "Welcome Back " :"A professonal MERN developer" } </p>
      </div>
      <div className="flex justify-center items-center">
      { show ? "" : (<> <Link to="/login">
        <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-indigo-700 py-2 sm:py-4 text-sm">Sign In / Sign Up</button>
            </Link></>)
          }
     
            {/* <button className="focus:outline-none lg:text-lg lg:font-bold focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 hidden md:block bg-transparent transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-indigo-700 text-indigo-700  sm:px-8 py-1 sm:py-3 text-sm">Logout</button>
            
        <button className="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-transparent transition duration-150 ease-in-out hover:border-indigo-600 lg:text-xl lg:font-bold  hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-4 sm:px-10 py-2 sm:py-4 text-sm">Live Demo</button> */}
      </div>
    </div>
  </div>

</> 
 )
}

export default Home