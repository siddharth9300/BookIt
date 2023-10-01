import React from 'react'
import { useState } from 'react';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

export const CalendarView = () => {
  const [value, setValue] = useState(new Date());

  function onChange(nextValue) {
    setValue(nextValue);
  }
  return (
    <>
    <div className="calendar-container flex justify-center items-center h-screen bg-gray-100">
      <Calendar className="rounded-lg custom-calendar bg-white border border-gray-300 shadow-md w-full" onChange={onChange} value={value} />
    </div>    </>
  )
}
// export default CalendarView;