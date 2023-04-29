import React, { useState , useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./../../App";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "react-toastify";
const Login = () => {



  const {state,dispatch} = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false);


  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authStatus, setAuthStatus] = useState("");

//   const loginUser = async (e) => {
//     e.prevenDefault();

//     const res = await fetch("http://localhost:9002/login", {
//       method: "POST",
//       credentials: 'include',
//       headers: {
//         "Content-Type": "application/json",
        
//       },
//       body: JSON.stringify({
//         email,

//         password,
//       }),
//     });

//     const data = await res.json();

//     if (res.status === 400 || !data) {
//       window.alert("invalid credentials");
//     } else {
//       window.alert("Login Successfull");
//       navigate("/login");
//     }
//   };












  const loginUser = async (e) => {
    e.preventDefault();
   

  
    try {
      const response = await axios.post("http://localhost:9002/login", {
        email,
        password,
      }, {
        withCredentials: true, // To include credentials in the request
        headers: {
          "Content-Type": "application/json",
        },
      });
  
        const data = response.data;

        console.log(data.work);
    
      
      // if (response.status === 400 || !data) {
      //   setAuthStatus("Invalid credentials");
      //   window.alert("invalid")
      // } else {
        
        
        dispatch({type:"USER",payload:true})
   
            if (data.work === 'Admin') {
              dispatch({ type: 'USER_TYPE', payload: "admin" });  
            } else {
              dispatch({ type: 'USER_TYPE', payload: "student" });  
            }
            toast.success("Login Successfull")
            setIsLoading(true);
            
        navigate("/");
      // }
    } catch (error) {
      if (error.response.status === 400 && error.response) {
        const data = error.response.data;
        setAuthStatus(data.error)
        console.log(data.error)
        // window.alert(data.error);
      }else{
        setAuthStatus("Something Went Worng")
        console.log(error)

      }
      // console.log(error);  
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
        Sign <span className="text-indigo-600">In</span>
      </h3>


            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
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
                placeholder="Email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
              >
                Password
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


            <div className="my-4">
              <p className="text-s text-red-600	 font-bold">
                
                 {authStatus} 
              </p>
            </div>


            <div className="mx-auto w-fit">
              <div className="mx-auto">
                <button
                  type="submit"
                  onClick={loginUser}
                  className="text-white bg-indigo-600 shadow focus:shadow-outline focus:outline-none border-0 py-2 px-10 font-bold  hover:bg-indigo-600 rounded text-lg"
                >
                  Login
                </button>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-m">
                Don't have an account yet?{" "}
                <Link to="/signup" className="text-blue-600 hover:underline">
                  {" "}
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
          
        </div>
      </section>
}
    </>
  );
};

export default Login;