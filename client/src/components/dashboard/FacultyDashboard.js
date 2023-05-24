import React from 'react'
import Halls from '../halls/Halls'
import Events from '../bookings/Events'

const FacultyDashboard = () => {
  return (
    <>


<div className='mt-6 min-h-screen'>

      <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10">
      Faculty  <span className="text-indigo-700">Dashboard</span> </h1>





      <div className='mt-6 grid grid-flow-col col-auto	'>
        <div >
          <Halls />
        </div>
        <div >
          <Events />
        </div>
      </div>
    </div>
    </>
  )
}

export default FacultyDashboard