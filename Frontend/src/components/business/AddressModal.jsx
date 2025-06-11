import React, { useState } from 'react';

const AddressModal = ({ isOpen, onClose, onSave, initialAddress = {} }) => {
  const [address, setAddress] = useState({
    type: initialAddress.type || 'Home',
    street: initialAddress.street || '',
    city: initialAddress.city || '',
    state: initialAddress.state || '',
    postalCode: initialAddress.postalCode || '',
    country: initialAddress.country || ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(address);
    onClose();
  };

  return (
    <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center tw-z-50">
      <div className="tw-bg-white tw-rounded-lg tw-p-6 tw-w-full tw-max-w-lg">
        <div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
          <h2 className="tw-text-xl tw-font-semibold">
            {initialAddress.type ? 'Edit address' : 'Add address'}
          </h2>
          <button 
            onClick={onClose}
            className="tw-text-gray-400 hover:tw-text-gray-600"
          >
            <svg className="tw-w-6 tw-h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="tw-space-y-4">
          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
              Address type
            </label>
            <select
              value={address.type}
              onChange={(e) => setAddress({ ...address, type: e.target.value })}
              className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
            >
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
              Street address <span className="tw-text-red-500">*</span>
            </label>
            <input
              type="text"
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
              className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
              required
            />
          </div>

          <div className="tw-grid tw-grid-cols-2 tw-gap-4">
            <div>
              <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
                City <span className="tw-text-red-500">*</span>
              </label>
              <input
                type="text"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
                required
              />
            </div>

            <div>
              <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
                State/Province
              </label>
              <input
                type="text"
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
              />
            </div>
          </div>

          <div className="tw-grid tw-grid-cols-2 tw-gap-4">
            <div>
              <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
                Postal code <span className="tw-text-red-500">*</span>
              </label>
              <input
                type="text"
                value={address.postalCode}
                onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
                required
              />
            </div>

            <div>
              <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
                Country <span className="tw-text-red-500">*</span>
              </label>
              <input
                type="text"
                value={address.country}
                onChange={(e) => setAddress({ ...address, country: e.target.value })}
                className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
                required
              />
            </div>
          </div>

          <div className="tw-flex tw-justify-end tw-gap-4 tw-mt-6">
            <button
              type="button"
              onClick={onClose}
              className="tw-px-4 tw-py-2 tw-text-gray-600 tw-bg-white tw-border tw-rounded-lg hover:tw-bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="tw-px-4 tw-py-2 tw-text-white tw-bg-black tw-rounded-lg hover:tw-bg-gray-900"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal; 