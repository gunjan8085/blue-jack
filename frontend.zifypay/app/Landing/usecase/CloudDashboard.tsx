import { TestimonialSection, TestimonialItem } from "./Testimonial";

const cloudTestimonials: TestimonialItem[] = [
  {
    name: "Samantha Ray",
    title: "IT Lead, FuelPro",
    quote:
      "The Zifypay Cloud Dashboard gives us real-time insights and control over all our stations. It's a must-have for modern fuel businesses.",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rajesh Kumar",
    title: "Operations Manager, MetroFuel",
    quote:
      "Managing multiple locations is now effortless. The dashboard is intuitive and powerful.",
    img: "https://randomuser.me/api/portraits/men/61.jpg",
  },
  {
    name: "Emily Chen",
    title: "Owner, Chen's Gas & Go",
    quote:
      "I can check sales, inventory, and staff performance from anywhere. Zifypay's cloud tools are a game changer!",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

<TestimonialSection
  heading={
    <>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
        CLOUD DASHBOARD USERS
      </span>{" "}
      LOVE
      <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
        ZIFYPAY
      </span>
    </>
  }
  description="Discover how fuel retailers use Zifypay's cloud dashboard to streamline operations and boost efficiency."
  testimonials={cloudTestimonials}
  accentFrom="from-blue-400"
  accentTo="to-cyan-400"
/>;
