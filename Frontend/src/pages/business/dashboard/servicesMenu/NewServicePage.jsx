import React, { useState, useEffect } from 'react';
import NewServiceLayout from '@components/business/dashboard/catalogue/NewServiceLayout';
import { useLocation, useNavigate } from 'react-router-dom';

const NewServicePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const currentSection = queryParams.get('section') || 'basic_details';
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
    serviceName: '',
    serviceType: '',
    category: 'Nails',
    description: '',
    priceType: 'Fixed',
    price: '',
    duration: '1h',
  });

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Handle character count for service name
    if (field === 'serviceName' && value.length <= 255) {
      setFormData(prev => ({
        ...prev,
        serviceName: value
      }));
    }
    // Handle character count for description
    if (field === 'description' && value.length <= 1000) {
      setFormData(prev => ({
        ...prev,
        description: value
      }));
    }
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

  const [selectedTeamMembers, setSelectedTeamMembers] = useState(['all']);
  
  const teamMembers = [
    {
      id: '1',
      initials: 'AP',
      name: 'Aaditya Paithane',
      selected: true
    }
  ];

  const handleTeamMemberToggle = (memberId) => {
    setSelectedTeamMembers(prev => {
      if (memberId === 'all') {
        // If selecting 'all', clear other selections and only include 'all'
        return ['all'];
      } else {
        // If selecting individual member, remove 'all' and toggle the member
        const newSelection = prev.filter(id => id !== 'all');
        if (newSelection.includes(memberId)) {
          return newSelection.filter(id => id !== memberId);
        } else {
          return [...newSelection, memberId];
        }
      }
    });
  };

  const renderBasicDetailsSection = () => (
    <div className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-6 tw-max-w-4xl">
      <div className="tw-mb-8">
        <h6 className="tw-text-2xl tw-font-semibold">Basic details</h6>
      </div>

      <div className="tw-space-y-6">
        {/* Service Name */}
        <div>
          <div className="tw-flex tw-justify-between tw-mb-1">
            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
              Service name
            </label>
            <span className="tw-text-sm tw-text-gray-500">
              {formData.serviceName.length}/255
            </span>
          </div>
          <input
            type="text"
            value={formData.serviceName}
            onChange={handleInputChange('serviceName')}
            placeholder="Add a service name, e.g. Men's Haircut"
            className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
            maxLength={255}
          />
        </div>

        {/* Service Type and Category */}
        <div className="tw-grid tw-grid-cols-2 tw-gap-6">
          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
              Service type
            </label>
            <select
              value={formData.serviceType}
              onChange={handleInputChange('serviceType')}
              className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
            >
              <option value="">Select service type</option>
              <option value="haircut">Haircut</option>
              <option value="coloring">Coloring</option>
              <option value="styling">Styling</option>
            </select>
            <p className="tw-mt-1 tw-text-sm tw-text-gray-500">
              Used to help clients find your service on Fresha marketplace
            </p>
          </div>

          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={handleInputChange('category')}
              className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
            >
              <option value="Nails">Nails</option>
              <option value="Hair">Hair</option>
              <option value="Spa">Spa</option>
            </select>
            <p className="tw-mt-1 tw-text-sm tw-text-gray-500">
              The category displayed to you, and to clients online
            </p>
          </div>
        </div>

        {/* Description */}
        <div>
          <div className="tw-flex tw-justify-between tw-mb-1">
            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
              Description <span className="tw-text-gray-500">(Optional)</span>
            </label>
            <span className="tw-text-sm tw-text-gray-500">
              {formData.description.length}/1000
            </span>
          </div>
          <textarea
            value={formData.description}
            onChange={handleInputChange('description')}
            placeholder="Add a short description"
            rows={4}
            className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
            maxLength={1000}
          />
        </div>

        {/* Pricing and Duration */}
        <div>
          <h6 className="tw-text-lg tw-font-semibold tw-mb-4">Pricing and duration</h6>
          <div className="tw-grid tw-grid-cols-3 tw-gap-6">
            <div>
              <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
                Price type
              </label>
              <select
                value={formData.priceType}
                onChange={handleInputChange('priceType')}
                className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
              >
                <option value="Fixed">Fixed</option>
                <option value="Variable">Variable</option>
                <option value="Free">Free</option>
              </select>
            </div>

            <div>
              <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
                Price
              </label>
              <div className="tw-relative">
                <span className="tw-absolute tw-left-3 tw-top-1/2 -tw-translate-y-1/2 tw-text-gray-500">₹</span>
                <input
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange('price')}
                  placeholder="0.00"
                  className="tw-w-full tw-pl-8 tw-pr-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
                Duration
              </label>
              <select
                value={formData.duration}
                onChange={handleInputChange('duration')}
                className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
              >
                <option value="15m">15 minutes</option>
                <option value="30m">30 minutes</option>
                <option value="45m">45 minutes</option>
                <option value="1h">1 hour</option>
                <option value="1h30m">1 hour 30 minutes</option>
                <option value="2h">2 hours</option>
              </select>
            </div>
          </div>
          <button
            type="button"
            className="tw-mt-4 tw-text-blue-600 tw-flex tw-items-center tw-gap-2 hover:tw-text-blue-700"
          >
            <svg className="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add extra time
          </button>
        </div>
      </div>
    </div>
  );

  const renderTeamMembersSection = () => (
    <div className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-6 tw-max-w-4xl">
      <div className="tw-mb-6">
        <h6 className="tw-text-2xl tw-font-semibold tw-mb-2">Team members required</h6>
        <p className="tw-text-gray-600">Choose which team members will perform this service</p>
      </div>

      <div className="tw-space-y-4">
        {/* All team members option */}
        <div className="tw-flex tw-items-center tw-gap-3">
          <button
            onClick={() => handleTeamMemberToggle('all')}
            className={`tw-w-6 tw-h-6 tw-rounded tw-flex tw-items-center tw-justify-center ${
              selectedTeamMembers.includes('all')
                ? 'tw-bg-blue-600 tw-text-white'
                : 'tw-border-2 tw-border-gray-300'
            }`}
          >
            {selectedTeamMembers.includes('all') && (
              <svg className="tw-w-4 tw-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
          <span className="tw-font-medium">All team members</span>
          <span className="tw-bg-gray-100 tw-px-2 tw-py-0.5 tw-rounded-full tw-text-sm">
            {teamMembers.length}
          </span>
        </div>

        {/* Individual team members */}
        {teamMembers.map(member => (
          <div key={member.id} className="tw-flex tw-items-center tw-gap-3">
            <button
              onClick={() => handleTeamMemberToggle(member.id)}
              className={`tw-w-6 tw-h-6 tw-rounded tw-flex tw-items-center tw-justify-center ${
                selectedTeamMembers.includes(member.id) || selectedTeamMembers.includes('all')
                  ? 'tw-bg-blue-600 tw-text-white'
                  : 'tw-border-2 tw-border-gray-300'
              }`}
            >
              {(selectedTeamMembers.includes(member.id) || selectedTeamMembers.includes('all')) && (
                <svg className="tw-w-4 tw-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <div className="tw-w-10 tw-h-10 tw-rounded-full tw-bg-blue-100 tw-flex tw-items-center tw-justify-center tw-text-blue-600 tw-font-medium">
              {member.initials}
            </div>
            <span className="tw-font-medium">{member.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case 'basic_details':
        return renderBasicDetailsSection();
      case 'team_members':
        return renderTeamMembersSection();
      default:
        return renderBasicDetailsSection();
    }
  };

  return (
    <NewServiceLayout
      selectedTab={selectedTab}
      onTabSelect={handleTabChange}
      title="New Service"
    >
      {renderContent()}
    </NewServiceLayout>
  );
};

export default NewServicePage;