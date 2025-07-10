import { TestimonialSection, TestimonialItem } from "./Testimonial";

const secureTestimonials: TestimonialItem[] = [
  {
    name: "Ravi Desai",
    title: "Owner, SafeFuel",
    quote:
      "Zifypay's secure payment system gives our customers peace of mind. Transactions are fast and reliable.",
    img: "https://randomuser.me/api/portraits/men/71.jpg",
  },
  {
    name: "Linda Gomez",
    title: "Manager, Trusty Gas",
    quote:
      "We never worry about payment security anymore. Zifypay's fraud protection is top-notch.",
    img: "https://randomuser.me/api/portraits/women/72.jpg",
  },
  {
    name: "Mohammed Ali",
    title: "Director, SecurePump",
    quote:
      "Our business reputation has improved thanks to Zifypay's secure payment features.",
    img: "https://randomuser.me/api/portraits/men/73.jpg",
  },
];

<TestimonialSection
  heading={
    <>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
        SECURE PAYMENTS
      </span>{" "}
      WITH
      <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
        ZIFYPAY
      </span>
    </>
  }
  description="See why fuel retailers trust Zifypay for secure, seamless payment processing."
  testimonials={secureTestimonials}
  accentFrom="from-blue-400"
  accentTo="to-cyan-400"
/>;
