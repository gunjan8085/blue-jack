import React, { useEffect, useRef, useState } from "react";
import {
  FaCut, // Hair & Styling
  FaEye, // Eyebrows & Eyelashes
  FaHandsHelping, // Massage
  FaPalette, // Makeup
} from "react-icons/fa";
import { GiBarbedNails } from "react-icons/gi";
import { TbRazorElectric } from "react-icons/tb";
import { FiCalendar, FiClock } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useClickOutside } from "@hook/useClickOutside";
const Searchbar = () => {
  const navigate = useNavigate();
  const [coords, setCoords] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const location = useLocation();
  const [showTreatmentsDropdown, setShowTreatmentsDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const treatmentsRef = useRef(null);
  const dateRef = useRef(null);
  const timeRef = useRef(null);
  // Use the hook for dropdowns
  useClickOutside(treatmentsRef, () => setShowTreatmentsDropdown(false));
  useClickOutside(dateRef, () => setShowDateDropdown(false));
  useClickOutside(timeRef, () => setShowTimeDropdown(false));
  // Function to get location coordinates
  const getLocationCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          console.log(position.coords);
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };
  const treatments = [
    {
      name: "Hair & Styling",
      icon: <FaCut />,
    },
    {
      name: "Nails",
      icon: <GiBarbedNails />,
    },
    {
      name: "Eyebrows & Eyelashes",
      icon: <FaEye />,
    },
    {
      name: "Massage",
      icon: <FaHandsHelping />,
    },
    {
      name: "Hair Removal",
      icon: <TbRazorElectric />,
    },
    {
      name: "Makeup",
      icon: <FaPalette />,
    },
  ];
  useEffect(() => {
    if (
      location?.pathname?.includes("/search") ||
      location?.pathname?.includes("/business")
    ) {
      setShowSearchBar(true);
    }
  }, [location]);
  return (
    <div
      className={`tw-w-full tw-bg-white tw-rounded-full tw-mx-auto tw-shadow-lg tw-flex tw-items-center  tw-justify-center tw-px-2 tw-py-2 tw-gap-4 ${
        showSearchBar ? "tw-max-w-3xl" : "tw-max-w-5xl tw-py-5 tw-px-4"
      }`}
    >
      {/* Treatments Dropdown */}
      <div className="tw-relative tw-w-1/4">
        <button
          onClick={() => setShowTreatmentsDropdown(!showTreatmentsDropdown)}
          className={`tw-w-full tw-text-left tw-py-2 tw-text-center tw-rounded-full tw-bg-gray-100  ${
            showSearchBar ? "text-sm" : ""
          }
      `}
        >
          All treatments
        </button>
        {showTreatmentsDropdown && (
          <div
            className="tw-absolute tw-bg-white tw-shadow-md tw-rounded-lg tw-w-full tw-py-2 tw-z-50"
            ref={treatmentsRef}
          >
            <ul className="tw-space-y-2">
              {treatments.map((treatment) => (
                <li
                  key={treatment.name}
                  className="tw-flex tw-items-center tw-gap-3 tw-px-4 tw-py-2 hover:tw-bg-gray-100 tw-cursor-pointer tw-text-gray-700"
                >
                  <span className="tw-text-lg">{treatment.icon}</span>
                  <span>{treatment.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* Location */}
      <button
        onClick={getLocationCoordinates}
        className={`tw-w-1/5 tw-text-left tw-text-center tw-py-2 tw-rounded-full tw-bg-gray-100 ${
          showSearchBar ? "text-sm" : ""
        }
      `}
      >
        Current location
      </button>

      {/* Date Dropdown */}
      <div className="tw-relative tw-w-1/5">
        <button
          onClick={() => setShowDateDropdown(!showDateDropdown)}
          className={`tw-w-full tw-flex tw-items-center tw-gap-2 tw-justify-center tw-py-2 tw-text-center tw-rounded-full tw-bg-gray-100 ${
            showSearchBar ? "text-sm" : ""
          }`}
        >
          <FiCalendar />
          Any date
        </button>
        {showDateDropdown && (
          <div
            className="tw-absolute tw-bg-white tw-shadow-xl tw-rounded-xl tw-w-[350px] tw-p-4 tw-z-50"
            ref={dateRef}
          >
            <div className="tw-grid tw-grid-cols-3 tw-gap-2 tw-mb-4">
              <button className="tw-p-2 tw-rounded-lg hover:tw-bg-gray-100 tw-border">
                Today
              </button>
              <button className="tw-p-2 tw-rounded-lg hover:tw-bg-gray-100 tw-border">
                Tomorrow
              </button>
              <button className="tw-p-2 tw-rounded-lg hover:tw-bg-gray-100 tw-border">
                This Week
              </button>
            </div>
            <div className="datepicker-wrapper">
              <DatePicker
                onChange={(date) => console.log(date)}
                inline
                className="
          !tw-shadow-lg !tw-rounded-lg
          [&_.react-datepicker]:tw-border !tw-border-gray-300 !tw-bg-white
          [&_.react-datepicker__header]:tw-bg-blue-50 tw-rounded-t-lg
          [&_.react-datepicker__current-month]:tw-text-2xl !tw-font-semibold !tw-text-blue-600
          [&_.react-datepicker__day]:tw-w-10 tw-h-10 tw-flex tw-justify-center tw-items-center
          [&_.react-datepicker__day:hover]:tw-bg-blue-100 tw-rounded-full
          [&_.react-datepicker__day--selected]:!tw-bg-blue-500 !tw-text-white tw-font-medium
          [&_.react-datepicker__day--keyboard-selected]:tw-bg-blue-600
          [&_.react-datepicker__day--today]:tw-border !tw-border-blue-300
        "
              />
            </div>
          </div>
        )}
      </div>
      {/* Time Dropdown */}
      <div className="tw-relative tw-w-1/5">
        <button
          onClick={() => setShowTimeDropdown(!showTimeDropdown)}
          className={`tw-w-full tw-flex tw-items-center tw-gap-2 tw-justify-center tw-py-2 tw-text-center tw-rounded-full tw-bg-gray-100 ${
            showSearchBar ? "text-sm" : ""
          }`}
        >
          <FiClock />
          Anytime
        </button>
        {showTimeDropdown && (
          <div
            className="tw-absolute tw-bg-white tw-shadow-xl tw-rounded-xl tw-w-[300px] tw-p-4 tw-z-50"
            ref={timeRef}
          >
            <div className="tw-grid tw-grid-cols-3 tw-gap-2 tw-mb-4">
              <button className="tw-p-2 tw-rounded-lg hover:tw-bg-gray-100 tw-border">
                Morning
              </button>
              <button className="tw-p-2 tw-rounded-lg hover:tw-bg-gray-100 tw-border">
                Afternoon
              </button>
              <button className="tw-p-2 tw-rounded-lg hover:tw-bg-gray-100 tw-border">
                Evening
              </button>
            </div>
            <div className="tw-flex tw-items-center tw-gap-4">
              <select className="tw-border tw-rounded-lg tw-p-2 tw-w-full">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>

              <select className="tw-border tw-rounded-lg tw-p-2 tw-w-full">
                {["00", "15", "30", "45"].map((minute) => (
                  <option key={minute} value={minute}>
                    {minute}
                  </option>
                ))}
              </select>
              <select className="tw-border tw-rounded-lg tw-p-2 tw-w-full">
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        )}
      </div>
      {/* Search Button */}
      <button
        className="tw-bg-black tw-text-white tw-rounded-full tw-px-8 tw-py-2"
        onClick={() => navigate("/search")}
      >
        Search
      </button>
    </div>
  );
};

export default Searchbar;
