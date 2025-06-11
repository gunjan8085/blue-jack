import React from 'react';
import SidebarMenuCatalogue from '@components/business/dashboard/SidebarMenuCatalogue';
import { useNavigate, useLocation } from 'react-router-dom';

const CatalogueLayout = ({ 
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
        <SidebarMenuCatalogue selected={selectedTab} onSelect={handleTabSelect} />
        <div className="tw-flex-1 tw-p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CatalogueLayout; 