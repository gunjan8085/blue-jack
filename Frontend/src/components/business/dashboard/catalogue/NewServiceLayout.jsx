import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SidebarMenuNewService from '@components/business/dashboard/SidebarMenuNewService';

const NewServiceLayout = ({ 
  children, 
  selectedTab, 
  onTabSelect,
  title = "New Service"
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabSelect = (tab) => {
    onTabSelect(tab);
    // Keep the current path but update the section query parameter
    const currentPath = location.pathname;
    navigate(`${currentPath}?section=${tab}`);
  };

  return (
    <div className="tw-min-h-screen tw-bg-white">
      <div className="tw-flex tw-justify-end tw-items-center tw-mb-8">
        <div className="tw-mt-4 tw-mr-20 tw-flex tw-gap-4">
          <button 
            onClick={() => navigate("/booking-dashboard/catalogue")} 
            className="tw-px-5 tw-py-3 tw-text-gray-600 tw-bg-white tw-border tw-rounded-lg hover:tw-bg-gray-50"
          >
            Close
          </button>
          <button className="tw-px-5 tw-py-3 tw-text-white tw-bg-black tw-rounded-lg hover:tw-bg-gray-900">
            Add
          </button>
        </div>
      </div>

      <div className="tw-p-8">
        <h4 className="tw-text-3xl tw-font-bold tw-mb-6">{title}</h4>
      </div>

      <div className="tw-flex tw-ml-20">
        <SidebarMenuNewService selected={selectedTab} onSelect={handleTabSelect} />
        <div className="tw-flex-1 tw-p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default NewServiceLayout; 