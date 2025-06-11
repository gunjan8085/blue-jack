import React from "react";

const Team = React.forwardRef((props, ref) => {
  // Team data with random avatar images from DiceBear API
  const teamMembers = [
    {
      name: "Joshua",
      rating: "4.7",
      avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Joshua",
    },
    {
      name: "Sana",
      rating: "4.7",
      avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Sana",
    },
    {
      name: "Bharti",
      rating: "-",
      avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Bharti",
    },
    {
      name: "Ruchi",
      rating: "4.8",
      avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Ruchi",
    },
    {
      name: "Dwyesh",
      rating: "4.9",
      avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Dwyesh",
    },
    {
      name: "Nivedita",
      rating: "5.0",
      avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Nivedita",
    },
    {
      name: "Nikita",
      rating: "4.9",
      avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Nikita",
    },
  ];

  return (
    <section id="team" ref={ref} className="tw-container tw-mx-auto tw-py-8">
      <h2 className="text-2xl tw-font-bold tw-mb-8 tw-text-center">
        Our Stylists
      </h2>

      <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 md:tw-grid-cols-4 lg:tw-grid-cols-7 tw-gap-6">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="tw-flex tw-flex-col tw-items-center tw-group"
          >
            {/* Profile Image with hover effect */}
            <div className="tw-relative tw-mb-3 tw-rounded-full tw-overflow-hidden tw-w-16 tw-h-16 md:tw-w-20 md:tw-h-20 tw-border-2 tw-border-gray-200 group-hover:tw-border-blue-400 tw-transition-all">
              <img
                src={member.avatar}
                alt={member.name}
                className="tw-w-full tw-h-full tw-object-cover"
                onError={(e) => {
                  e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${member.name}`;
                }}
              />
            </div>

            {/* Member Details */}
            <div className="tw-text-center">
              <p className="tw-font-medium tw-text-gray-800">{member.name}</p>
              {member.rating !== "-" && (
                <div className="tw-flex tw-items-center tw-justify-center tw-mt-1">
                  <span className="tw-text-yellow-500">★</span>
                  <span className="tw-text-gray-600 tw-ml-1 tw-text-sm">
                    {member.rating}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default Team;
