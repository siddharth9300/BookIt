import  { useEffect, useContext,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './../../App'
import { toast } from "react-toastify";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";
  

const Logout = () => {
  const { dispatch } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

const userId = localStorage.getItem("userId")

    const logoutUser = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/logout/${userId}`, {
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
          localStorage.removeItem("jwtoken");
          // Show success message
          setIsLoading(false)
          toast.success("Logout Successful", {
            toastId: 'logout',
        })

          // Navigate to login page
          navigate("/login", { replace: true })
        } else {
          throw new Error(res.error);
        }
      } catch (error) {
        //consolelog(error);
      }
    }
  useEffect(() => {
    logoutUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (<>
     {isLoading ? <LoadingSpinner /> : null}

  </>
  )
}

export default Logout;
