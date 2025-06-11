import React, { useState } from "react";
import {
  format,
  addDays,
  startOfWeek,
  isSameDay,
  addWeeks,
  subWeeks,
} from "date-fns";
import MasterLayout from "../../../../masterLayout/MasterLayout";

const CalenderView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState("all");
  const [currentWeek, setCurrentWeek] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [showAppointmentDrawer, setShowAppointmentDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [popupPosition, setPopupPosition] = useState(null);

  // Sample service data - replace with your actual data
  const services = {
    Nails: [{ name: "Nail Cuts", duration: "1h", price: 500 }],
    "Hair & styling": [
      { name: "Hair Color", duration: "1h 15min", price: 57 },
      { name: "Balayage", duration: "2h 30min", price: 150 },
      { name: "Blow Dry", duration: "35min", price: 35 },
      { name: "Haircut", duration: "45min", price: 40 },
    ],
  };

  // Generate week days
  const generateWeekDays = () => {
    return Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));
  };

  const weekDays = generateWeekDays();

  // Generate time slots from 12:00 AM to 11:59 PM
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    return `${hour === 0 ? 12 : hour > 12 ? hour - 12 : hour}:00 ${
      hour >= 12 ? "pm" : "am"
    }`;
  });

  const handleTimeSlotClick = (time, date, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setSelectedTimeSlot({ time, date });
    setShowQuickActions(true);
    setPopupPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    });
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setCurrentWeek(startOfWeek(date, { weekStartsOn: 1 }));
  };

  const handlePrevWeek = () => {
    setCurrentWeek((prev) => subWeeks(prev, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeek((prev) => addWeeks(prev, 1));
  };

  const handleToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setCurrentWeek(startOfWeek(today, { weekStartsOn: 1 }));
  };

  const AppointmentDrawer = () => (
    <div
      className={`tw-fixed tw-inset-y-0 tw-right-0 tw-w-[500px] tw-bg-white tw-shadow-xl tw-transform tw-transition-transform tw-duration-300 tw-ease-in-out ${
        showAppointmentDrawer ? "tw-translate-x-0" : "tw-translate-x-full"
      } tw-z-50`}
    >
      <div className="tw-h-full tw-flex tw-flex-col">
        {/* Header */}
        <div className="tw-p-4 tw-border-b tw-flex tw-justify-between tw-items-center">
          <button
            onClick={() => setShowAppointmentDrawer(false)}
            className="tw-p-2 tw-rounded-full hover:tw-bg-gray-100"
          >
            <svg
              className="tw-w-6 tw-h-6"x
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="tw-flex-1 tw-overflow-y-auto">
          <div className="tw-p-6">
            <h5 className="tw-text-2xl tw-font-semibold tw-mb-6">
              Select a service
            </h5>

            {/* Search */}
            <div className="tw-relative tw-mb-6">
              <div className="tw-absolute tw-inset-y-0 tw-left-3 tw-flex tw-items-center">
                <svg
                  className="tw-w-5 tw-h-5 tw-text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by service name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="tw-w-full tw-pl-10 tw-pr-4 tw-py-2 tw-border tw-rounded-lg focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500"
              />
            </div>

            {/* Service Categories */}
            {Object.entries(services).map(([category, items]) => (
              <div key={category} className="tw-mb-8">
                <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
                  <h6 className="tw-text-lg tw-font-medium">{category}</h6>
                  <span className="tw-bg-gray-100 tw-text-gray-600 tw-px-2 tw-py-1 tw-rounded">
                    {items.length}
                  </span>
                </div>
                <div className="tw-space-y-4">
                  {items.map((service) => (
                    <div
                      key={service.name}
                      className="tw-flex tw-items-center tw-justify-between tw-p-4 tw-border tw-rounded-lg hover:tw-bg-gray-50 tw-cursor-pointer"
                      onClick={() => {
                        // Handle service selection
                        console.log("Selected service:", service);
                      }}
                    >
                      <div>
                        <h7 className="tw-font-medium">{service.name}</h7>
                        <p className="tw-text-sm tw-text-gray-500">
                          {service.duration}
                        </p>
                      </div>
                      <div className="tw-text-right">
                        <p className="tw-font-medium">₹{service.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const QuickActionsPopup = ({ onClose, position }) => (
    <div
      className="tw-fixed tw-bg-white tw-rounded-lg tw-shadow-lg tw-border tw-p-4 tw-z-50 tw-w-64"
      style={{
        top: position?.top || "50%",
        left: position?.left || "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="tw-text-sm tw-text-gray-600 tw-mb-3">
        {format(selectedTimeSlot.date, "EEEE, MMMM d, yyyy")} at{" "}
        {selectedTimeSlot.time}
      </div>
      <div className="tw-space-y-3">
        <button
          className="tw-w-full tw-text-left tw-flex tw-items-center tw-gap-2 tw-text-gray-700 hover:tw-bg-gray-50 tw-p-2 tw-rounded"
          onClick={() => {
            setShowAppointmentDrawer(true);
            setShowQuickActions(false);
          }}
        >
          <svg
            className="tw-w-5 tw-h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add appointment
        </button>
        <button
          className="tw-w-full tw-text-left tw-flex tw-items-center tw-gap-2 tw-text-gray-700 hover:tw-bg-gray-50 tw-p-2 tw-rounded"
          onClick={() => {
            /* Handle group appointment */
            setShowQuickActions(false);
          }}
        >
          <svg
            className="tw-w-5 tw-h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add group appointment
        </button>
        <button
          className="tw-w-full tw-text-left tw-flex tw-items-center tw-gap-2 tw-text-gray-700 hover:tw-bg-gray-50 tw-p-2 tw-rounded"
          onClick={() => {
            /* Handle blocked time */
            setShowQuickActions(false);
          }}
        >
          <svg
            className="tw-w-5 tw-h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Add blocked time
        </button>
        <button
          className="tw-w-full tw-text-left tw-flex tw-items-center tw-gap-2 tw-text-blue-600 hover:tw-bg-gray-50 tw-p-2 tw-rounded"
          onClick={() => {
            /* Handle settings */
            setShowQuickActions(false);
          }}
        >
          Quick actions settings
        </button>
      </div>
    </div>
  );

  return (
    <MasterLayout>
      <div className="tw-h-screen tw-flex tw-flex-col">
        {/* Header */}
        <div className="tw-flex tw-justify-between tw-items-center tw-p-4 tw-border-b">
          <div className="tw-flex tw-items-center tw-gap-4">
            <button
              className="tw-px-3 tw-py-1 tw-rounded-lg tw-bg-gray-100 hover:tw-bg-gray-200"
              onClick={handleToday}
            >
              Today
            </button>
            <div className="tw-flex tw-items-center tw-gap-2">
              <button
                className="tw-p-1 tw-rounded hover:tw-bg-gray-100"
                onClick={handlePrevWeek}
              >
                <svg
                  className="tw-w-5 tw-h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <span className="tw-font-medium">
                {format(weekDays[0], "dd MMM")} -{" "}
                {format(weekDays[6], "dd MMM, yyyy")}
              </span>
              <button
                className="tw-p-1 tw-rounded hover:tw-bg-gray-100"
                onClick={handleNextWeek}
              >
                <svg
                  className="tw-w-5 tw-h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <select
              value={selectedTeamMember}
              onChange={(e) => setSelectedTeamMember(e.target.value)}
              className="tw-border tw-rounded-lg tw-px-3 tw-py-1"
            >
              <option value="all">All team</option>
              <option value="1">Aaditya Paithane</option>
            </select>
          </div>
          <div className="tw-flex tw-items-center tw-gap-3">
            <button className="tw-p-2 tw-rounded-full hover:tw-bg-gray-100">
              <svg
                className="tw-w-5 tw-h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
            <div className="tw-relative">
              <button
                className="tw-bg-black tw-text-white tw-px-4 tw-py-2 tw-rounded-lg hover:tw-bg-gray-800 tw-flex tw-items-center"
                onClick={() => setShowAddDropdown(!showAddDropdown)}
              >
                Add
                <svg
                  className="tw-w-4 tw-h-4 tw-ml-1 tw-inline"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {showAddDropdown && (
                <div className="tw-absolute tw-right-0 tw-mt-2 tw-w-48 tw-bg-white tw-rounded-lg tw-shadow-lg tw-border tw-z-50">
                  <ul className="tw-py-1">
                    <li>
                      <button
                        className="tw-w-full tw-text-left tw-px-4 tw-py-2 hover:tw-bg-gray-100"
                        onClick={() => {
                          setShowAppointmentDrawer(true);
                          setShowAddDropdown(false);
                        }}
                      >
                        Appointment
                      </button>
                    </li>
                    <li>
                      <button
                        className="tw-w-full tw-text-left tw-px-4 tw-py-2 hover:tw-bg-gray-100"
                        onClick={() => {
                          /* Handle Blocked Time */
                          setShowAddDropdown(false);
                        }}
                      >
                        Blocked Time
                      </button>
                    </li>
                    <li>
                      <button
                        className="tw-w-full tw-text-left tw-px-4 tw-py-2 hover:tw-bg-gray-100"
                        onClick={() => {
                          /* Handle Quick Payment */
                          setShowAddDropdown(false);
                        }}
                      >
                        Quick Payment
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="tw-flex tw-flex-1 tw-overflow-hidden">
          {/* Time slots */}
          <div className="tw-w-20 tw-border-r tw-bg-white">
            <div className="tw-h-14 tw-border-b"></div> {/* Header spacer */}
            <div className="tw-overflow-y-scroll tw-h-full">
              {timeSlots.map((time) => (
                <div
                  key={time}
                  className="tw-h-14 tw-px-2 tw-py-1 tw-text-sm tw-text-gray-500"
                >
                  {time}
                </div>
              ))}
            </div>
          </div>

          {/* Days grid */}
          <div className="tw-flex-1 tw-overflow-x-auto">
            <div className="tw-flex tw-min-w-full">
              {weekDays.map((date) => (
                <div key={date} className="tw-flex-1 tw-min-w-[200px]">
                  <div
                    className={`tw-h-14 tw-border-b tw-px-4 tw-py-2 tw-text-center tw-cursor-pointer ${
                      isSameDay(date, selectedDate)
                        ? "tw-bg-blue-600 tw-text-white"
                        : ""
                    }`}
                    onClick={() => handleDateClick(date)}
                  >
                    <div className="tw-text-sm">{format(date, "EEEE")}</div>
                    <div className="tw-font-medium">{format(date, "d")}</div>
                  </div>
                  <div className="tw-relative">
                    {timeSlots.map((time) => (
                      <div
                        key={`${date}-${time}`}
                        onClick={(e) => handleTimeSlotClick(time, date, e)}
                        className="tw-h-14 tw-border-b tw-border-r hover:tw-bg-gray-50 tw-cursor-pointer tw-relative"
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Appointment Drawer */}
        <AppointmentDrawer />

        {showQuickActions && selectedTimeSlot && (
          <>
            <div
              className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-25 tw-z-40"
              onClick={() => setShowQuickActions(false)}
            />
            <QuickActionsPopup
              onClose={() => setShowQuickActions(false)}
              position={popupPosition}
            />
          </>
        )}
      </div>
    </MasterLayout>
  );
};

export default CalenderView;
