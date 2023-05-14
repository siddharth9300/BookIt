import React from 'react'
import BookingsAdmin from '../bookings/BookingsAdmin'
// import BookingsHod from '../bookings/BookingsHod'

import Events from '../bookings/Events'

const AdminDashboard = () => {
  return (
    <><div className='mt-6 min-h-screen'>

      <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10">
        Admin  <span className="text-indigo-700">Dashboard</span> </h1>





      <div className='mt-6 grid grid-flow-col col-auto	'>
        <div className=''>
          <BookingsAdmin/>
          {/* <BookingsHod /> */}
        </div>
        <div className=''>
          <Events />
        </div>
      </div>
    </div>
    </>
  )
}

export default AdminDashboard;