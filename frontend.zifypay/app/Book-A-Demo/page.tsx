"use client";

import type React from "react";
import { MonitorCheck } from "lucide-react";
import { useState } from "react";
import { posDevices } from "@/lib/constants";
import { countries } from "@/lib/constants";
import { FAQ_ITEMS } from "@/lib/constants";
import {
  Card,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import Navbar from "@/components/landingPage/Navbar";
export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  const router = useRouter()
  


  const [openedItem, setOpenedItem] = useState<number | null>(null);


  const toggleFAQ = (index: number) => {
    setOpenedItem(openedItem === index ? null : index);
  }; 

 const [loading, setLoading] = useState(false);

 const [formData, setFormData] = useState({
  name: "",
  phone: "",
  email: "",
  companyName: "",
  location: "",
  businessType: "",
  acceptsCards: "",
  country: "",         // 🆕 User enters country name
  countryCode: "IN",   // ISO (used in API)
  dialCode: "+91"      // Dial code (optional usage)
});



const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
  e.preventDefault();
  setLoading(true);

  const requiredFields: (keyof typeof formData)[] = [
    'name',
    'email',
    'phone',
    'companyName',
    'location',
    'businessType',
    'acceptsCards'
  ];

  const missingFields = requiredFields.filter(
    (field) => !formData[field] || formData[field].trim().length < 2
  );

  const isEmailValid: boolean = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isPhoneValid: boolean = /^[0-9+\-\s()]{7,15}$/.test(formData.phone);

  if (missingFields.length > 0) {
    alert(`Please fill in all the fields correctly: ${missingFields.join(', ')}`);
    setLoading(false);
    return;
  }

  if (!isEmailValid) {
    alert("Please enter a valid email address.");
    setLoading(false);
    return;
  }

  if (!isPhoneValid) {
    alert("Please enter a valid phone number.");
    setLoading(false);
    return;
  }
  // dev uri 
  // const apiUrl = "http://localhost:5000/api/v1/submit-lead-and-checkout";

  // prod uri 
  const apiUrl = "https://api.pos.zifypay.com/api/v1/submit-lead-and-checkout";

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const leadData = {
    data: [
      {
        Last_Name: formData.name.trim(),
        Email: formData.email.trim(),
        Phone: formData.phone.trim(),
        Company: formData.companyName.trim(),
        City: formData.location.trim(),
        Description: `Business Type: ${formData.businessType.trim()}, Accepts Cards: ${formData.acceptsCards}`,
        Lead_Source: "Website Form",
      },
    ],
  };

  // Step 1: Validate phone format
    if (!isPhoneValid) {  
      alert("Please enter a valid phone number.");
      setLoading(false);
      return;
    }

    // Step 2: Check actual phone validity from API
    try {
      // const verifyResponse = await fetch(`http://localhost:5000/api/v1/verify_number?number=${formData.phone}&countryCode=${formData.countryCode}`);
      const verifyResponse = await fetch(`https://api.pos.zifypay.com/api/v1/verify_number?number=${formData.phone}&countryCode=${formData.countryCode}`);

      const verifyData = await verifyResponse.json();

      if (!verifyData.valid) {
        alert("This phone number does not appear to be valid. Please check and try again.");
        setLoading(false);
        return;
      }
    } catch (verifyError) {
      console.error("Phone verification failed:", verifyError);
      alert("Could not verify phone number. Please try again later.");
      setLoading(false);
      return;
    }


    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(leadData),
      });
  
      const data = await response.json();
      console.log("Response from submit-lead-and-checkout:", data);
  
      if (data?.checkoutUrl) {
        // ✅ Redirect to Stripe checkout page
        window.location.href = data.checkoutUrl;
      } else {
        alert("Submission successful, but Stripe checkout could not be initiated.");
      }
    } catch (error) {
      console.error("Error submitting to API:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
};




  const Spinner = () => (
    <svg
      className="animate-spin h-4 w-4 text-white mr-2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
      ></path>
    </svg>
  );
  
  

  return (
    <>
<Navbar/>
      <div className="min-h-screen bg-blue-600 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-8 mt-28">
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-[#bdff23] text-3xl md:text-7xl">
                Lifetime free
              </span>{" "}
              <span className="text-white text-3xl md:text-7xl">Access $0</span>
            </h1>
            <h2 className="text-3xl font-bold">
              <span className="text-white text-3xl md:text-7xl">
                {" "}
                Processing
              </span>{" "}
              <span className="text-[#bdff23] text-3xl md:text-7xl">
                Fees POS
              </span>{" "}
              <span className="text-white text-3xl md:text-7xl">
                {" "}
                <br /> Terminal
              </span>
            </h2>
           
          </div>

          <div className="flex flex-col md:flex-row gap-[41px] mt-32 mb-12">
            {/* Registration Form */}
            <div
              className=" rounded-lg p-6 w-full md:w-5/12 bg-white"
              // style={{ backgroundImage: "url('/form.jpg')" }}
            >
              <h3 className="text-lg font-bold mb-4">Register Your Business</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="mb-2 block">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="mb-2 block">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="country" className="mb-2 block">
                    Country
                  </Label>
                  <Input
                    id="country"
                    placeholder="Type your country"
                    value={formData.country}
                    onChange={(e) => {
                      const countryName = e.target.value;
                      const match = countries.find(c =>
                        c.name.toLowerCase().includes(countryName.toLowerCase())
                      );

                      if (match) {
                        setFormData({
                          ...formData,
                          country: countryName,
                          countryCode: match.code,
                          dialCode: match.dial_code
                        });
                      } else {
                        setFormData({ ...formData, country: countryName });
                      }
                    }}
                  />
                </div>



                <div>
                  <Label htmlFor="email" className="mb-2 block">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="companyName" className="mb-2 block">
                    Company Name
                  </Label>
                  <Input
                    id="companyName"
                    placeholder="Enter your Company Name"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="location" className="mb-2 block">
                    Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="Enter your location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">
                      What type of business do you operate?
                    </Label>
                    <RadioGroup
                      value={formData.businessType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, businessType: value })
                      }
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="retail" id="retail" />
                        <Label htmlFor="retail" className="text-xs">
                          Retail
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="restaurant" id="restaurant" />
                        <Label htmlFor="restaurant" className="text-xs">
                          Restaurant
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="service" id="service" />
                        <Label htmlFor="service" className="text-xs">
                          Service
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other" className="text-xs">
                          Other
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-sm">
                      Do you accept credit/ debit card payments?
                    </Label>
                    <RadioGroup
                      value={formData.acceptsCards}
                      onValueChange={(value) =>
                        setFormData({ ...formData, acceptsCards: value })
                      }
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="yes" />
                        <Label htmlFor="yes" className="text-xs">
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="no" />
                        <Label htmlFor="no" className="text-xs">
                          No
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="text-xs">
                  <p>Specific Requirements</p>
                </div>

                <Button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading && <Spinner />}
                {loading ? "Submitting..." : "ZifyPay $1 Demo Booking"}
              </Button>



              </form>
            </div>

            {/* Video section - properly implemented */}
            <div className="bg-gray-100 rounded-lg w-full md:w-7/12 flex items-center justify-center mb-36 overflow-hidden">
              <video 
                className="w-full h-full object-cover"
                controls
                autoPlay
                loop
              >
                <source src="/pay.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
      {/* section -2 */}
      <div className="flex items-center justify-center min-h-screen bg-white relative p-8 overflow-hidden ">
        {/* Larger blue circle in center */}
        <div className="absolute w-[400px] h-[400px] bg-blue-600 rounded-full z-0 transform scale-150"></div>

        {/* Cards container with improved width and responsiveness */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 z-10 relative w-full max-w-6xl mx-12  ">
        

          {/* right card (black) now second/right */}
          <div className="bg-black text-white rounded-lg shadow-lg p-8 w-full border-2 border-blue-600">
            <h2 className="text-3xl font-bold mb-8 text-center">
              ZifyPay 0% Processing
            </h2>

            <div className="space-y-6">
              <div className="flex justify-between text-xl">
                <span>Interchange Fee : </span>
                {/* <span>-</span> */}
                <span className="font-bold">0%</span>
              </div>

              <div className="flex justify-between text-xl">
                <span>Transaction Fee : </span>
                {/* <span>-</span> */}
                <span className="font-bold">$0.00</span>
              </div>

              <div className="flex justify-between text-xl">
                <span>Authorization Fee : </span>
                {/* <span>-</span> */}
                <span className="font-bold">$0.00</span>
              </div>

              <div className="flex justify-between text-xl">
                <span>Statement Fee : </span>
                {/* <span>-</span> */}
                <span className="font-bold">$0/mo</span>
              </div>

              <div className="flex justify-between text-xl">
                <span>Monthly Minimum : </span>
                {/* <span>-</span> */}
                <span className="font-bold">$0/mo</span>
              </div>

              <div className="flex justify-between text-xl">
                <span>Online Access Fee : </span>
                {/* <span>-</span> */}
                <span className="font-bold">$0/mo</span>
              </div>
            </div>

            <div className="mt-8 text-center font-semibold text-2xl">
              No Junk Fees
            </div>
          </div>

           {/* left card (white) now first/left */}
           <div className="bg-white text-blue-900 rounded-lg shadow-lg p-8 w-full border-2 border-blue-600">
            <h2 className="text-3xl font-bold mb-8 text-center  ">
              Traditional Processing
            </h2>

            <div className="space-y-6">
              <div className="flex justify-between text-xl">
                <span>of Gross Interchange Fee : </span>
                {/* <span></span> */}
                <span className="font-bold">2%-4%</span>
              </div>

              <div className="flex justify-between text-xl">
                <span>Transaction Fee : </span>
                {/* <span>-</span> */}
                <span className="font-bold">$0.05-$0.25</span>
              </div>

              <div className="flex justify-between text-xl">
                <span>Authorization Fee : </span>
                {/* <span>-</span> */}
                <span className="font-bold">$0.05-$0.25</span>
              </div>

              <div className="flex justify-between text-xl">
                <span>Statement Fee : </span>
                {/* <span>-</span> */}
                <span className="font-bold">$5-$10/mo</span>
              </div>

              <div className="flex justify-between text-xl">
                <span>Monthly Minimum : </span>
                {/* <span>-</span> */}
                <span className="font-bold">$25-$50/mo</span>
              </div>

              <div className="flex justify-between text-xl">
                <span>Online Access Fee : </span>
                {/* <span>-</span> */}
                <span className="font-bold">$3-$15/mo</span>
              </div>

              <div className="flex justify-between text-xl">
                <span>Junk Fees : </span>
                {/* <span>-</span> */}
                <span className="font-bold">$1-$199/mo</span>
              </div>
            </div>
          </div>  
          

        

          
        </div>

      
         



      </div>



      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          window.scrollTo({ top: 10, behavior: 'smooth' });

        }}
              style={{
          color: 'white',
          fontWeight: 600,
          borderRadius: '0.5rem',
          backgroundColor: '#2563eb',
          textAlign: 'center',
          cursor: 'pointer',
          fontFamily: 'sans-serif',
          transition: 'all 0.3s ease-in-out',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          animation: isHovered ? 'jugnu-blink 1.2s infinite ease-in-out' : 'none',
        }}
        className={`w-[90%] md:w-[50%] 
          ml-[5%] md:ml-[25%] 
          font-bold 
          text-lg md:text-2xl 
          px-4 md:px-6 py-4 
          rounded-lg 
          hover:bg-blue-700 
          focus:outline-none 
          transition duration-300 
          mb-10`}
      >
        &nbsp;&nbsp; Get 1% Kickback
        <br />
        Order Your POS Terminal now
      </div>

      <style jsx>{`
        @keyframes jugnu-blink {
          0%,
          100% {
            box-shadow: 0 0 5px #3b82f6, 0 0 10px #3b82f6, 0 0 15px #3b82f6;
          }
          50% {
            box-shadow: 0 0 15px #2563eb, 0 0 30px #2563eb, 0 0 45px #2563eb;
          }
        }
      `}</style>


      {/* section -3 */}
      <div 
       style={{
        backgroundImage: `url(${"/Untitled/4.png"})`,
      }}
      className="bg-blue-600 min-h-screen p-4">
        <div className="max-w-5xl mx-auto mt-24">
          {/* Card Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {posDevices
              .slice() // Creates a shallow copy to avoid mutating the original array
              .reverse()
              .map((device, index) => (
                <Card
                  key={index}
                  className="bg-white rounded-lg overflow-hidden border-0 shadow-xl"
                >
                  {/* Price Badge & Image Section */}
                  <div className="relative bg-white h-40 flex items-center px-4 border-2 border-gray-50 shadow-2xl shadow-gray-100 p-4">
                    <Badge className="absolute h-full left-3 bg-blue-600 text-white text-5xl font-bold  rounded-md">
                      {device.price}
                    </Badge>
                    <div className="flex-1"></div>{" "}
                    {/* Push image to the right */}
                    <img
                      src={device.image}
                      alt={device.name}
                      className="h-32 w-32 md:h-48 md:w-40 object-contain"
                    />
                  </div>

                  {/* Device Name */}
                  <div className="text-center pt-4 pb-2">
                    <h3 className="text-lg font-bold">{device.name}</h3>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-0 px-4 pb-4">
                    {device.features.map((feature, i) => (
                      <div
                        key={i}
                        className="border-t border-r last:border-r-0 even:border-r-0 border-gray-200 p-3"
                      >
                        <div className="flex justify-center mb-1">
                          <MonitorCheck className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-sm text-center text-gray-700">
                          {feature.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </div>
      {/* section 4 */}
      <div className="bg-blue-600 min-h-screen p-4 text-white ">
        <div className="max-w-6xl mx-4 md:mx-48  mt-24">
          {/* Header Section */}
          <div className="pt-6 pb-4">
            <div className="flex flex-col md:flex-row gap-8  mt-8">
              <div className="md:w-2/3">
                <p className="uppercase text-2xl font-semibold tracking-wider">
                  START WITH ZERO COST
                </p>
                <h1 className="text-4xl font-bold mt-2 mb-2">
                  Bring your own Device
                  <br />
                  Program (BYOD)
                </h1>
                <p className="text-xl mb-6 mt-8">
                  A BYOD (Bring Your Own Device) POS refers to a point-of-sale
                  system where a business owner can use their personal
                  smartphone or tablet (their device) as the primary terminal to
                  accept customer payments, by utilizing a downloadable
                  application along with optional hardware accessories,
                  effectively turning their device into a portable POS system.
                </p>

                <div className="flex flex-wrap gap-x-8 gap-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <span>No dedicated hardware</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <span>Mobile app functionality</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <span>Bluetooth card reader</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <span>Cost-effective</span>
                  </div>
                </div>
              </div>

              <div className="md:w-1/3 flex justify-center">
                <div className="relative h-[26rem] w-52">
                  <div className="rounded-lg shadow-lg">
                    <img src="/FAq.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white text-black rounded-xl p-6  md:mx-6 mt-24">
            <h2 className="text-blue-600 text-2xl font-bold text-center mb-6">
              FAQ
            </h2>
            <div className="space-y-2">
              {FAQ_ITEMS.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    className="w-full text-left p-4 flex justify-between items-center"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="font-medium">{item.question}</span>
                    <span className="text-gray-500 text-xl">
                      {openedItem === index ? "−" : "+"}
                    </span>
                  </button>

                  {openedItem === index && (
                    <div className="p-4 pt-0 border-t border-gray-200">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}