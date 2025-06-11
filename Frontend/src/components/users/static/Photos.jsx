import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Photos = React.forwardRef((props, ref) => {
  // Dummy image data (replace with your actual images)
  const allPhotos = [
    "/assets/img/1.avif",
    "/assets/img/2.avif",
    "/assets/img/3.avif",
    "/assets/img/4.avif",
    "/assets/img/5.avif",
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Display first 3 photos in the grid (1 left + 2 right)
  const previewPhotos = allPhotos.slice(0, 3);
  const remainingPhotos = allPhotos.slice(3);

  return (
    <section id="photos" ref={ref} className="tw-container tw-mx-auto">
      <h2 className="text-2xl tw-font-bold tw-mb-6">Photos</h2>

      {/* Photo Grid */}
      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4">
        {/* Left (single large photo) */}
        <div className="md:tw-col-span-1">
          <img
            src={previewPhotos[0]}
            alt="Salon"
            className="tw-w-full tw-h-full tw-object-cover tw-rounded-lg"
          />
        </div>

        {/* Right (2 photos stacked) */}
        <div className="md:tw-col-span-2 tw-grid tw-grid-cols-2 tw-gap-4">
          {previewPhotos.slice(1).map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Salon ${index + 2}`}
              className="tw-w-full tw-h-48 md:tw-h-full tw-object-cover tw-rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* "See More" Button (if more than 3 photos) */}
      {allPhotos.length > 3 && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="tw-mt-4 tw-px-4 tw-py-2 tw-bg-black tw-text-white tw-rounded-lg"
        >
          See All Photos ({allPhotos.length})
        </button>
      )}

      {/* Full-screen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-90 tw-z-50 tw-flex tw-items-center tw-justify-center tw-p-4"
          >
            {/* Close Button (top-right) */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="tw-absolute tw-top-4 tw-right-4 tw-text-white tw-text-2xl tw-z-50"
            >
              ✕
            </button>

            {/* All Photos Grid */}
            <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4 tw-overflow-y-auto tw-max-h-screen tw-p-8">
              {allPhotos.map((photo, index) => (
                <motion.img
                  key={index}
                  src={photo}
                  alt={`Salon ${index + 1}`}
                  className="tw-w-full tw-h-64 tw-object-cover tw-rounded-lg"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});

export default Photos;
