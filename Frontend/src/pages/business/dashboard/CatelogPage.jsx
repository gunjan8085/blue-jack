import React from "react";
import PageHeader from "@components/business/dashboard/PageHeader";
import MasterLayout from "../../../masterLayout/MasterLayout";
import avatar from "/assets/images/avatar/avatar-shape1.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CatalogueLayout from "@components/business/dashboard/catalogue/CatalogueLayout";
import ServicesMenuPage from "@pages/business/dashboard/servicesMenu/ServicesMenuPage";

const CatelogPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentSection = queryParams.get('section') || 'services';
  const [selectedTab, setSelectedTab] = useState(currentSection);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('section', tab);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  useEffect(() => {
    setSelectedTab(currentSection);
  }, [currentSection]);


  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);


  const renderServiceMenuSection = () => (
    <div className="tw-flex-grow">
        <PageHeader
          title="Service Menu"
          description="View and manage the services offered by your business."
          // count={members.length}
            onAdd={() => {
                navigate("/booking-dashboard/catalogue/services/add");
          }}
          onOptions={() => {}}
        />
        <ServicesMenuPage />
      </div>
  );

  const renderMembershipSection = () => (
    <div className="tw-flex-grow">
      <PageHeader title="Membership" count={0} onAdd={() => {}} onOptions={() => {}} />
    </div>
  );

  const renderProductsSection = () => (
    <div className="tw-flex-grow">
      <PageHeader title="Products" count={0} onAdd={() => {}} onOptions={() => {}} />
    </div>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case 'services':
        return renderServiceMenuSection();
      case 'membership':
        return renderMembershipSection();
      case 'products':
        return renderProductsSection();
      default:
        return renderServiceMenuSection();
    }
  };
  
  return (
    <MasterLayout>
      <CatalogueLayout
        selectedTab={selectedTab}
        onTabSelect={handleTabChange}
        title={selectedTab === 'services' ? 'Service Menu' : 'Membership'}
      >
        {renderContent()}
      </CatalogueLayout>
    </MasterLayout>
  );
};

export default CatelogPage;