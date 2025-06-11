import React, { useState, useEffect } from 'react';
import TeamMemberLayout from '@components/business/dashboard/team/TeamMemberLayout';
import { useLocation, useNavigate } from 'react-router-dom';

const TeamMemberAdd = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const currentSection = queryParams.get('section') || 'profile';
  const [selectedTab, setSelectedTab] = useState(currentSection);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('section', tab);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  // Update selected tab when URL query changes
  useEffect(() => {
    setSelectedTab(currentSection);
  }, [currentSection]);

  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    additionalPhoneNumber: '',
    country: '',
    // Address fields
    address: '',
    city: '',
    state: '',
    zipCode: '',
    // Emergency contact fields
    emergencyName: '',
    emergencyRelation: '',
    emergencyPhone: ''
  });

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);

  const services = [
    {
      category: 'Hair & styling',
      count: 4,
      items: [
        { id: 1, name: 'Balayage', duration: '2h 30min', price: 150 },
        { id: 2, name: 'Hair Color', duration: '1h 15min', price: 57 },
      ]
    }
  ];

  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId);
      }
      return [...prev, serviceId];
    });
  };

  const renderProfileSection = () => (
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
            value={formData.firstName}
            onChange={handleInputChange('firstName')}
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
            value={formData.lastName}
            onChange={handleInputChange('lastName')}
            className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
          />
        </div>

        <div>
          <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
            Email <span className="tw-text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={handleInputChange('email')}
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
              value={formData.phoneNumber}
              onChange={handleInputChange('phoneNumber')}
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
            value={formData.additionalPhoneNumber}
            onChange={handleInputChange('additionalPhoneNumber')}
            className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
          />
        </div>

        <div>
          <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
            Country
          </label>
          <input
            type="text"
            value={formData.country}
            onChange={handleInputChange('country')}
            className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
          />
        </div>
      </form>
    </div>
  );

  const renderAddressesSection = () => (
    <div className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-6 tw-max-w-4xl">
      <div className="tw-mb-6">
        <h6 className="tw-text-xl tw-font-semibold tw-mb-1">Addresses</h6>
        <p className="tw-text-gray-500">Manage your team member's addresses</p>
      </div>

      <form className="tw-grid tw-grid-cols-2 tw-gap-6">
        <div className="tw-col-span-2">
          <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
            Address
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={handleInputChange('address')}
            className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
          />
        </div>

        <div>
          <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
            City
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={handleInputChange('city')}
            className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
          />
        </div>

        <div>
          <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
            State
          </label>
          <input
            type="text"
            value={formData.state}
            onChange={handleInputChange('state')}
            className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
          />
        </div>

        <div>
          <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
            ZIP Code
          </label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={handleInputChange('zipCode')}
            className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
          />
        </div>
      </form>
    </div>
  );

  const renderEmergencySection = () => (
    <div className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-6 tw-max-w-4xl">
      <div className="tw-mb-6">
        <h6 className="tw-text-xl tw-font-semibold tw-mb-1">Emergency Contact</h6>
        <p className="tw-text-gray-500">Add emergency contact information</p>
      </div>

      <form className="tw-grid tw-grid-cols-2 tw-gap-6">
        <div>
          <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
            Contact Name
          </label>
          <input
            type="text"
            value={formData.emergencyName}
            onChange={handleInputChange('emergencyName')}
            className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
          />
        </div>

        <div>
          <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
            Relationship
          </label>
          <input
            type="text"
            value={formData.emergencyRelation}
            onChange={handleInputChange('emergencyRelation')}
            className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
          />
        </div>

        <div>
          <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.emergencyPhone}
            onChange={handleInputChange('emergencyPhone')}
            className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
          />
        </div>
      </form>
    </div>
  );

  const renderServicesSection = () => (
    <div className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-6 tw-max-w-4xl">
      <div className="tw-mb-6">
        <h6 className="tw-text-2xl tw-font-semibold tw-mb-2">Services</h6>
        <p className="tw-text-gray-600">Choose the services this team member provides</p>
      </div>

      <div className="tw-mb-6">
        <div className="tw-relative">
          <input
            type="text"
            placeholder="Search services"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="tw-w-full tw-pl-10 tw-pr-4 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
          />
          <div className="tw-absolute tw-left-3 tw-top-1/2 tw-transform -tw-translate-y-1/2">
            <svg className="tw-w-5 tw-h-5 tw-text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="tw-space-y-6">
        <div className="tw-flex tw-items-center tw-gap-3">
          <div className="tw-flex tw-items-center tw-gap-2">
            <input
              type="checkbox"
              id="all-services"
              checked={selectedServices.length === services.reduce((acc, cat) => acc + cat.items.length, 0)}
              onChange={() => {
                if (selectedServices.length === services.reduce((acc, cat) => acc + cat.items.length, 0)) {
                  setSelectedServices([]);
                } else {
                  setSelectedServices(services.flatMap(cat => cat.items.map(item => item.id)));
                }
              }}
              className="tw-w-4 tw-h-4 tw-rounded tw-border-gray-300 tw-text-blue-600 focus:tw-ring-blue-500"
            />
            <label htmlFor="all-services" className="tw-font-medium">All services</label>
          </div>
          <span className="tw-bg-gray-100 tw-px-2 tw-py-0.5 tw-rounded-full tw-text-sm">4</span>
        </div>

        {services.map((category) => (
          <div key={category.category} className="tw-space-y-4">
            <div className="tw-flex tw-items-center tw-gap-3">
              <div className="tw-flex tw-items-center tw-gap-2">
                <input
                  type="checkbox"
                  id={`category-${category.category}`}
                  checked={category.items.every(item => selectedServices.includes(item.id))}
                  onChange={() => {
                    const categoryIds = category.items.map(item => item.id);
                    if (category.items.every(item => selectedServices.includes(item.id))) {
                      setSelectedServices(prev => prev.filter(id => !categoryIds.includes(id)));
                    } else {
                      setSelectedServices(prev => [...new Set([...prev, ...categoryIds])]);
                    }
                  }}
                  className="tw-w-4 tw-h-4 tw-rounded tw-border-gray-300 tw-text-blue-600 focus:tw-ring-blue-500"
                />
                <label htmlFor={`category-${category.category}`} className="tw-font-medium">{category.category}</label>
              </div>
              <span className="tw-bg-gray-100 tw-px-2 tw-py-0.5 tw-rounded-full tw-text-sm">{category.count}</span>
            </div>

            <div className="tw-space-y-3 tw-ml-6">
              {category.items.map((service) => (
                <div key={service.id} className="tw-flex tw-items-center tw-justify-between">
                  <div className="tw-flex tw-items-center tw-gap-2">
                    <input
                      type="checkbox"
                      id={`service-${service.id}`}
                      checked={selectedServices.includes(service.id)}
                      onChange={() => handleServiceToggle(service.id)}
                      className="tw-w-4 tw-h-4 tw-rounded tw-border-gray-300 tw-text-blue-600 focus:tw-ring-blue-500"
                    />
                    <label htmlFor={`service-${service.id}`} className="tw-flex tw-flex-col">
                      <span className="tw-font-medium">{service.name}</span>
                      <span className="tw-text-sm tw-text-gray-500">{service.duration}</span>
                    </label>
                  </div>
                  <span className="tw-font-medium">₹{service.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case 'addresses':
        return renderAddressesSection();
      case 'emergency':
        return renderEmergencySection();
      case 'services':
        return renderServicesSection();
      case 'profile':
      default:
        return renderProfileSection();
    }
  };

  return (
    <TeamMemberLayout
      selectedTab={selectedTab}
      onTabSelect={handleTabChange}
      title="Add Team Member"
    >
      {renderContent()}
    </TeamMemberLayout>
  );
};

export default TeamMemberAdd;