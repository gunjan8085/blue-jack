import { TestimonialSection, TestimonialItem } from "./Testimonial";

const posTestimonials: TestimonialItem[] = [
  {
    name: "Suresh Iyer",
    title: "Owner, CityMart",
    quote:
      "Zifypay's POS system is intuitive and fast. Our checkout lines are shorter and customers are happier!",
    img: "https://randomuser.me/api/portraits/men/81.jpg",
  },
  {
    name: "Anita Kapoor",
    title: "Manager, QuickShop",
    quote:
      "The reporting and inventory features are fantastic. We can make better business decisions every day.",
    img: "https://randomuser.me/api/portraits/women/82.jpg",
  },
  {
    name: "David Kim",
    title: "Franchise Owner, Pump&Go",
    quote:
      "Zifypay's support team is always there for us. The POS system is reliable and easy to use.",
    img: "https://randomuser.me/api/portraits/men/83.jpg",
  },
];

<TestimonialSection
  heading={
    <>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
        RETAILERS
      </span>{" "}
      RECOMMEND
      <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
        ZIFYPAY POS
      </span>
    </>
  }
  description="Retailers across the country are growing their business with Zifypay's modern POS system."
  testimonials={posTestimonials}
  accentFrom="from-blue-400"
  accentTo="to-cyan-400"
/>;
