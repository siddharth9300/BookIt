import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-toastify";
import { DepartmentList, InstitutionList } from "./Institutions";

const AboutUpdateForm = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    userType: "",
    facultyType: "",
    institution: "",
    department: "",
    adminFor: "",
  });

  const [originalData, setOriginalData] = useState({name: "",
    email: "",
    phone: "",
    userType: "",
    facultyType: "",
    institution: "",
    department: "",
    adminFor: "",});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
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

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
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
      // console.log(data);
      setUserData(data);
      setOriginalData(data);
      setIsLoading(false);
      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.warn("Unauthorized Access! Please Login!", {
          toastId: "Unauthorized",
        });
        navigate("/login");
      }
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    const {name , facultyType, phone} = userData;
    console.log(name , facultyType, phone);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/updateProfile`,
       { name , facultyType, phone},
       {
        withCredentials: true, // To include credentials in the request
        headers: {
          "Content-Type": "application/json",
        },
        }
      );
      if (response.status === 200) {
        toast.success("Profile updated successfully!", {
          toastId: "ProfileUpdated",
        });
        setIsEditing(false);
        setOriginalData(userData);
      }
    } catch (error) {
      if (error.response.status === 422 && error.response) {
        const data = error.response.data;
        toast.error(data.error, {
        
        });
        // setAuthStatus(data.error);
      }
      // toast.error("Error updating profile. Please try again later.", {
      //   toastId: "ProfileUpdateError",
      // });
    }
  };

  useEffect(() => {
    callAboutPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cancelEditing = () => {
    setUserData(originalData); // Reset to original data
    setIsEditing(false);
  };

  const institutionName = InstitutionList[userData.institution] || userData.institution;
  const departmentName = DepartmentList[userData.department] || userData.department;

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex min-h-screen w-full items-center justify-center ">
          <div className="w-full rounded-xl p-12 shadow-2xl shadow-blue-200 md:w-8/12 lg:w-6/12 bg-white">
            <form onSubmit={updateProfile}>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="col-span-1 lg:col-span-9">
                  <div className="text-center lg:text-left">
                    <div className="flex items-between justify-between">
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={userData.name}
                          onChange={handleInputs}
                          className="text-2xl font-bold text-zinc-700 border-b-2 border-gray-300 focus:outline-none"
                          placeholder="Enter your name"
                        />
                      ) : (
                        <h2 className="text-2xl font-bold text-zinc-700 capitalize">
                          {userData.name}
                        </h2>
                      )}
                      <button
                         onClick={() => (isEditing ? cancelEditing() : setIsEditing(true))}
                        type="button"
                        className="text-m font-bold leading-none text-gray-600 py-3 px-5 bg-yellow-200 rounded hover:bg-yellow-300 focus:outline-none">
                        {isEditing ? "Cancel" : "Edit"}
                      </button>
                    </div>

                    <p className="mt-2 text-l font-semibold text-zinc-700 capitalize">
                      {userData.userType === "hod"
                        ? `Head of ${userData.department} Department`
                        : userData.userType === "faculty"
                        ? `${userData.department !== "null" ? `Faculty of ${userData.department} Department` : `Director of ${userData.institution} Institution` } `
                        : userData.userType === "admin"
                        ? `Admin for  ${userData.adminFor} Management`
                        : ""}
                    </p>
                  </div>

                  {( userData.department !== "null") && (

                    <div className="mt-6 grid grid-cols-3 gap-8 text-center items-center lg:text-left">
                      <div>
                        <p className="font-bold text-zinc-700">Faculty Type</p>
                      </div>
                      <div>
                        {isEditing ? (
                          <select
                            name="facultyType"
                            value={userData.facultyType}
                            onChange={handleInputs}
                            className="text-m font-semibold text-zinc-700 border-b-2 border-gray-300 focus:outline-none">
                            <option value="teaching">Teaching</option>
                            <option value="non-teaching">Non-Teaching</option>
                          </select>
                        ) : (
                          <p className="text-m font-semibold text-zinc-700">
                            {!userData.facultyType
                              ? "Teaching"
                              : userData.facultyType === "teaching"
                              ? "Teaching"
                              : "Non-Teaching"}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 grid grid-cols-3 gap-8 text-center items-center lg:text-left">
                    <div>
                      <p className="font-bold text-zinc-700">Email</p>
                    </div>
                    <div>
                      {/* {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={userData.email}
                          onChange={handleInputs}
                          className="text-m font-semibold text-zinc-700 border-b-2 border-gray-300 focus:outline-none"
                        />
                      ) : ( */}
                        <p className="text-m font-semibold text-zinc-700">
                          {userData.email}
                        </p>
                      {/* )} */}
                    </div>
                    <div>
                      <VerifyButton />
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-8 text-center items-center lg:text-left">
                    <div>
                      <p className="font-bold text-zinc-700">Phone</p>
                    </div>
                    <div>
                      {isEditing ? (
                        <input
                          type="number"
                          name="phone"
                          value={userData.phone}
                          onChange={handleInputs}
                          className="text-m font-semibold text-zinc-700 border-b-2 border-gray-300 focus:outline-none"
                        />
                      ) : (
                        <p className="text-m font-semibold text-zinc-700">
                          {userData.phone}
                        </p>
                      )}
                    </div>
                  </div>
                  {userData.userType !== "admin" && (
                    <>
                      <div className="mt-6 grid grid-cols-3 gap-8 text-center items-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">Institution</p>
                        </div>
                        <div>
                          {/* {isEditing ? (
                            <input
                              type="text"
                              name="institution"
                              value={userData.institution}
                              onChange={handleInputs}
                              className="text-m font-semibold text-zinc-700 border-b-2 border-gray-300 focus:outline-none"
                            />
                          ) : ( */}
                            <p className="text-m font-semibold text-zinc-700">
                              {userData.institution} - {institutionName}
                            </p>
                          {/* )} */}
                        </div>
                      </div>
                      {userData.department !== "null" &&
                      <div className="mt-6 grid grid-cols-3 gap-8 text-center items-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">Department</p>
                        </div>
                        <div>
                         
                            <p className="text-m font-semibold text-zinc-700">
                              {userData.department} - {departmentName}
                            </p>
                      
                        </div>
                      </div>
                      }

                     
                    </>
                  )}
{/* 

{userData.userType === "faculty" && (
  <>
   <div className="mt-6 grid grid-cols-3 gap-8 text-center items-center lg:text-left">
   <div>
     <p className="font-bold text-zinc-700">HOD Name</p>
   </div>
   <div>
   
       <p className="text-m font-semibold text-zinc-700">
         {userData.hod.name} 
       </p>
   </div>
   
 </div>
 <div className="mt-6 grid grid-cols-3 gap-8 text-center items-center lg:text-left">
 <div>
   <p className="font-bold text-zinc-700">HOD Email</p>
 </div>
 <div>
 
     <p className="text-m font-semibold text-zinc-700">
       {userData.hod.email}
     </p>
 </div>
 
</div>
<div className="mt-6 grid grid-cols-3 gap-8 text-center items-center lg:text-left">
 <div>
   <p className="font-bold text-zinc-700">HOD Phone</p>
 </div>
 <div>
 
     <p className="text-m font-semibold text-zinc-700">
       {userData.hod.phone}
     </p>
 
 </div>
 
</div>
</>
 )} */}
                  

                  {isEditing && (
                    <div className="mt-6 text-center lg:text-left">
                      <button
                        type="submit"
                        className="text-white bg-blue-600 shadow focus:shadow-outline focus:outline-none border-0 py-2 px-5 font-bold hover:bg-blue-800 rounded text-sm">
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutUpdateForm;
