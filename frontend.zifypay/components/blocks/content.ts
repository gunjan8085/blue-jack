export type AboutDemoContent = {
  subtitle: string;
  title: string;
  description: string;
  buttonText: string;
  images: string[];
};

export const aboutDemoContent: Record<string, AboutDemoContent> = {
  salons: {
    subtitle: "For Salons",
    title: "Transform Your Salon Experience",
    description:
      "Empower your salon with seamless online booking, client management, and marketing tools.",
    buttonText: "Book a Demo",
    images: [
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
    ],
  },
  "hair salons": {
    subtitle: "For Hair Salons",
    title: "Style Meets Technology",
    description:
      "Modernize your hair salon with digital scheduling and personalized client care.",
    buttonText: "Try Now",
    images: [
      "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    ],
  },
  barbershops: {
    subtitle: "For Barbershops",
    title: "Barber Innovation",
    description:
      "Attract more clients and manage your shop with ease using our all-in-one platform.",
    buttonText: "Get Started",
    images: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
    ],
  },
  "beauty salons": {
    subtitle: "For Beauty Salons",
    title: "Beauty, Booked Effortlessly",
    description:
      "Streamline your beauty salon operations and delight your clients with easy booking.",
    buttonText: "Start Free Trial",
    images: [
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
    ],
  },
  "nail salons": {
    subtitle: "For Nail Salons",
    title: "Nail Your Business Growth",
    description:
      "Boost bookings and manage your nail salon with ease and style.",
    buttonText: "See How",
    images: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
    ],
  },
  "tanning salons": {
    subtitle: "For Tanning Salons",
    title: "Glow Up Your Business",
    description:
      "Simplify scheduling and grow your tanning salon with our digital tools.",
    buttonText: "Get Started",
    images: [
      "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    ],
  },
  spas: {
    subtitle: "For Spas",
    title: "Relax, We Handle the Rest",
    description:
      "Let your spa thrive with our easy-to-use management tools and online booking.",
    buttonText: "Book a Demo",
    images: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
    ],
  },
  clinics: {
    subtitle: "For Clinics",
    title: "Clinic Management Made Simple",
    description:
      "Efficiently manage appointments and patient records with our platform.",
    buttonText: "Learn More",
    images: [
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
    ],
  },
  "dental clinics": {
    subtitle: "For Dental Clinics",
    title: "Brighten Your Practice",
    description: "Modern solutions for dental clinic scheduling and growth.",
    buttonText: "Try Now",
    images: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
    ],
  },
  "auto shops": {
    subtitle: "For Auto Shops",
    title: "Drive More Business",
    description:
      "Streamline your auto shop with our booking and management tools.",
    buttonText: "Get Started",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
    ],
  },
  "pet care": {
    subtitle: "For Pet Care",
    title: "Care for Pets, We Handle the Rest",
    description:
      "Manage appointments and grow your pet care business with ease.",
    buttonText: "Book a Demo",
    images: [
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518715308788-3005759c61d3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518715308788-3005759c61d3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
    ],
  },
  "bike shops": {
    subtitle: "For Bike Shops",
    title: "Pedal to Success",
    description: "Boost your bike shop with easy scheduling and management.",
    buttonText: "Try Now",
    images: [
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
    ],
  },
  "personal trainers": {
    subtitle: "For Personal Trainers",
    title: "Train Smarter, Not Harder",
    description: "Manage clients and sessions with our all-in-one platform.",
    buttonText: "Start Free Trial",
    images: [
      "https://images.unsplash.com/photo-1518715308788-3005759c61d3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
    ],
  },
  photographers: {
    subtitle: "For Photographers",
    title: "Picture Perfect Scheduling",
    description:
      "Book more shoots and manage your photography business with ease.",
    buttonText: "See How",
    images: [
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
    ],
  },
  "optical stores": {
    subtitle: "For Optical Stores",
    title: "See Your Business Grow",
    description:
      "Modernize your optical store with seamless appointment booking.",
    buttonText: "Get Started",
    images: [
      "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
    ],
  },
  "fuel pump": {
    subtitle: "For Fuel Pumps",
    title: "Fuel Up Your Business",
    description: "Efficient management for modern fuel stations.",
    buttonText: "Book a Demo",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
    ],
  },
  cstore: {
    subtitle: "For Cstores",
    title: "Convenience, Upgraded",
    description: "Grow your convenience store with our digital solutions.",
    buttonText: "Try Now",
    images: [
      "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
    ],
  },
  "retail store": {
    subtitle: "For Retail Stores",
    title: "Retail, Reimagined",
    description: "Boost sales and manage your retail store with ease.",
    buttonText: "Start Free Trial",
    images: [
      "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
    ],
  },
  default: {
    subtitle: "Innovate & Grow",
    title: "Scale Your Business Through Innovation",
    description:
      "Transform your startup's potential through innovative solutions and strategic growth. We help businesses adapt, evolve, and thrive in today's competitive marketplace.",
    buttonText: "Start Scaling Today",
    images: [
      "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
    ],
  },
};

export default aboutDemoContent;
