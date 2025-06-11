import React from "react";

const menu = [
  { label: "Team members", key: "team" },
  { label: "Scheduled shifts", key: "shifts" },
  // { label: "Timesheets", key: "timesheets" },
  // { label: "Pay runs", key: "payruns" },
];

const SidebarMenuTeam = ({ selected = "team", onSelect }) => {
  return (
    <div className="tw-w-64 tw-mt-10 tw-border-r tw-min-h-screen">
      <h8 className="tw-text-[18px] tw-text-gray-800 tw-font-bold tw-px-8 tw-py-1">Team</h8>
      <nav className="tw-p-4">
        {menu.map((item) => (
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
      </nav>
    </div>
  );
};

export default SidebarMenuTeam;