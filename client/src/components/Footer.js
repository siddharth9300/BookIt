import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
const Footer = () => {
  return (
    <>
    <footer className="text-gray-600 body-font mt-5 ">
  <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col ">
    <Link to={"/"} className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
    <div aria-label="Home. logo" className="flex justify-between items-center" role="img">
          {/* <h1>asd</h1> */}
          {/* <img className="w-12 md:w-auto" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/centre_aligned_simple-Svg1.svg" alt="logo" /> */}
          <img className="w-24 md:w-64" src={logo} alt="logo" />
          
          
            {/* <h1 className="text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-3xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10">
              Book  <span className="text-indigo-700">It</span> </h1> */}
         </div>
         
    </Link>
     {/* <p className="text-sm text-gray-500 hover:text-gray-700 focus:text-gray-700 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2023 Book It — Made with &#10084;&#65039; by
       <a href="https://github.com/siddharth9300" className="text-gray-500 hover:text-gray-700 focus:text-gray-7000 ml-1" rel="noopener noreferrer" target="_blank">@siddharth9300</a>
     </p> */}

  <p className="text-sm text-gray-500 hover:text-gray-700 focus:text-gray-700 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4"> Developed By Students Of FCA Department
       {/* <a href="https://github.com/siddharth9300" className="text-gray-500 hover:text-gray-700 focus:text-gray-7000 ml-1" rel="noopener noreferrer" target="_blank">@siddharth9300</a> */}
    </p>
     {/* <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">

       <a href="https://github.com/siddharth9300" rel="noopener noreferrer" target="_blank" className="ml-3 text-gray-500">
       <svg fill="currentColor" className="w-5 h-5" strokeLinecap="round" strokeLinejoin="round" stroke-width="2"  viewBox="0 0 640 640">
         <path d="M319.988 7.973C143.293 7.973 0 151.242 0 327.96c0 141.392 91.678 261.298 218.826 303.63 16.004 2.964 21.886-6.957 21.886-15.414 0-7.63-.319-32.835-.449-59.552-89.032 19.359-107.8-37.772-107.8-37.772-14.552-36.993-35.529-46.831-35.529-46.831-29.032-19.879 2.209-19.442 2.209-19.442 32.126 2.245 49.04 32.954 49.04 32.954 28.56 48.922 74.883 34.76 93.131 26.598 2.882-20.681 11.15-34.807 20.315-42.803-71.08-8.067-145.797-35.516-145.797-158.14 0-34.926 12.52-63.485 32.965-85.88-3.33-8.078-14.291-40.606 3.083-84.674 0 0 26.87-8.61 88.029 32.8 25.512-7.075 52.878-10.642 80.056-10.76 27.2.118 54.614 3.673 80.162 10.76 61.076-41.386 87.922-32.8 87.922-32.8 17.398 44.08 6.485 76.631 3.154 84.675 20.516 22.394 32.93 50.953 32.93 85.879 0 122.907-74.883 149.93-146.117 157.856 11.481 9.921 21.733 29.398 21.733 59.233 0 42.792-.366 77.28-.366 87.804 0 8.516 5.764 18.473 21.992 15.354 127.076-42.354 218.637-162.274 218.637-303.582 0-176.695-143.269-319.988-320-319.988l-.023.107z"/></svg>

       </a>
       <a href="https://twitter.com/sidd9300" rel="noopener noreferrer" target="_blank" className="ml-3 text-gray-500">
         <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
           <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
         </svg>
       </a>

       <a href="https://www.linkedin.com/in/siddharth9300" rel="noopener noreferrer" target="_blank"  className="ml-3 text-gray-500">
         <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="0" className="w-5 h-5" viewBox="0 0 24 24">
           <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
           <circle cx="4" cy="4" r="2" stroke="none"></circle>
         </svg>
       </a>
     </span> */}
  </div>
</footer>
    </>
  )
}

export default Footer
