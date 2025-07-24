"use client";
import React from "react";
import SearchBar from "@/components/SearchBarbooking";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import HeaderForCustomer from "@/components/customer/HeaderForCustomer";
import FeaturedBusinesses from "@/components/FeaturedBusinesses";
import Testimonial from "./Testimonial";
import CTAsection from "./CTAsection";
import Footer from "@/components/Footer";
import Link from "next/link";
export default function Hero() {
  return (
    <div className="">
      <HeaderForCustomer />
      <div
        className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden"
        style={{ fontFamily: "'Proxima Nova', 'Montserrat', sans-serif" }}
      >
        {/* Blurred blue gradient shape */}
        <div className="absolute left-0 top-0 w-[480px] h-[480px] rounded-[48px] bg-[#4B5CF0] opacity-80 blur-[100px] z-0" />
        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-24 pb-16">
          <h1
            className="text-4xl md:text-6xl font-extrabold text-black mb-6 leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Book local beauty wellness services
            <br />
            Book Instantly
          </h1>
          <p className="text-lg md:text-xl text-black/70 max-w-2xl mb-8">
            Discover and book appointments with top-rated beauty and wellness
            professionals in your area
          </p>

          <Link href="/businesses">
            <ShimmerButton className="shadow-2xl w-[230px] h-[60px] flex items-center justify-center">
              <span className="whitespace-pre-wrap text-center text-2xl font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Explore more
              </span>
            </ShimmerButton>
          </Link>
        </div>
        <SearchBar />

        <ContainerScroll
          titleComponent={
            <>
              <h1
                className="text-4xl text-white  "
                style={{ fontFamily: "'Proxima Nova', sans-serif" }}
              >
                <br />
                <span className="text-4xl md:text-[4rem] font-bold mt-1 leading-none text-black">
                  Discover the Difference
                </span>
              </h1>
            </>
          }
        >
          <video
            src="https://res.cloudinary.com/dwyyrm9xw/video/upload/v1753191939/zify_pay_website_22_july_2025_yufxei.mp4"
            height={500}
            width={1000}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
            controls
            autoPlay
            muted
            playsInline
            loop
          />

          {/* <iframe
            width="1000"
            height="500"
            src="https://youtu.be/qjCH13g3wqY?si=bnmWvVaHm1cKbSe8"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
          ></iframe> */}
        </ContainerScroll>
        <FeaturedBusinesses />
        <Testimonial />
        <CTAsection />
      </div>
      <Footer />
    </div>
  );
}
