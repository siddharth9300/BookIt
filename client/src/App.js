import "./App.css";
import { Routes, Route } from "react-router-dom";
import { createContext, useReducer } from "react";
// importing components
import Navbar from "./components/Navbar";
// import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";

// import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Logout from "./components/auth/Logout";
import Login from "./components/auth/Login";
import ErrorPage from "./components/ErrorPage";
import Halls from "./components/halls/Halls";
import { initialState, reducer } from "./reducer/UseReducer";
import BookingForm from "./components/bookings/BookingForm";
import Booking from "./components/bookings/Bookings";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import StudentDashboard from "./components/dashboard/StudentDashboard";
import BookingByUserId from "./components/bookings/BookingsByUserId";


export const UserContext = createContext();
const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)
  return (

    <>

      <UserContext.Provider value={{ state, dispatch }}>


        <Navbar />
        <Routes>
        <Route path="/" element={state.userType === "admin" ? <AdminDashboard /> : state.userType === "student" ? <StudentDashboard /> : <Halls />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/halls" element={<Halls />} />
          <Route exact path="/bookingForm/:hallId/:hallName" element={<BookingForm />} />
          <Route path="/bookings" element={state.userType === "admin" ? <Booking/> : state.userType === "student" ? <BookingByUserId/> : <Halls />} />
          {/* <Route path="/bookings" element={<Booking/>} /> */}

   

          <Route path="/*" element={<ErrorPage />} />
        </Routes>

      </UserContext.Provider>

    </>
  );
};

export default App;
