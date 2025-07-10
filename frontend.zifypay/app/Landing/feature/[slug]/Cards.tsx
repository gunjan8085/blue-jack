"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface TwoSectionCardProps {
  title?: string;
  description?: string;
  content?: string;
  videoSrc?: string;
  videoPoster?: string;
  className?: string;
}

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg border bg-white text-black shadow-sm", className)}
    {...props}
  />
));
Card.displayName = "Card";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

function TwoSectionCard({
  title = "Innovative Solutions",
  description = "Discover cutting-edge technology",
  content = "Transform your business with our advanced platform that delivers exceptional results. Our comprehensive solution provides everything you need to succeed in today's competitive market. Experience seamless integration, powerful analytics, and unmatched performance that drives growth and innovation.",
  videoSrc = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  videoPoster = "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=450&fit=crop",
  className,
}: TwoSectionCardProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      className={cn("min-w-7xl w-full", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-0 min-h-[400px]">
          {/* Left Section */}
          <motion.div
            className="flex flex-col justify-center p-8 lg:p-12 bg-white"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6">
              <div className="space-y-3">
                <motion.h2
                  className="text-3xl lg:text-4xl font-bold text-black leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {title}
                </motion.h2>
                <motion.p
                  className="text-lg text-gray-700 font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {description}
                </motion.p>
              </div>
              <motion.p
                className="text-gray-800 leading-relaxed text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {content}
              </motion.p>
              <motion.div
                className="flex gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <button className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  Learn More
                </button>
                <button className="px-6 py-3 border border-gray-300 text-black rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Get Started
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Section - Video */}
          <motion.div
            className="relative bg-gray-100 flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-full h-full min-h-[400px]">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster={videoPoster}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                controls={isPlaying}
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {!isPlaying && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
                  onClick={handlePlayVideo}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
                    <Play
                      className="w-6 h-6 text-black ml-1"
                      fill="currentColor"
                    />
                  </div>
                </motion.div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function TwoSectionCardDemo() {
  return (
    <div className="px-12 bg-gradient-to-r from-[#001A39] to-[#001433] py-12">
      <div className="p-8 bg-white min-h-screen flex items-center justify-center rounded-2xl ">
        <TwoSectionCard />
      </div>
    </div>
  );
}
