import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <>
    <footer class="text-gray-600 body-font mt-5">
  <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
    <Link to={"/"} class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
    <div aria-label="Home. logo" className="flex justify-between items-center" role="img">
          {/* <h1>asd</h1> */}
          <img className="w-12 md:w-auto" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/centre_aligned_simple-Svg1.svg" alt="logo" />
          
     
            <h1 className="text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-3xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10">
              Book  <span className="text-indigo-700">It</span> </h1>
         </div>
         
    </Link>
    <p class="text-sm text-gray-500 hover:text-gray-700 focus:text-gray-700 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2023 Book It —
      <a href="https://github.com/siddharth9300" class="text-gray-500 hover:text-gray-700 focus:text-gray-7000 ml-1" rel="noopener noreferrer" target="_blank">@siddharth9300</a>
    </p>
    <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
      {/* <Link class="text-gray-500">
        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
        </svg>
      </Link> */}
      <a href="https://twitter.com/sidd9300" rel="noopener noreferrer" target="_blank" class="ml-3 text-gray-500">
        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
        </svg>
      </a>
      {/* <Link class="ml-3 text-gray-500">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
        </svg>
      </Link> */}
      <a href="https://www.linkedin.com/in/siddharth9300" rel="noopener noreferrer" target="_blank"  class="ml-3 text-gray-500">
        <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" class="w-5 h-5" viewBox="0 0 24 24">
          <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
          <circle cx="4" cy="4" r="2" stroke="none"></circle>
        </svg>
      </a>
    </span>
  </div>
</footer>
    </>
  )
}

export default Footer