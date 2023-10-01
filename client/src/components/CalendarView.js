import React, { useEffect, useState } from "react";
import {
  MdChevronLeft,
  MdChevronRight,
  MdLocationPin,
  MdToday,
  MdSchedule,
  MdGroup,
  MdDateRange,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
// import { FaChevronLeft ,FaChevronRight } from "react-icons/fa";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
  isWithinInterval,
} from "date-fns";
import { Fragment } from "react";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const CalendarView = () => {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  // State for the events fetched from the API
  const [events, setEvents] = useState([]);

  // Fetch events data from the API when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/events`,
          {
            // withCredentials: true, // include credentials in the request
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        setEvents(response.data.bookings);
        // console.log(response.data.bookings);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  let selectedDayMeetings = Array.isArray(events)
    ? events.filter((booking) => {
        const eventStartDate = parseISO(booking.eventStartDate);
        const eventEndDate = parseISO(booking.eventEndDate);
        const eventDate = parseISO(booking.eventDate);
        const eventDateType = booking.eventDateType;

        if (eventDateType === "full" || eventDateType === "half") {
          return isSameDay(eventDate, selectedDay);
        } else if (eventDateType === "multiple") {
          return (
            isWithinInterval(selectedDay, {
              start: eventStartDate,
              end: eventEndDate,
            }) || isSameDay(eventStartDate, selectedDay)
          );
        }

        return null;
      })
    : [];

  return (
    <div className="my-12">
<div className="w-auto flex mb-10 items-center justify-center">
  
            <div className="flex items-center m-6">
              <div className="w-2 h-2 mr-2 bg-blue-600 rounded-full"></div>
              <p className="text-sm text-gray-700">Full Day Event</p>
            </div>
            <div className="flex items-center m-6">
              <div className="w-2 h-2 mr-2 bg-green-600 rounded-full"></div>
              <p className="text-sm text-gray-700">Half Day Event</p>
            </div>
            <div className="flex items-center m-6">
              <div className="w-2 h-2 mr-2 bg-red-600 rounded-full"></div>
              <p className="text-sm text-gray-700">Multiple Day Event</p>
            </div>

</div>

      <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6 ">
        <div className="md:grid md:grid-cols-2 md:divide-x  md:divide-gray-300">



          <div className="md:pr-14 ">


            <div className="flex items-center ">
              <h2 className="flex-auto font-semibold text-gray-900">
                {format(firstDayCurrentMonth, "MMMM yyyy")}
              </h2>
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Previous month</span>
                <MdChevronLeft className="w-7 h-7" aria-hidden="true" />
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Next month</span>
                <MdChevronRight className="w-7 h-7" aria-hidden="true" />
              </button>
            </div>
            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    "py-1.5"
                  )}>
                  <button
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={classNames(
                      isEqual(day, selectedDay) && "text-white",
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "text-red-500",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-900",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-400",
                      isEqual(day, selectedDay) && isToday(day) && "bg-red-500",
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-gray-900",
                      !isEqual(day, selectedDay) && "hover:bg-gray-200",
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        "font-semibold",
                      "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                    )}>
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d")}
                    </time>
                  </button>
                  <div className=" h-1 w-auto mx-auto mt-1">
                    <div className="flex mx-auto items-center">
                      {Array.isArray(events) &&
                        events.map((booking) => {
                          const eventStartDate = parseISO(
                            booking.eventStartDate
                          );
                          const eventEndDate = parseISO(booking.eventEndDate);
                          const eventDate = parseISO(booking.eventDate);
                          const eventDateType = booking.eventDateType;

                          if (
                            eventDateType === "full" &&
                            isSameDay(eventDate, day)
                          ) {
                            return (
                              <div
                                key={booking.id}
                                className="w-2 mx-auto flex items-center h-2 mt-.5 rounded-full bg-blue-600"></div>
                            );
                          } else if (
                            eventDateType === "half" &&
                            isSameDay(eventDate, day)
                          ) {
                            return (
                              <div
                                key={booking.id}
                                className="w-2 mx-auto flex items-center h-2 mt-.5 rounded-full bg-green-600"></div>
                            );
                          } else if (
                            eventDateType === "multiple" &&
                            (isWithinInterval(day, {
                              start: eventStartDate,
                              end: eventEndDate,
                            }) ||
                              isSameDay(eventStartDate, day))
                          ) {
                            return (
                              <div
                                key={booking.id}
                                className="w-2 mx-auto flex items-center h-2 mt-.5 rounded-full bg-red-600"></div>
                            );
                          }

                          return null;
                        })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <section className="mt-12 md:mt-0 md:pl-14">
            <h2 className="font-semibold text-gray-900">
              Schedule for{" "}
              <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                {format(selectedDay, "MMM dd, yyy")}
              </time>
            </h2>
            <ol className="my-4 space-y-1 text-sm leading-6 text-gray-500">
              {selectedDayMeetings.length > 0 ? (
                selectedDayMeetings.map((events) => (
                  <Meeting events={events} key={events.id} />
                ))
              ) : (
                <p>No events for today.</p>
              )}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
};

function Meeting({ events }) {
  const navigate = useNavigate();

  const handleViewClick = (bookingId) => {
    navigate(`/bookingsView/${bookingId}`);
  };

  return (
    <>
      <li className="flex bg-white shadow-xl  rounded-lg mx-4 md:mx-auto mb-5 max-w-md  md:max-w-2xl ">
        <div class="flex items-start px-4 py-6">
          <div class="">
            <div class="flex items-center">
              <h2 class="text-2xl font-semibold text-gray-900 -mt-1">
                {events.eventName}{" "}
              </h2>
            </div>
            <div class="flex items-center  my-3">
              <MdLocationPin className=" text-gray-700 mr-2" />
              <small class="text-sm  text-gray-700">
                {events.bookedHallName} {events.bookedHall.location}
              </small>
            </div>

            <div class="flex items-center mb-3">
              <MdDateRange className=" text-gray-700 mr-2" />
              <small class="text-sm text-gray-700 capitalize">
                {events.eventDateType} Day Event
              </small>
            </div>

            {(events.eventDateType === "full" ||
              events.eventDateType === "half") && (
              <>
                <div className="flex items-center ">
                  <MdToday className="text-gray-900" />
                  <p class="text-gray-700 ml-2">
                    {format(new Date(events.eventDate), "EEEE dd-MM-yyyy")}
                  </p>
                </div>
              </>
            )}

            {events.eventDateType === "multiple" && (
              <>
                <div className="flex items-center ">
                  <p className=" font-bold mr-2 text-gray-600">From</p>

                  <MdToday className="text-gray-900" />
                  <p class="text-gray-700 ml-2">
                    {format(new Date(events.eventStartDate), "EEEE dd-MM-yyyy")}
                  </p>
                </div>

                <div className="flex items-center ">
                  <p className=" font-bold mr-2 text-gray-600">To</p>

                  <MdToday className="text-gray-900" />
                  <p class="text-gray-700 ml-2">
                    {format(new Date(events.eventEndDate), "EEEE dd-MM-yyyy")}
                  </p>
                </div>
              </>
            )}

            {events.eventDateType === "half" && (
              <>
                <div className="my-3">
                  <div className="flex items-center ">
                    <p className="text-m font-bold mr-2 text-gray-600">From</p>

                    <MdSchedule className="text-gray-900" />
                    <p class="text-gray-700 ml-2">
                      {format(
                        parseISO(events.startTime.slice(0, -1)),
                        "hh:mm aa"
                      )}
                    </p>
                  </div>

                  <div className="flex items-center ">
                    <p className="ext-m font-bold mr-2 text-gray-600">To</p>

                    <MdSchedule className="text-gray-900" />
                    <p class="text-gray-700 ml-2 ">
                      {format(
                        parseISO(events.endTime.slice(0, -1)),
                        "hh:mm aa"
                      )}
                    </p>
                  </div>
                </div>
              </>
            )}

            <div class="mt-3 flex items-center">
              <MdGroup className=" mr-2 text-gray-700" />
              <p class="text-gray-700 text-sm">{events.organizingClub}</p>
            </div>

            <div class="mt-4 flex items-center">
              <button
                onClick={() => handleViewClick(events._id)}
                class="px-4 py-2 bg-gray-800 text-white text-sm font-semibold rounded hover:bg-gray-900 focus:bg-gray-900 focus:outline-none">
                View Details
              </button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
