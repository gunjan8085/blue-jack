import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function ProductCard({ title, image }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`tw-relative tw-w-75 tw-h-80 tw-rounded-2xl tw-overflow-hidden tw-shadow-lg tw-bg-white tw-cursor-pointer tw-transition-transform tw-duration-300 ${
        hovered ? "tw-scale-100" : ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/${title}`)}
    >
      {/* Image */}
      <img
        src={image}
        alt={title}
        className={`tw-w-full tw-h-full tw-object-cover tw-transition-transform tw-duration-300 ${
          hovered ? "tw-scale-110" : ""
        }`}
        draggable={false}
      />
      {/* Overlay */}
      <div className="tw-absolute tw-inset-0 tw-bg-black/40" />
      {/* Title */}
      <span className="tw-absolute tw-left-6 tw-bottom-6 tw-text-white tw-font-bold tw-text-2xl tw-drop-shadow">
        {title}
      </span>
      {/* Arrow Button */}
      <div className="tw-absolute tw-bottom-6 tw-right-6 tw-w-10 tw-h-10 tw-bg-black/30 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-transition-all tw-duration-300 hover:tw-bg-black/60">
        <ArrowRight size={24} className="tw-text-white" />
      </div>
    </div>
  );
}
