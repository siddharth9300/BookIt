import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './../../App'
import { toast } from "react-toastify";
import axios from "axios";

const Logout = () => {
  const { dispatch } = useContext(UserContext)

  const navigate = useNavigate();

const userId = localStorage.getItem("userId")

    const logoutUser = async () => {
      try {
        const res = await axios.get(`http://localhost:9002/logout/${userId}`, {
          // userId,
          withCredentials: true, // include credentials in the request
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // "userId": localStorage.getItem("userId")
          }
        });
        if (res.status === 200) {
          dispatch({ type: "USER", payload: null })
          dispatch({ type: "USER_TYPE", payload: null })

          // Clear localStorage
          // localStorage.removeItem("user");
          localStorage.removeItem("userId");

          // Show success message
          toast.success("Logout Successful")

          // Navigate to login page
          navigate("/login", { replace: true })
        } else {
          throw new Error(res.error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  useEffect(() => {
    logoutUser();
  }, [])

  return null;
}

export default Logout;
