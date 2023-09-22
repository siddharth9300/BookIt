import "./App.css";
import { Routes, Route } from "react-router-dom";
import { createContext, useReducer } from "react";
// importing components
import axios from "axios"
import Navbar from "./components/Navbar";
// import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Signup from "./components/auth/Signup";
import Logout from "./components/auth/Logout";
import Login from "./components/auth/Login";
import ErrorPage from "./components/ErrorPage";
import Halls from "./components/halls/Halls";
import BookingForm from "./components/bookings/BookingForm";
import BookingsAdmin from "./components/bookings/BookingsAdmin";
import BookingsHod from "./components/bookings/BookingsHod";

import AdminDashboard from "./components/dashboard/AdminDashboard";
import FacultyDashboard from "./components/dashboard/FacultyDashboard";
import BookingFaculty from "./components/bookings/BookingsFaculty";
import Footer from "./components/Footer";
import HallsAdmin from "./components/halls/HallsAdmin";
import { initialState, reducer } from "./reducer/UseReducer";



import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HallsEdit from "./components/halls/HallsEdit";
import HallForm from "./components/halls/HallForm";
import HodDashboard from "./components/dashboard/HodDashboard";
import PasswordReset from "./components/auth/PasswordReset";

import ForgotPassword from "./components/auth/ForgotPassword";
import VerifySuccess from "./components/auth/VerifySuccess";
import Unauthorized from "./components/Unauthorized";
import BookingUpdateFrom from "./components/bookings/BookingUpdateForm"
import Events from "./components/bookings/Events";
import BookingsView from "./components/bookings/BookingView";
export const UserContext = createContext();
const App = () => {

  
    // useEffect(() => {
      // const token = Cookies.get("jwtoken");
      // const cookies = document.cookie.split("; ");
      // const tokenCookie = cookies.find(cookie => cookie.startsWith("jwtoken="));
      // const token = tokenCookie ? tokenCookie.split("=")[1] : null;
      // const token = document.cookie.split(";").find((c) => c.trim().startsWith("jwtoken="));
      const token = (localStorage.getItem("jwtoken"))

      //consolelog(token); 
      // axios.defaults.headers.common["authorization"] = token.split("=")[1];;
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
      // axios.defaults.headers["authorization"] = token;
      axios.defaults.withCredentials = true;
    // }, []);
    
    const [state, dispatch] = useReducer(reducer, initialState)



  return (

    <>

      <UserContext.Provider value={{ state, dispatch }}>


        <Navbar />
        <Routes>
        <Route path="/" element={state.userType === "admin" ? <AdminDashboard /> : state.userType === "faculty" ? <FacultyDashboard /> : process.env.REACT_APP_HOD_FEATURE &&  state.userType === "hod" ? <HodDashboard />  : <Login />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/profile" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/passwordReset" element={<PasswordReset />} />
          <Route path="/forgotPassword/:id/:token" element={<ForgotPassword />} />
          <Route path="/events" element={<Events />} />

          {/* <Route path="/passwordReset" element={<PasswordReset />} /> */}
          <Route path="/verifyEmail/:id/:token" element={<VerifySuccess/>} />       
          
          <Route path="/halls" element={state.userType === "admin" ? <HallsAdmin/> : <Halls />}/>
          <Route exact path="/halls/:hallId/:hallName" element={state.userType === "admin" ?<HallsEdit /> : <Unauthorized />} />
          <Route exact path="/bookingsEdit/:bookingId" element={state.userType === "admin" ? <BookingUpdateFrom/>  : process.env.REACT_APP_HOD_FEATURE &&  state.userType === "hod" ? <BookingUpdateFrom/>  : <Unauthorized />} />
          
          
          {/* <Route exact path="/bookings/:bookingId" element={state.userType === "admin" ? <BookingUpdateFrom/>  : state.userType === "hod" ? <BookingUpdateFrom/>  : <Unauthorized />} /> */}
          <Route path="/hallForm" element={state.userType === "admin" ?<HallForm /> : <Unauthorized />} />

          <Route path="/bookings" element={state.userType === "admin" ? <BookingsAdmin/> : state.userType === "faculty" ? <BookingFaculty/> :  process.env.REACT_APP_HOD_FEATURE && state.userType === "hod" ? <BookingsHod/>  : <Unauthorized />} />
          <Route exact path="/bookingForm/:hallId/:hallName" element={<BookingForm />} />
          {/* <Route path="/bookings" element={<Booking/>} /> */}

          <Route exact path="/bookingsView/:bookingId" element={<BookingsView/>} />
   

          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        
      <Footer/>
      </UserContext.Provider>


      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
