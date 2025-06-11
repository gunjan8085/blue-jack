import Header from "@components/users/static/Header";
import { useAuth } from "@hook/useAuth";
import { useRef, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import {
  HiOutlineHome,
  HiOutlineBriefcase,
  HiOutlinePlus,
} from "react-icons/hi";
import avatarDefault from "../../../../public/assets/images/avatar/avatar1.png";

const UserProfile = () => {
  const { user } = useAuth();

  // const user = {
  //   firstName: "Sanket",
  //   lastName: "Patil",
  //   mobile: "+91 94458 74587",
  //   email: "redlie8006@hazhab.com",
  //   dob: "-",
  //   gender: "-",
  // };

  const addresses = [
    {
      type: "Home",
      icon: <HiOutlineHome className="tw-w-6 tw-h-6 tw-text-gray-500" />,
      subtitle: "Add a home address",
    },
    {
      type: "Work",
      icon: <HiOutlineBriefcase className="tw-w-6 tw-h-6 tw-text-gray-500" />,
      subtitle: "Add a work address",
    },
  ];

  return (
    <>
      <Header />

      <div className="tw-bg-gray-50 tw-min-h-screen tw-py-8 tw-px-4">
        <div className="tw-max-w-6xl tw-mx-auto">
          <h4 className="tw-text-3xl tw-font-bold tw-mb-8">Profile</h4>
          <div className="tw-flex tw-gap-8 tw-flex-col md:tw-flex-row">
            {/* Left Card: Profile */}
            <div className="tw-bg-white tw-rounded-2xl tw-shadow-sm tw-p-8 tw-flex-1 tw-max-w-md tw-flex tw-flex-col tw-items-center tw-border tw-border-gray-100">
              <div className="tw-relative tw-mb-4">
                <div className="relative">
                  <img
                    src={user.profilePicUrl || avatarDefault} // added a default image
                    alt="User Avatar"
                    className="tw-w-28 tw-h-28 tw-rounded-full tw-object-cover tw-object-center" // updated classes for better image handling
                  />
                  <button
                    className="tw-absolute tw-bottom-2 tw-right-2 tw-bg-white tw-rounded-full tw-p-1 tw-shadow"
                    onClick={() =>
                      document.getElementById("userImageInput").click()
                    }
                  >
                    <FiEdit2 className="tw-text-purple-500" />
                  </button>
                  <input
                    type="file"
                    id="userImageInput"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        localStorage.setItem("userImage", e.target.result);
                        document.querySelector("img").src = e.target.result;
                      };
                      reader.readAsDataURL(e.target.files[0]);
                    }}
                  />
                </div>
              </div>
              <div className="tw-text-2xl tw-font-bold tw-mb-2 tw-mt-2">
                {user.firstName} {user.lastName}
              </div>
              <div className="tw-w-full tw-border-t tw-my-4"></div>
              <div className="tw-w-full tw-space-y-4">
                <div>
                  <div className="tw-text-sm tw-font-semibold">First name</div>
                  <div className="tw-text-gray-700 tw-text-sm">
                    {user.firstName}
                  </div>
                </div>
                <div>
                  <div className="tw-text-sm tw-font-semibold">Last name</div>
                  <div className="tw-text-gray-700 tw-text-sm">
                    {user.lastName}
                  </div>
                </div>
                <div>
                  <div className="tw-text-sm tw-font-semibold">
                    Mobile number
                  </div>
                  <div className="tw-text-gray-700 tw-text-sm">
                    {user.phoneNumber}
                  </div>
                </div>
                <div>
                  <div className="tw-text-sm tw-font-semibold">Email</div>
                  <div className="tw-text-gray-700 tw-text-sm">
                    {user.email}
                  </div>
                </div>
                <div>
                  <div className="tw-text-sm tw-font-semibold">
                    Date of birth
                  </div>
                  <div className="tw-text-gray-700 tw-text-sm">{user.dob}</div>
                </div>
                <div>
                  <div className="tw-text-sm tw-font-semibold">Gender</div>
                  <div className="tw-text-gray-700 tw-text-sm">
                    {user.gender}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: Addresses */}
            <div className="tw-bg-white tw-rounded-2xl tw-shadow-sm tw-p-8 tw-flex-1 tw-border tw-border-gray-100">
              <div className="tw-text-xl tw-font-bold tw-mb-6">
                My addresses
              </div>
              <div className="tw-space-y-4 tw-mb-6">
                {addresses.map((addr) => (
                  <div
                    key={addr.type}
                    className="tw-flex tw-items-center tw-gap-4 tw-p-4 tw-border tw-border-gray-200 tw-rounded-xl tw-bg-gray-50"
                  >
                    <div>{addr.icon}</div>
                    <div>
                      <div className="tw-font-semibold tw-text-base tw-mb-1">
                        {addr.type}
                      </div>
                      <div className="tw-text-gray-500 tw-text-sm">
                        {addr.subtitle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="tw-flex tw-items-center tw-gap-2 tw-border tw-border-gray-300 tw-rounded-full tw-px-4 tw-py-2 tw-text-sm tw-font-medium hover:tw-bg-gray-100">
                <HiOutlinePlus className="tw-w-5 tw-h-5" /> Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
