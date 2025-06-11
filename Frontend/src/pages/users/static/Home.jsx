import BrowseByCity from "@components/users/static/BrowseByCity";
import Footer from "@components/users/static/Footer";
import Hero from "@components/users/static/Hero";
import Products from "@components/users/static/Products";
import ReviewsSection from "@components/users/static/ReviewCard";
// import StatsSection from "@components/users/static/statsSection";
import React from "react";

const Home = () => {
  return (
    <div>
      <Hero />
      <Products />
      <ReviewsSection />
      {/* <StatsSection /> */}
      <BrowseByCity />
      <Footer />
    </div>
  );
};

export default Home;
