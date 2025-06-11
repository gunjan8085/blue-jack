import React from 'react';
import SidebarMenuTeam from '@components/business/dashboard/SidebarMenuTeam';
import { useNavigate, useLocation } from 'react-router-dom';

const TeamLayout = ({ 
  children, 
  selectedTab, 
  onTabSelect,
  title
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
      <div className="tw-flex tw-ml-4">
        <SidebarMenuTeam selected={selectedTab} onSelect={handleTabSelect} />
        <div className="tw-flex-1 tw-p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TeamLayout; 