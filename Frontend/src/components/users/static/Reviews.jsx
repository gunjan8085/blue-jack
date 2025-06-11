import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Reviews = React.forwardRef((props, ref) => {
  const reviews = [
    {
      user: "Dhaval P",
      comment:
        "Amazing guys! They really have a knack for doing the best haircuts in town.",
      rating: 5,
      date: "2024-05-15",
    },
    {
      user: "Vidhi S",
      comment:
        "Joshua is really a sweet guy and made me understand many things. Thank you so much!",
      rating: 4,
      date: "2024-04-28",
    },
    {
      user: "Krisha K",
      comment: "Awesome!",
      rating: 5,
      date: "2024-06-02",
    },
    {
      user: "Neha R",
      comment: "Loved the hair coloring service, perfect results!",
      rating: 5,
      date: "2024-05-20",
    },
    {
      user: "Amit G",
      comment: "Professional service with great attention to detail",
      rating: 4,
      date: "2024-03-10",
    },
    {
      user: "Priya M",
      comment: "Best salon experience ever! Will definitely come back.",
      rating: 5,
      date: "2024-06-15",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const cardsToShow = 5;

  // Auto-slide effect
  useEffect(() => {
    if (!autoSlide || reviews.length <= cardsToShow) return;
    const interval = setInterval(() => {
      setCurrentIndex(
        (prev) => (prev + 1) % (reviews.length - cardsToShow + 1)
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [autoSlide, reviews.length]);

  const nextReview = () => {
    if (currentIndex < reviews.length - cardsToShow) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
    setAutoSlide(false);
  };

  const prevReview = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(reviews.length - cardsToShow);
    }
    setAutoSlide(false);
  };

  return (
    <section
      id="reviews"
      ref={ref}
      className="tw-container tw-mx-auto tw-py-8 tw-relative"
    >
      <h2 className="text-2xl tw-font-bold tw-mb-8 tw-text-center">
        Customer Reviews
      </h2>

      <div className="tw-relative tw-overflow-hidden">
        {/* Review Cards Container */}
        <div className="tw-relative tw-h-64">
          <motion.div
            className="tw-flex tw-space-x-4 tw-absolute tw-top-0 tw-left-0"
            animate={{
              x: `-${currentIndex * (100 / cardsToShow)}%`,
              transition: { type: "spring", stiffness: 300, damping: 30 },
            }}
          >
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                className="tw-flex-shrink-0"
                style={{ width: `${100 / cardsToShow}%` }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 tw-h-full tw-mx-2 tw-w-80">
                  <div className="tw-flex tw-items-center tw-mb-4">
                    <div className="tw-flex-shrink-0 tw-w-12 tw-h-12 tw-rounded-full tw-bg-blue-100 tw-flex tw-items-center tw-justify-center tw-mr-4">
                      <span className="tw-text-blue-600 tw-font-bold">
                        {review.user.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="tw-font-medium">{review.user}</p>
                      <div className="tw-flex tw-items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < review.rating
                                ? "tw-text-yellow-400"
                                : "tw-text-gray-300"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="tw-text-gray-400 tw-text-sm tw-ml-auto">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <blockquote className="tw-text-gray-700 text-sm tw-pl-2 tw-border-l-2 tw-border-blue-200">
                    "{review.comment}"
                  </blockquote>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="tw-flex tw-justify-center tw-items-center tw-mt-6 tw-space-x-4">
        <button
          onClick={prevReview}
          className="tw-p-2 tw-rounded-full tw-bg-gray-100 hover:tw-bg-gray-200"
        >
          ‹
        </button>

        <div className="tw-flex tw-space-x-2">
          {Array.from({ length: reviews.length - cardsToShow + 1 }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setAutoSlide(false);
                }}
                className={`tw-w-3 tw-h-3 tw-rounded-full ${
                  currentIndex === index ? "tw-bg-blue-500" : "tw-bg-gray-300"
                }`}
              />
            )
          )}
        </div>

        <button
          onClick={nextReview}
          className="tw-p-2 tw-rounded-full tw-bg-gray-100 hover:tw-bg-gray-200"
        >
          ›
        </button>
      </div>

      {/* Auto-slide Toggle */}
      {/* {reviews.length > cardsToShow && (
        <div className="tw-flex tw-justify-cente tw-items-center tw-mt-4">
          <button
            onClick={() => setAutoSlide(!autoSlide)}
            className="tw-text-sm tw-text-blue-600 hover:tw-underline"
          >
            {autoSlide ? "❚❚ Pause" : "▶ Auto-play"}
          </button>
        </div>
      )} */}
    </section>
  );
});

export default Reviews;
