import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "react-toastify";





const Signup = () => {
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const handleInputs = (e) => {
    // console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
    console.log(user);
  };

  // const PostData = async (e) => {
  //   e.preventDefault();
  //   const { name, email, phone, work, password, cpassword } = user;

  //   const res = await fetch("http://localhost:9002/register", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name,
  //       email,
  //       phone,
  //       work,
  //       password,
  //       cpassword,
  //     }),
  //   });

  //   const data = await res.json();

  //   if (res.status === 422 || !data) {
  //     window.alert("invalid Registration");
  //   } else {
  //     window.alert("Registration Successfull");
  //     navigate("/login");
  //   }
  // };

  const PostData = async (e) => {

    e.preventDefault();

    const { name, email, phone, work, password, cpassword } = user;

    try {
      const response = await axios.post(
        "http://localhost:9002/register",
        {
          name,
          email,
          phone,
          work,
          password,
          cpassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // const data = response.data;

      // if (response.status === 422 || !data) {
      //   console.log(data.error)
      //   window.alert(data.error);
      // } else {
        setIsLoading(true);
        toast.success("Sign Up Successfull!")

      // window.alert("Registration Successful");
      navigate("/login");
      // }
    } catch (error) {
      if (error.response.status === 422 && error.response) {
        const data = error.response.data;
        setAuthStatus(data.error);
        console.log(data.error);
        // window.alert(data.error);
      } else {
        console.error(error);
      }
    }
  };

  // const PostData = async (e) => {
  //       e.preventDefault();
  //   const { name, email, phone, work, password, cpassword } = user;
  //   try {
  //     const response = await axios.post("http://localhost:9002/register", {
  //       name,
  //       email,
  //       phone,
  //       work,
  //       password,
  //       cpassword,
  //     }
  //     , {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const data = response.data;

  //     console.log(data);

  //     if (response.status === 422) {

  //       alert("something setCredentialsError is wrong");
  //     }

  //     else {

  //       console.log("logged in at time",new Date())

  //       navigate("/login");

  //     }
  //   }
  //    catch (error) {
  //     console.log(error);

  //     alert("something is wrong");
  //   }
  // };

  return (
    <>{isLoading ? (
      <LoadingSpinner />
    ) : 
      <section className="text-gray-600 body-font my-10  h-screen flex items-center justify-center bg-white">
        <div className="lg:w-2/6 md:w-1/2 my-10 bg-white shadow-2xl shadow-blue-200 rounded-lg p-8 flex flex-col md:ml-auto md:mr-auto mt-10 md:mt-0">
          <form method="POST">
            <h3 className="text-3xl my-8 sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
              Sign <span className="text-indigo-600">Up</span>
            </h3>
            <div className="relative mb-4">
              <label
                htmlFor="full-name"
                className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold">
                Full Name
              </label>
              <input
                required
                type="text"
                value={user.name}
                onChange={handleInputs}
                id="name"
                name="name"
                placeholder="Full Name"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold">
                Email
              </label>
              <input
                type="email"
                required
                value={user.email}
                onChange={handleInputs}
                id="email"
                name="email"
                placeholder="Email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="phone"
                className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold">
                Phone
              </label>
              <input
                type="number"
                pattern="[0-9]{10}"
                required
                value={user.phone}
                onChange={handleInputs}
                id="phone"
                name="phone"
                placeholder="Phone"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="work"
                className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold">
                Your Profession
              </label>

              <select
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                id="work"
                name="work"
                value={user.work}
                onChange={handleInputs}>
                <option value="">Select</option>  

                <option value="Student">Student</option>
                <option value="Admin">Admin</option>
              </select>

              {/* 
              <input
                type="text"
                required
                value={user.work}
                onChange={handleInputs}
                id="work"
                name="work"
                placeholder="Your Profession"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              /> */}
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold">
                Password
              </label>
              <input
                required
                value={user.password}
                onChange={handleInputs}
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
                Confirm Password
              </label>
              <input
                required
                value={user.cpassword}
                onChange={handleInputs}
                type="password"
                id="cpassword"
                name="cpassword"
                placeholder="Confirm Password"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div className="my-4">
              <p className="text-s text-red-600	 font-bold">{authStatus}</p>
            </div>
            <div className="mx-auto w-fit">
              <div className="mx-auto">
                <button
                  type="submit"
                  onClick={PostData}
                  className="text-white bg-indigo-600 shadow focus:shadow-outline focus:outline-none border-0 py-2 px-10 font-bold  hover:bg-indigo-600 rounded text-lg">
                  Sign Up
                </button>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-m">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  {" "}
                  Login
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

export default Signup;
