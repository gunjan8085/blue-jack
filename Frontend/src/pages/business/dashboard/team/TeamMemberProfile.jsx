import React, { useState } from 'react';
import TeamMemberLayout from '@components/business/dashboard/team/TeamMemberLayout';
import { useLocation } from 'react-router-dom';

const TeamMemberProfile = () => {
  const location = useLocation();
  const currentTab = location.pathname.split('/').pop();
  const [selectedTab, setSelectedTab] = useState(currentTab || 'profile');
  const [profileImage, setProfileImage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [additionalPhoneNumber, setAdditionalPhoneNumber] = useState('');
  const [country, setCountry] = useState('');

  return (
    <TeamMemberLayout
      selectedTab={selectedTab}
      onTabSelect={setSelectedTab}
    >
      <div className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-6 tw-max-w-4xl">
        <div className="tw-mb-6">
          <h6 className="tw-text-xl tw-font-semibold tw-mb-1">Profile</h6>
          <p className="tw-text-gray-500">Manage your team members personal profile</p>
        </div>

        <div className="tw-mb-8">
          <div className="tw-w-24 tw-h-24 tw-bg-gray-100 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mb-4">
            {profileImage ? (
              <img 
                src={URL.createObjectURL(profileImage)} 
                alt="Profile" 
                className="tw-w-full tw-h-full tw-object-cover tw-rounded-full"
              />
            ) : (
              <svg className="tw-w-12 tw-h-12 tw-text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
          </div>
          <button 
            type="button" 
            className="tw-text-blue-600 tw-flex tw-items-center tw-cursor-pointer hover:tw-underline"
            onClick={() => {
              const fileInput = document.createElement('input');
              fileInput.type = 'file';
              fileInput.accept = 'image/*';
              fileInput.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                  setProfileImage(file);
                }
              };
              fileInput.click();
            }}
          >
            <svg className="tw-w-4 tw-h-4 tw-mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Upload photo
          </button>
        </div>

        <form className="tw-grid tw-grid-cols-2 tw-gap-6">
          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
              First name <span className="tw-text-red-500">*</span>
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
              required
            />
          </div>

          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
              Last name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
            />
          </div>

          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
              Email <span className="tw-text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
              required
            />
          </div>

          <div className="tw-flex tw-gap-4">
            <div className="tw-w-24">
              <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
                Code
              </label>
              <select className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500">
                <option>+91</option>
              </select>
            </div>
            <div className="tw-flex-1">
              <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
                Phone number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
              Additional phone number
            </label>
            <input
              type="tel"
              value={additionalPhoneNumber}
              onChange={(e) => setAdditionalPhoneNumber(e.target.value)}
              className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
            />
          </div>

          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
              Country
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
            />
          </div>
        </form>
      </div>
    </TeamMemberLayout>
  );
};

export default TeamMemberProfile;