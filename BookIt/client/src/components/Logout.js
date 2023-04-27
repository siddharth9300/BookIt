import React, { useEffect ,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
const Logout = () => {
    const {state,dispatch} = useContext(UserContext)

    const navigate = useNavigate();

    // using promises
    useEffect(()=>{
        fetch("http://localhost:9002/logout", {
       method:"GET",
        credentials: "include", // include credentials in the request
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).then((res)=>{
        navigate("/login",{replace:true})
        dispatch({type:"USER",payload:false})
        if (res.status !== 200) {

            throw new Error(res.error);
        }

      }).catch((error)=>{
        console.log(error);
      })
    })

  return (
    <>
    {/* <h1>Logout Page</h1> */}
    </>
  )
}

export default Logout