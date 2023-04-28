import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './../../App'
import { toast } from "react-toastify";
import axios from "axios";
const Logout = () => {
  const { state, dispatch } = useContext(UserContext)

  const navigate = useNavigate();

  // using promises
  useEffect(() => {
    axios.get("http://localhost:9002/logout", {
      withCredentials: true, // include credentials in the request
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then((res) => {
      dispatch({ type: "USER", payload: false })
      dispatch({ type: "USER_TYPE", payload: false })

      toast.success("Logout Successfull")

      navigate("/login", { replace: true })
      if (res.status !== 200) {

        throw new Error(res.error);
      }

    }).catch((error) => {
      console.log(error);
    })
  },[]

  )

  return (
    <>
      {/* <h1>Logout Page</h1> */}
    </>
  )
}

export default Logout