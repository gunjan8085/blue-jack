import React from "react";
import PageHeader from "@components/business/dashboard/PageHeader";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CatalogueServiceMenuLayout from "@components/business/dashboard/catalogue/CatalogueServiceMenuLayout";

const ServicesMenuPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentSection = queryParams.get('section') || 'all';
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
  const [openDropdownCategory, setOpenDropdownCategory] = useState(null);

  const serviceCategories = [
    {
      name: "Nails",
      services: [
        {
          name: "Nail Cuts",
          duration: "1h",
          price: 500
        }
      ]
    },
    {
      name: "Hair & styling",
      services: [
        {
          name: "Hair Color",
          duration: "1h 15min",
          price: 57
        },
        {
          name: "Balayage",
          duration: "2h 30min",
          price: 150
        },
        {
          name: "Blow Dry",
          duration: "45min",
          price: 25
        }
      ]
    }
  ];

  const renderAllCategoriesMenuSection = () => (
    <div className="tw-flex-grow">
      <PageHeader 
        title="Service Menu" 
        count={serviceCategories.reduce((acc, cat) => acc + cat.services.length, 0)} 
        onAdd={() => navigate('/booking-dashboard/catalogue/services/add')} 
        onOptions={() => {}}
      />
      
      <div className="tw-space-y-8 tw-p-6">
        {serviceCategories.map((category) => (
          <div key={category.name} className="tw-space-y-4">
            <div className="tw-flex tw-justify-between tw-items-center">
              <h8 className="tw-text-xl tw-font-semibold">{category.name}</h8>
              <div className="tw-relative">
                <button 
                  onClick={() => setOpenDropdownCategory(
                    openDropdownCategory === category.name ? null : category.name
                  )} 
                  className="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700 tw-bg-white tw-rounded-lg tw-border hover:tw-bg-gray-50"
                >
                  Actions
                  <svg className="tw-w-4 tw-h-4 tw-ml-1 tw-inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {/* Dropdown menu */}
                {openDropdownCategory === category.name && (
                  <div className="tw-absolute tw-right-0 tw-z-10 tw-mt-2 tw-w-48 tw-bg-white tw-rounded-lg tw-shadow-lg tw-border tw-block">
                    <div className="tw-py-1">
                      <button className="tw-w-full tw-text-left tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 hover:tw-bg-gray-100">
                        Edit
                      </button>
                      <button className="tw-w-full tw-text-left tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 hover:tw-bg-gray-100">
                        Add Service
                      </button>
                      <button className="tw-w-full tw-text-left tw-px-4 tw-py-2 tw-text-sm tw-text-red-600 hover:tw-bg-gray-100">
                        Permanently Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="tw-space-y-2">
              {category.services.map((service) => (
                <div 
                  key={service.name}
                  className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-4 tw-flex tw-items-center tw-justify-between group hover:tw-shadow-md tw-transition-shadow"
                >
                  <div className="tw-space-y-1">
                    <h8 className="tw-font-medium">{service.name}</h8>
                    <p className="tw-text-gray-500">{service.duration}</p>
                  </div>
                  <div className="tw-flex tw-items-center tw-gap-4">
                    <span className="tw-font-medium">₹{service.price}</span>
                    <button className="tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity">
                      <svg className="tw-w-5 tw-h-5 tw-text-gray-400 hover:tw-text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3c-1.23 0-2.42.2-3.53.57L12 7.1l3.53-3.53C14.42 3.2 13.23 3 12 3zm0 18c1.23 0 2.42-.2 3.53-.57L12 16.9l-3.53 3.53c1.11.37 2.3.57 3.53.57zm7.07-15.47l-3.53 3.53 3.53 3.53c.37-1.11.57-2.3.57-3.53 0-1.23-.2-2.42-.57-3.53zM4.93 8.93L8.46 12l-3.53 3.53c.37 1.11.57 2.3.57 3.53 0-1.23-.2-2.42-.57-3.53l3.53-3.53-3.53-3.53z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHairStylingSection = () => (
    <div className="tw-flex-grow">
      <PageHeader title="Hair & Styling" count={0} onAdd={() => {}} onOptions={() => {}} />
    </div>
  );

  const renderBeautySection = () => (
    <div className="tw-flex-grow">
      <PageHeader title="Beauty" count={0} onAdd={() => {}} onOptions={() => {}} />
    </div>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case 'all':
        return renderAllCategoriesMenuSection();
      case 'hair':
        return renderHairStylingSection();
      case 'beauty':
        return renderBeautySection();
      default:
        return renderAllCategoriesMenuSection();
    }
  };
  
  return (
    <CatalogueServiceMenuLayout
      selectedTab={selectedTab}
      onTabSelect={handleTabChange}
      title={selectedTab === 'all' ? 'Service Menu' : 'Hair & Styling'}
    >
      {renderContent()}
    </CatalogueServiceMenuLayout>
  );
};

export default ServicesMenuPage;