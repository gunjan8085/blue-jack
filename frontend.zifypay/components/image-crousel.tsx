"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageCarouselProps {
  title?: string
  imageCount?: number
  className?: string
}

export default function ImageCarousel({
  title = "Hardware that's ready for the rush",
  imageCount = 8,
  className = "",
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Generate array of image paths
  const images = Array.from({ length: imageCount }, (_, i) => `/pic${i + 1}.png`)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  // Calculate which images to show (3 at a time on desktop, 1 on mobile)
  const getVisibleImages = () => {
    const visibleImages = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % images.length
      visibleImages.push({ src: images[index], index })
    }
    return visibleImages
  }

  return (
    <div className={`w-full bg-white py-8 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={goToPrevious}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <h2 className="text-lg font-medium text-gray-900 text-center flex-1">{title}</h2>

          <Button
            variant="ghost"
            size="sm"
            onClick={goToNext}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Image Carousel */}
        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-300 ease-in-out">
            {/* Mobile: Show 1 image */}
            <div className="block md:hidden w-full">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={images[currentIndex] || "/placeholder.svg"}
                  alt={`Carousel image ${currentIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </div>

            {/* Desktop: Show 3 images */}
            <div className="hidden md:flex w-full gap-4">
              {getVisibleImages().map((image, idx) => (
                <div key={`${image.index}-${idx}`} className="flex-1">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={`Carousel image ${image.index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === currentIndex ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
