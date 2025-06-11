import React from "react";
import TeamMemberRow from "@components/business/dashboard/TeamMemberRow";

const TeamMembersTable = ({ members }) => (
  <div className="tw-bg-white tw-rounded-xl tw-shadow tw-overflow-x-auto">
    <div className="tw-flex tw-items-center tw-gap-4 tw-p-4 tw-bg-gray-50">
      <input
        type="text"
        placeholder="Search team members"
        className="tw-flex-1 tw-p-2 tw-border tw-rounded-lg"
      />
      <button className="tw-bg-white tw-border tw-border-gray-300 tw-rounded-lg tw-px-4 tw-py-2 tw-font-medium">
        Filters
      </button>
      <button className="tw-bg-white tw-border tw-border-gray-300 tw-rounded-lg tw-px-4 tw-py-2 tw-font-medium">
        Custom order
      </button>
    </div>
    <table className="tw-w-full tw-mt-2">
      <thead>
        <tr className="tw-text-left tw-text-gray-500 tw-text-sm">
          <th className="tw-px-6 tw-py-3"><input type="checkbox" /></th>
          <th className="tw-px-6 tw-py-3">Name</th>
          <th className="tw-px-6 tw-py-3">Contact</th>
          <th className="tw-px-6 tw-py-3">Rating</th>
          <th className="tw-px-6 tw-py-3"></th>
        </tr>
      </thead>
      <tbody>
        {members.map((member) => (
          <TeamMemberRow key={member.email} member={member} />
        ))}
      </tbody>
    </table>
  </div>
);

export default TeamMembersTable;