import React, { useContext   } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";


const Navbar = () => {
  const { state } = useContext(UserContext)

  // const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    console.log("toggle called");
    document.getElementById('menu').classList.toggle('hidden');
    
    // setShowMenu(!showMenu);
  };
  console.log(state);

// const dashboard = userType.charAt(0).toUpperCase() + userType.slice(1);
// console.log(dashboard); 

// "Admin"

const RenderUser = () => {
  if (state.userType === "admin") {
    return (
      <div>
        <Link to="/halls">Halls</Link>
      </div>
    );
  } else if (state.userType === "faculty") {
    return (
      <div>
        <Link to="/bookings">Bookings</Link>
      </div>
    );
  } else {
    return (
      <div>
        <Link to="/halls">Halls</Link>
      </div>
    );
  }
};
// const jwtoken = getCookie('jwtoken');


  const RenderMenu = () => {

    if (state.user) {
        
      return (
        <>

          {/* <Link to="/logout" className="mr-5 hover:text-gray-900">Logout</Link> */}
          <Link to="/logout">
            <button className="focus:outline-none lg:text-lg lg:font-bold focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700  md:block bg-transparent transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-indigo-700 text-indigo-700  sm:px-8 py-1 sm:py-3 text-sm">Logout</button>
          </Link>
        </>
      )
    } else {

      return (

        <>
        
          <Link to="/login">
            <button className="focus:outline-none lg:text-lg lg:font-bold focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700  md:block bg-transparent transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-indigo-700 text-indigo-700  sm:px-8 py-1 sm:py-3 text-sm">Sign In / Sign Up</button>
          </Link>
          {/* <button className="focus:outline-none lg:text-lg lg:font-bold focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 hidden md:block bg-transparent transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-indigo-700 text-indigo-700  sm:px-8 py-1 sm:py-3 text-sm">Sign In</button> */}

          {/* <Link to="/login" className="mr-5 hover:text-gray-900">Login</Link>
            <Link to="/signup" className="mr-5 hover:text-gray-900">Sign Up</Link> */}
        </>
      )
    }
  }


  return (<>

    <nav className="w-full border-b">
      <div className="py-5 md:py-0 container mx-auto px-6 flex items-center justify-between">
          <Link to={"/"}>
        <div aria-label="Home. logo" className="flex justify-between items-center" role="img">
          {/* <h1>asd</h1> */}
          <img className="w-12 md:w-auto" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/centre_aligned_simple-Svg1.svg" alt="logo" />
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10">
              Book  <span className="text-indigo-700">It</span> </h1>
         
        </div>
          </Link>

        <div>
          <button onClick={toggleMenu} className="sm:block md:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
            <svg aria-haspopup="true" aria-label="open Main Menu" xmlns="http://www.w3.org/2000/svg" className="md:hidden icon icon-tabler icon-tabler-menu" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round">
              <path stroke="none" d="M0 0h24v24H0z"></path>
              <line x1="4" y1="8" x2="20" y2="8"></line>
              <line x1="4" y1="16" x2="20" y2="16"></line>
            </svg>
          </button>
          <div id="menu" className="md:block lg:block hidden">
            <button onClick={toggleMenu} className="block md:hidden lg:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 fixed focus:outline-none focus:ring-2 focus:ring-gray-500 z-30 top-0 mt-6">
              <svg aria-label="close main menu" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            
            <ul onClick={toggleMenu} className="flex text-3xl md:text-base items-center py-10 md:flex flex-col md:flex-row justify-center fixed md:relative top-0 bottom-0 left-0 right-0 bg-white md:bg-transparent z-20">
            

              <li className="text-gray-700 hover:text-gray-900 cursor-pointer text-base lg:text-lg pt-10 md:pt-0">
                <Link to="/">Home</Link>
              </li>
              <li className="text-gray-700 hover:text-gray-900 cursor-pointer text-base lg:text-lg pt-10 md:pt-0 md:ml-5 lg:ml-10">
                {/* <Link to="/bookings">Bookings</Link> */}
                <RenderUser/>
              </li>

              <li className="text-gray-700 hover:text-gray-900 cursor-pointer text-base lg:text-lg pt-10 md:pt-0 md:ml-5 lg:ml-10">
                <Link to="/contact">Contact</Link>
              </li>
              <li className="text-gray-700 hover:text-gray-900 cursor-pointer text-base lg:text-lg pt-10 md:pt-0 md:ml-5 lg:ml-10">
                <Link to="/about">Profile</Link>
              </li>
            </ul>
          </div>
        </div>
        <RenderMenu />

        

      </div>
    </nav>







  </>

  )
};

export default Navbar;
