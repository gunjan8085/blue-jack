import React from "react";
import PageHeader from "@components/business/dashboard/PageHeader";
import TeamMembersTable from "@components/business/dashboard/TeamMembersTable";
import MasterLayout from "../../../masterLayout/MasterLayout";
import avatar from "/assets/images/avatar/avatar-shape1.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import TeamLayout from "@components/business/dashboard/team/TeamLayout";
import { startOfWeek, subWeeks, addWeeks, addDays, format } from "date-fns";

const members = [
  {
    id: 1,
    name: "Aaditya Paithane",
    email: "aadityamp01@gmail.com",
    phone: "+91 97642 24365",
    role: "Admin",
    status: "Active",
    jobTitle: "Founder",
    image: avatar,
    rating: 4.5,
  },
//   {
//     id: 2,
//     name: "Rishikesh Shende",
//     email: "rishikeshshende@gmail.com",
//     phone: "+91 87456 32109",
//     role: "Admin",
//     status: "Active",
//     jobTitle: "Founder",
//     image: avatar,
//   },
];

const TeamMembersPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentSection = queryParams.get('section') || 'team';
  const [selectedTab, setSelectedTab] = useState(currentSection);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  
  // Add these hooks at the component level
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

  const handlePrevWeek = () => {
    setCurrentWeek(prev => subWeeks(prev, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeek(prev => addWeeks(prev, 1));
  };

  const generateWeekDays = () => {
    return Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));
  };

  useEffect(() => {
    setSelectedTab(currentSection);
  }, [currentSection]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('section', tab);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const renderAddMemberSection = () => (
    <div className="tw-flex-grow">
        <PageHeader
          title="Team members"
          count={members.length}
            onAdd={() => {
                navigate("/booking-dashboard/team/team_member_add");
          }}
          onOptions={() => {}}
        />
        <TeamMembersTable members={members} />
      </div>
  );

  const renderScheduledShiftsSection = () => {
    const weekDays = generateWeekDays();

    return (
      <div className="tw-flex-grow">
        <div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
          <h6 className="tw-text-2xl tw-font-semibold">Scheduled shifts</h6>
          <div className="tw-flex tw-gap-2">
            <button className="tw-px-4 tw-py-2 tw-border tw-rounded-lg tw-flex tw-items-center tw-gap-2">
              Options
              <svg className="tw-w-4 tw-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button className="tw-px-4 tw-py-2 tw-bg-black tw-text-white tw-rounded-lg tw-flex tw-items-center tw-gap-2">
              Add
              <svg className="tw-w-4 tw-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="tw-bg-gray-50 tw-p-4 tw-rounded-lg">
          <div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
            <div className="tw-flex tw-items-center tw-gap-4">
              <button className="tw-p-2 tw-rounded-lg hover:tw-bg-gray-200" onClick={handlePrevWeek}>
                <svg className="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="tw-text-lg">This week</div>
              <div className="tw-text-gray-600">
                {format(weekDays[0], 'dd MMM')} - {format(weekDays[6], 'dd MMM, yyyy')}
              </div>
              <button className="tw-p-2 tw-rounded-lg hover:tw-bg-gray-200" onClick={handleNextWeek}>
                <svg className="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="tw-bg-white tw-rounded-lg tw-border">
            <div className="tw-flex tw-border-b">
              <div className="tw-w-48 tw-p-4 tw-border-r">
                <div className="tw-flex tw-items-center tw-gap-2">
                  <span>Team member</span>
                  <button className="tw-text-blue-600 hover:tw-underline">Change</button>
                </div>
              </div>
              {weekDays.map((date, index) => (
                <div key={index} className="tw-flex-1 tw-p-4 tw-text-center tw-border-r last:tw-border-r-0">
                  <div className="tw-text-sm tw-text-gray-600">{format(date, 'EEE, d MMM')}</div>
                  <div className="tw-text-sm tw-text-gray-500">{format(date, 'h')}h</div>
                </div>
              ))}
            </div>

            <div className="tw-flex">
              <div className="tw-w-48 tw-p-4 tw-border-r">
                <div className="tw-flex tw-items-center tw-gap-2">
                  <div className="tw-w-8 tw-h-8 tw-bg-blue-600 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-white">
                    A
                  </div>
                  <div>
                    <div className="tw-font-medium">Aaditya Paithane</div>
                    <div className="tw-text-sm tw-text-gray-500">52h</div>
                  </div>
                  <button className="tw-ml-auto">
                    <svg className="tw-w-4 tw-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>
              </div>
              {weekDays.map((date, index) => (
                <div key={index} className="tw-flex-1 tw-p-4 tw-border-r last:tw-border-r-0">
                  <div className="tw-bg-blue-100 tw-text-blue-800 tw-px-3 tw-py-1 tw-rounded tw-text-sm">
                    10am - 7pm
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="tw-mt-4 tw-flex tw-items-center tw-gap-2 tw-text-sm tw-text-gray-600 tw-bg-blue-50 tw-p-4 tw-rounded-lg">
            <svg className="tw-w-5 tw-h-5 tw-text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            The team roster shows your availability for bookings and is not linked to your business opening hours. To set your opening hours,
            <button className="tw-text-blue-600 hover:tw-underline">click here</button>.
          </div>
        </div>
      </div>
    );
  };

  const renderTimesheetsSection = () => (
    <div className="tw-flex-grow">
      <PageHeader title="Timesheets" count={0} onAdd={() => {}} onOptions={() => {}} />
    </div>
  );

  const renderPayrunsSection = () => (
    <div className="tw-flex-grow">
      <PageHeader title="Pay runs" count={0} onAdd={() => {}} onOptions={() => {}} />
    </div>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case 'team':
        return renderAddMemberSection();
      case 'shifts':
        return renderScheduledShiftsSection();
      case 'timesheets':
        return renderTimesheetsSection();
      case 'payruns':
        return renderPayrunsSection();
      default:
        return renderAddMemberSection();
    }
  };
  
  return (
    <MasterLayout>
      <TeamLayout
        selectedTab={selectedTab}
        onTabSelect={handleTabChange}
        title={selectedTab === 'team' ? 'Team members' : 'Scheduled shifts'}
      >
        {renderContent()}
      </TeamLayout>
    </MasterLayout>
  );
};

export default TeamMembersPage;