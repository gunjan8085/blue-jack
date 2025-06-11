import React from "react";

const menu = {
  catalog: [
    { label: "Service Menu", key: "services" },
    { label: "Memberships", key: "membership"},
    { label: "Products", key: "products" },
  ],
  // inventory: [
  //   { label: "Stocktake", key: "stocktake", count: 4 },
  //   { label: "Locations", key: "locations", count: 1 },
  //   { label: "Settings", key: "settings" },
  // ],
};

const SidebarMenu = ({ selected , onSelect }) => {
  return (
    <div className="tw-w-64 tw-border-r tw-min-h-screen">
      <nav className="tw-space-y-1 tw-p-4">
        {Object.keys(menu).map((section) => (
          <div key={section} className="tw-mb-6">
            <div className="tw-text-sm tw-font-medium tw-px-4 tw-py-2">
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </div>
            {menu[section].map((item) => (
              <button
                key={item.key}
                onClick={() => onSelect(item.key)}
                className={`tw-w-full tw-text-left tw-px-4 tw-py-3 tw-rounded-lg tw-transition-colors tw-flex tw-items-center tw-justify-between ${
                  selected === item.key
                    ? 'tw-bg-gray-100 tw-text-gray-900'
                    : 'tw-text-gray-600 hover:tw-bg-gray-50'
                }`}
              >
                <span>{item.label}</span>
                {item.count !== undefined && (
                  <span className={`tw-ml-2 tw-text-xs tw-px-2 tw-py-0.5 tw-rounded-full ${
                    selected === item.key
                      ? 'tw-bg-gray-200'
                      : 'tw-bg-gray-100'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default SidebarMenu;