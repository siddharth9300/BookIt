import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-toastify";
import { DepartmentList, InstitutionList } from "./Institutions";
const About = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const email = userData.email;
  const emailVerified = userData.emailVerified;
  const VerifyButton = () => {
    if (emailVerified) {
      return (
        <>
          <button className="text-white bg-green-600 shadow focus:shadow-outline ml-6  focus:outline-none border-0 py-2 px-5 font-bold  disable rounded text-sm">
            Verified
          </button>
        </>
      );
    } else {
      return (
        <>
          <button
            type="submit"
            onClick={sendEmailVerificationLink}
            className="text-white bg-indigo-600 shadow focus:shadow-outline ml-6  focus:outline-none border-0 py-2 px-5 font-bold  hover:bg-indigo-800 rounded text-sm">
            Verify Email
          </button>
        </>
      );
    }
  };
  const sendEmailVerificationLink = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/emailVerificationLink`,
        {
          email,
        },
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      if (data) {
        setIsLoading(false);
        toast.success("Email Sent To Admin Successfull");
      }
    } catch (error) {
      if (error.response.status === 400 && error.response) {
        const data = error.response.data;
        //consolelog(data.error)
      } else {
        //consolelog(error.response.data)
      }
    }
  };
  const callAboutPage = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/about`,
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      //consolelog(data);
      setUserData(data);
      setIsLoading(false);
      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.warn("Unauthrized Access! Please Login!", {
          toastId: "Unauthrized",
        });
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    callAboutPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const institutionName = InstitutionList[userData.institution] || userData.institution;
  const departmentName = DepartmentList[userData.department] || userData.department;
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex min-h-screen w-full items-center justify-center ">
          <div className="w-full rounded-xl p-12 shadow-2xl shadow-blue-200 md:w-8/12 lg:w-6/12 bg-white">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="col-span-1 lg:col-span-9">
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl font-bold text-zinc-700">
                    {userData.name}
                  </h2>
                  <p className="mt-2 text-l font-semibold text-zinc-700">
                   
                    {userData.userType === "hod"
                      ? `Head of ${userData.department} Department`
                      : userData.userType === "faculty"
                      ? `${userData.department} Department`
                      : userData.userType === "admin"
                      ? "Admin"
                      : ""}
                  </p>
                  {/* <p className="mt-2 text-l font-semibold text-zinc-700">
                    {" "}
                    {userData.userType === "hod"
                      ? `Head of ${userData.department} Department`
                      : userData.userType === "faculty"
                      ? `Faculty of ${userData.department} Department`
                      : userData.userType === "admin"
                      ? "Admin"
                      : ""}
                  </p> */}
                </div>
                {/* <div className="mt-6 grid grid-cols-3 gap-8 text-center items-center lg:text-left">
                  <div>
                    <p className="font-bold text-zinc-700">User Id</p>
                  </div>
                  <div>
                    <p className="text-m font-semibold text-zinc-700">{userData._id}</p>
                  </div>
                </div> */}
                <div className="mt-6 grid grid-cols-3 gap-8 text-center items-center lg:text-left">
                  <div>
                    <p className="font-bold text-zinc-700">Email</p>
                  </div>
                  <div>
                    <p className="text-m font-semibold text-zinc-700">
                      {userData.email}
                    </p>
                  </div>
                  <div>
                    <VerifyButton />
                  </div>
                </div>

                {userData.userType !== "admin" && (
                 <>
                 <div className="mt-6 grid grid-cols-3 gap-8  text-center items-center lg:text-left">
               <div>
                 <p className="font-bold text-zinc-700">Institution</p>
               </div>
               <div>
                 <p className="text-m font-semibold text-zinc-700">
                   {userData.institution} - {institutionName}
                 </p>
               </div>
             </div>
             <div className="mt-6 grid grid-cols-3 gap-8  text-center items-center lg:text-left">
               <div>
                 <p className="font-bold text-zinc-700">Department</p>
               </div>
               <div>
                 <p className="text-m font-semibold text-zinc-700">
                   {userData.department} - {departmentName}
                 </p>
               </div> 
             </div> 
                </>
              ) 
              }

                <div className="mt-6 grid grid-cols-3 gap-8  text-center items-center lg:text-left">
                  <div>
                    <p className="font-bold text-zinc-700">Phone</p>
                  </div>
                  <div>
                    <p className="text-m font-semibold text-zinc-700">
                      {userData.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default About;
