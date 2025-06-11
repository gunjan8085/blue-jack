import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SidebarMenuCatServices from '@components/business/dashboard/SidebarMenuCatServices';

const CatalogueServiceMenuLayout = ({ 
  children, 
  selectedTab, 
  onTabSelect,
  title
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabSelect = (tab) => {
    onTabSelect(tab);
    const currentPath = location.pathname;
    navigate(`${currentPath}?section=${tab}`);
  };

  return (
    <div className="tw-min-h-screen tw-bg-white">
      <div className="tw-flex tw-ml-4">
        <SidebarMenuCatServices selected={selectedTab} onSelect={handleTabSelect} />
        <div className="tw-flex-1 tw-p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CatalogueServiceMenuLayout; 