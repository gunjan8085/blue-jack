import Link from 'next/link'
import React from 'react'
import { FacebookIcon, InstagramIcon, YoutubeIcon, LinkedinIcon } from 'lucide-react'

const socialLinks = [
  { title: "Facebook", href: "https://www.facebook.com/profile.php?id=61573019611246", icon: FacebookIcon },
  { title: "Instagram", href: "https://www.instagram.com/zifypay?igsh=MTFkZmM0M20zYjV2Zw==", icon: InstagramIcon },
  { title: "Youtube", href: "https://www.youtube.com/watch?v=qjCH13g3wqY", icon: YoutubeIcon },
  { title: "LinkedIn", href: "https://www.linkedin.com/company/zifypay/posts/?feedView=all", icon: LinkedinIcon },
]

function Footer() {
  return (
   <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                {/* <Sparkles className="h-6 w-6 text-blue-400" /> */}
                <span className="text-xl font-bold">
                              <img src="https://res.cloudinary.com/dt07noodg/image/upload/v1748250920/Group_5_e01ync.png" alt=""  className="min-w-min h-10" />

                </span>
              </div>
              <p className="text-gray-400">Your trusted platform for beauty and wellness bookings.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Customers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="for-bussiness" className="hover:text-white transition-colors">
                    Find Services
                  </Link>
                </li>
                <li>
                  <Link href="/businesses" className="hover:text-white transition-colors">
                    Book Appointment
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Business</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link 
                  // onClick={()=> router.push('/auth/login')}
                  href="/for-bussiness" className="hover:text-white transition-colors">
                    List Your Business
                  </Link>
                </li>
                <li>
                  <Link href="/businesses" className="hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Analytics
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center space-x-6 mt-8 mb-4">
            {socialLinks.map(({ title, href, icon: Icon }, idx) => (
              <Link key={title} href={href} target="_blank" rel="noopener noreferrer" aria-label={title} className="hover:text-blue-400 transition-colors">
                <Icon className="h-6 w-6" />
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 zifypay.com. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer