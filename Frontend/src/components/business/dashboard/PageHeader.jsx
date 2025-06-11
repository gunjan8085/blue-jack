import React from "react";

const PageHeader = ({
  title,
  count,
  onAdd,
  onOptions,
  searchPlaceholder = "Search...",
  onSearch,
  onFilter,
  filterLabel = "Filters",
  orderLabel = "Custom order",
  description,
}) => (
  <div className="tw-flex tw-items-center tw-justify-between tw-mb-6">
    <div>
      <h6 className="tw-text-2xl tw-font-bold">
        {title} <span className="tw-text-md tw-text-gray-400 tw-font-normal">{count ? `(${count})` : ""}</span>
      </h6>
      <p className="tw-text-sm tw-text-gray-400 tw-font-normal">{description}</p>
    </div>
    <div className="tw-flex tw-items-center tw-gap-4">
      <button
        className="tw-bg-white tw-border tw-border-gray-300 tw-rounded-lg tw-px-6 tw-py-2 tw-font-medium tw-mr-2"
        onClick={onOptions}
      >
        Options
      </button>
      <button
        className="tw-bg-black tw-text-white tw-rounded-lg tw-px-6 tw-py-2 tw-font-semibold"
        onClick={onAdd}
      >
        Add
      </button>
    </div>
  </div>
);
export default PageHeader;