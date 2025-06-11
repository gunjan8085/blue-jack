import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export function ProductCard({
  title,
  rating,
  reviews,
  location,
  category,
  image,
}) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="tw-w-[310px] md:tw-w-[400px] tw-bg-white tw-text-black tw-relative tw-overflow-hidden tw-rounded-[20px] tw-transition-transform tw-duration-300 tw-border tw-group">
        <div
          className="tw-cursor-pointer tw-relative tw-transition-transform tw-duration-300 
           group-hover:tw-scale-105"
          onClick={() => {
            navigate(`/${title}`);
          }}
        >
          {/* Therapy Image */}
          <img
            src={image}
            alt={title}
            className="tw-w-full tw-h-[270px] tw-object-cover"
          />

          {/* Title and Category */}
          <div
            className="tw-absolute tw-inset-x-0 tw-top-8 tw-left-6 tw-flex tw-w-fit tw-rounded-2xl tw-flex-col tw-border-2 tw-border-white tw-justify-end tw-p-2 tw-transition-all tw-duration-300 
              group-hover:tw-bg-purple-100 group-hover:tw-text-black
                tw-bg-white tw-text-black"
          >
            <span className="tw-text-sm tw-mt-1">{category}</span>
          </div>

          {/* Location and Rating */}
          <div className="tw-flex tw-flex-col tw-items-start tw-justify-start tw-bg-white/90 tw-px-4 tw-py-2 tw-rounded-lg tw-shadow-md tw-transition-opacity tw-duration-300">
            <span className="tw-text-xl tw-font-medium">{title}</span>
            <span className="tw-text-sm tw-font-medium">{location}</span>
            <span className="tw-text-sm tw-text-gray-600">
              {rating} ★ ({reviews} reviews)
            </span>
          </div>

          {/* Arrow Button */}
          <div
            className={`tw-absolute tw-top-6 tw-md:bottom-6 tw-right-8 tw-flex tw-items-center tw-justify-center tw-w-12 tw-h-12 tw-rounded-full tw-transition-transform tw-duration-300 tw-bg-white tw-border tw-border-white tw-text-black group-hover:tw-bg-purple-100 group-hover:tw-text-black group-hover:tw-scale-110`}
          >
            <ArrowUpRight size={24} />
          </div>
        </div>
      </div>
    </>
  );
}
