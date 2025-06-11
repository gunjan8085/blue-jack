import React from "react";

const About = React.forwardRef((props, ref) => {
  return (
    <div
      className="tw-container tw-mx-auto tw-my-8 tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8"
      ref={ref}
    >
      <div className="tw-px-12 tw-space-y-6">
        <h2 className="text-2xl tw-font-bold">About</h2>
        <p className="tw-my-4 text-sm">
          You Do You Hair Studio in Mumbai, located on Linking Road, offers a
          contemporary hairdressing experience tailored to your unique style.
          Specializing in trendsetting cuts, vibrant colors, and personalized
          styling, the studio provides a chic and welcoming environment. Enjoy
          expert care from skilled stylists who focus on creating a look that
          enhances your individuality and boosts your confidence.
        </p>
        <p>
          <span className="tw-font-semibold">Address:</span> Link Rose, Linking
          Road, 201A, Santacruz West, Mumbai, Maharashtra{" "}
          <a href="#" className="tw-text-blue-500">
            Get directions
          </a>
        </p>
      </div>
      <div>
        {/* Map Placeholder */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3778.4948805522727!2d73.6746187!3d18.731419400000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b1001536ae01%3A0x17c9c479bc52165b!2sShree%20Vishawnath%20Ayurvedic%20Clinic%20Va%20Panchkarma%20Center.!5e0!3m2!1sen!2sin!4v1738905084597!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Shree Vishwanath Ayurvedic Clinic And Panchkarma Center"
        ></iframe>
      </div>
    </div>
  );
});

export default About;
