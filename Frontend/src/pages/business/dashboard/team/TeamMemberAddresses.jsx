import React, { useState } from 'react';
import TeamMemberLayout from '@components/business/dashboard/team/TeamMemberLayout';
import TeamMemberAddressModal from './TeamMemberAddressModal';
import { useLocation } from 'react-router-dom';

const AddressCard = ({ address, onEdit }) => (
  <div className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-6 tw-mb-4">
    <div className="tw-flex tw-justify-between tw-items-start">
      <div>
        <h3 className="tw-font-medium tw-mb-1">{address.type}</h3>
        <div className="tw-text-gray-600">
          <p>{address.street}</p>
          <p>{address.city}</p>
          <p>{address.postalCode}</p>
          <p>{address.country}</p>
        </div>
      </div>
      <button 
        onClick={onEdit}
        className="tw-text-blue-600 hover:tw-text-blue-700 tw-text-sm"
      >
        Edit
      </button>
    </div>
  </div>
);

const TeamMemberAddresses = () => {
  const location = useLocation();
  const currentTab = location.pathname.split('/').pop();
  const [selectedTab, setSelectedTab] = useState(currentTab || 'addresses');
  const [addresses, setAddresses] = useState([
    {
      type: 'Home',
      street: 'Railway station',
      city: 'Pune',
      postalCode: '411001',
      country: 'India'
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleAddAddress = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleEditAddress = (address, index) => {
    setEditingAddress({ ...address, index });
    setIsModalOpen(true);
  };

  const handleSaveAddress = (address) => {
    if (editingAddress !== null) {
      // Edit existing address
      const newAddresses = [...addresses];
      newAddresses[editingAddress.index] = address;
      setAddresses(newAddresses);
    } else {
      // Add new address
      setAddresses([...addresses, address]);
    }
  };

  return (
    <TeamMemberLayout
      selectedTab={selectedTab}
      onTabSelect={setSelectedTab}
    >
      <div className="tw-max-w-4xl">
        <div className="tw-mb-6">
          <h2 className="tw-text-xl tw-font-semibold tw-mb-1">Addresses</h2>
          <p className="tw-text-gray-500">Manage your team member's correspondence addresses.</p>
        </div>

        {/* Existing Addresses */}
        {addresses.map((address, index) => (
          <AddressCard 
            key={index}
            address={address}
            onEdit={() => handleEditAddress(address, index)}
          />
        ))}

        {/* Add Address Button */}
        <button 
          onClick={handleAddAddress}
          className="tw-flex tw-items-center tw-px-4 tw-py-2 tw-text-gray-700 tw-bg-white tw-border tw-border-gray-300 tw-rounded-lg hover:tw-bg-gray-50"
        >
          <svg 
            className="tw-w-5 tw-h-5 tw-mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add an address
        </button>
      </div>

      {/* Address Modal */}
      <TeamMemberAddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAddress}
        initialAddress={editingAddress || {}}
      />
    </TeamMemberLayout>
  );
};

export default TeamMemberAddresses;