import "./App.css";
import { Routes, Route } from "react-router-dom";
import { createContext, useReducer } from "react";
// importing components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import ErrorPage from "./components/ErrorPage";
import Halls from "./components/Halls";
import { initialState, reducer } from "./reducer/UseReducer";
import BookingForm from "./components/BookingForm";


export const UserContext = createContext();
const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)
  return (

    <>

      <UserContext.Provider value={{ state, dispatch }}>

        <Navbar />

        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Halls />} />
          <Route exact path="/bookingForm/:hallId/:hallName" element={<BookingForm />} />
   

          <Route path="/*" element={<ErrorPage />} />
        </Routes>

      </UserContext.Provider>

    </>
  );
};

export default App;
