import React, { useState } from "react";
import { motion } from "framer-motion";


const TeamMemberRow = ({ member }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  React.useEffect(() => {
    const handleClickOutside = () => setIsDropdownOpen(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <tr className="tw-border-b hover:tw-bg-gray-50">
      <td className="tw-px-6 tw-py-4"></td>
      <td className="tw-px-6 tw-py-4 tw-flex tw-items-center tw-gap-4">
        <div className="tw-w-12 tw-h-12 tw-rounded-full tw-bg-blue-700 tw-flex tw-items-center tw-justify-center tw-text-white tw-font-bold tw-text-xl">
          {member.name[0]}
        </div>
        <span className="tw-font-semibold">{member.name}</span>
      </td>
      <td className="tw-px-6 tw-py-4">
        <a href={`mailto:${member.email}`} className="tw-text-purple-600 hover:tw-underline">{member.email}</a>
        <br />
        <span className="tw-text-purple-600">{member.phone}</span>
      </td>
      <td className="tw-px-6 tw-py-4 tw-text-gray-500">
        <span className="tw-text-green-600 tw-font-semibold">{member.rating} / 5</span>
      </td>
      <td className="tw-px-6 tw-py-4 tw-relative">
        <div className="tw-relative">
          <motion.button 
            className="tw-bg-white tw-border tw-border-gray-700 tw-rounded-lg tw-px-4 tw-py-2 tw-font-medium tw-flex tw-items-center tw-justify-between" 
            type="button" 
            onClick={toggleDropdown}
          >
            Actions
            <svg xmlns="http://www.w3.org/2000/svg" className="tw-w-4 tw-h-4 tw-ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>
          {isDropdownOpen && (
            <ul className="tw-fixed tw-z-50 tw-bg-white tw-border tw-border-gray-200 tw-rounded-lg tw-shadow-lg tw-py-2 tw-min-w-[200px]">
              <li>
                <button className="tw-w-full tw-text-left tw-px-4 tw-py-2 hover:tw-bg-gray-100">
                  Edit
                </button>
              </li>
              <li>
                <button className="tw-w-full tw-text-left tw-px-4 tw-py-2 hover:tw-bg-gray-100">
                  View Calendar
                </button>
              </li>
              <li>
                <button className="tw-w-full tw-text-left tw-px-4 tw-py-2 hover:tw-bg-gray-100">
                  View Scheduled Shifts
                </button>
              </li>
              <li>
                <button className="tw-w-full tw-text-left tw-px-4 tw-py-2 hover:tw-bg-gray-100">
                  Add Time Off
                </button>
              </li>
            </ul>
          )}
        </div>
      </td>
    </tr>
  );
};

export default TeamMemberRow;