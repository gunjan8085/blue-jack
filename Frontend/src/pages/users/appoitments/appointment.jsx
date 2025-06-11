import Header from "@components/users/static/Header";
import React from "react";
import {
  HiOutlineInformationCircle,
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineCog,
  HiOutlineOfficeBuilding,
} from "react-icons/hi";

const appointment = {
  id: 1,
  salonName: "Bizarre The Salon",
  time: "Today at 4:30 pm",
  duration: "15 minutes duration",
  status: "Confirmed",
  image:
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  address:
    "Gulmohar Orchids, 3rd floor, Sahaney Sujan Park lane 2, Lullanagar, Flat no 25, 3rd floor , Pune, Pune, Maharashtra",
  service: {
    name: "Haircut",
    price: 250,
    details: "15 mins Clean up (Sidelocks & Neck)",
  },
  bookingRef: "97F873DA",
};

const UserAppointment = () => {
  return (
    <>
    <Header/>
    <div className="tw-bg-gray-50 tw-min-h-screen tw-py-8 tw-px-4">
      <div className="tw-max-w-6xl tw-mx-auto">
        <h4 className="tw-text-2xl tw-font-bold tw-mb-6">Appointments</h4>
        <div className="tw-flex tw-gap-8 tw-flex-col md:tw-flex-row">
          {/* Left: Upcoming List */}
          <div className="tw-w-full md:tw-w-1/3 tw-mb-8 md:tw-mb-0">
            <div className="tw-font-semibold tw-mb-2 tw-flex tw-items-center tw-gap-1">
              Upcoming
              <HiOutlineInformationCircle className="tw-w-4 tw-h-4 tw-text-gray-400" />
            </div>
            <div className="tw-space-y-4">
              <div className="tw-flex tw-items-center tw-bg-white tw-border tw-border-purple-300 tw-rounded-xl tw-shadow-sm tw-p-2 tw-cursor-pointer hover:tw-shadow-md">
                <img
                  src={appointment.image}
                  alt="salon"
                  className="tw-w-20 tw-h-20 tw-object-cover tw-rounded-lg tw-mr-3"
                />
                <div className="tw-flex-1">
                  <div className="tw-font-semibold tw-text-base tw-mb-1">
                    {appointment.salonName}
                  </div>
                  <div className="tw-text-sm tw-text-gray-600 tw-mb-1">
                    {appointment.time}
                  </div>
                  <div className="tw-text-xs tw-text-gray-400">
                    ₹{appointment.service.price} • 1 item
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Appointment Details */}
          <div className="tw-bg-white tw-rounded-2xl tw-shadow-sm tw-flex-1 tw-overflow-hidden tw-border tw-border-gray-100 tw-flex tw-flex-col">
            {/* Banner */}
            <div className="tw-relative">
              <img
                src={appointment.image}
                alt="salon banner"
                className="tw-w-full tw-h-48 tw-object-cover"
              />
              <div className="tw-absolute tw-bottom-4 tw-left-6 tw-text-3xl tw-font-bold tw-text-white tw-drop-shadow-lg">
                {appointment.salonName}
              </div>
            </div>
            {/* Details */}
            <div className="tw-p-8 tw-pt-6 tw-flex-1 tw-flex tw-flex-col">
              <div className="tw-flex tw-items-center tw-gap-3 tw-mb-4">
                <span className="tw-bg-purple-100 tw-text-purple-700 tw-px-3 tw-py-1 tw-rounded-full tw-text-xs tw-font-semibold">
                  <span className="tw-inline-block tw-w-2 tw-h-2 tw-bg-purple-500 tw-rounded-full tw-mr-2 align-middle"></span>
                  {appointment.status}
                </span>
              </div>
              <div className="tw-text-2xl tw-font-bold tw-mb-1">
                {appointment.time}
              </div>
              <div className="tw-text-sm tw-text-gray-500 tw-mb-6">
                {appointment.duration}
              </div>
              {/* Actions */}
              <div className="tw-space-y-4 tw-mb-8">
                <div className="tw-flex tw-items-start tw-gap-4">
                  <div className="tw-bg-purple-50 tw-p-2 tw-rounded-full">
                    <HiOutlineCalendar className="tw-w-5 tw-h-5 tw-text-purple-500" />
                  </div>
                  <div>
                    <div className="tw-font-medium">Add to calendar</div>
                    <div className="tw-text-sm tw-text-gray-500">
                      Set yourself a reminder
                    </div>
                  </div>
                </div>
                <div className="tw-flex tw-items-start tw-gap-4">
                  <div className="tw-bg-purple-50 tw-p-2 tw-rounded-full">
                    <HiOutlineLocationMarker className="tw-w-5 tw-h-5 tw-text-purple-500" />
                  </div>
                  <div>
                    <div className="tw-font-medium">Getting there</div>
                    <div className="tw-text-sm tw-text-gray-500">
                      {appointment.address}
                    </div>
                  </div>
                </div>
                <div className="tw-flex tw-items-start tw-gap-4">
                  <div className="tw-bg-purple-50 tw-p-2 tw-rounded-full">
                    <HiOutlineCog className="tw-w-5 tw-h-5 tw-text-purple-500" />
                  </div>
                  <div>
                    <div className="tw-font-medium">Manage appointment</div>
                    <div className="tw-text-sm tw-text-gray-500">
                      Reschedule or cancel your appointment
                    </div>
                  </div>
                </div>
                <div className="tw-flex tw-items-start tw-gap-4">
                  <div className="tw-bg-purple-50 tw-p-2 tw-rounded-full">
                    <HiOutlineOfficeBuilding className="tw-w-5 tw-h-5 tw-text-purple-500" />
                  </div>
                  <div>
                    <div className="tw-font-medium">Venue details</div>
                    <div className="tw-text-sm tw-text-gray-500">
                      {appointment.salonName}
                    </div>
                  </div>
                </div>
              </div>
              {/* Overview */}
              <div className="tw-mb-6">
                <div className="tw-font-bold tw-mb-2">Overview</div>
                <div className="tw-flex tw-justify-between tw-items-center tw-mb-1">
                  <div>
                    {appointment.service.name}
                    <div className="tw-text-xs tw-text-purple-700 tw-mt-1">
                      {appointment.service.details}
                    </div>
                  </div>
                  <div className="tw-font-semibold">
                    ₹{appointment.service.price}
                  </div>
                </div>
                <div className="tw-flex tw-justify-between tw-font-bold tw-mt-4">
                  <span>Total</span>
                  <span>₹{appointment.service.price}</span>
                </div>
              </div>
              {/* Cancellation Policy */}
              <div className="tw-mb-2">
                <div className="tw-font-bold tw-mb-1">Cancellation policy</div>
                <div className="tw-text-sm tw-text-red-600 tw-font-semibold">
                  Please avoid canceling within 24 hours of your appointment
                  time
                </div>
              </div>
              <div className="tw-text-xs tw-text-gray-400 tw-mt-4">
                Booking ref: {appointment.bookingRef}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserAppointment;
