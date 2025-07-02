import Link from 'next/link'
import React from 'react'
import { Search, Star, MapPin, Users, Calendar, ArrowRight, Sparkles } from "lucide-react"
import { Button } from './ui/button'

function CTA() {
  return (
  <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of satisfied customers</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                       <Link href={"/businesses"}>

            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              <Users className="mr-2 h-5 w-5" />
              View Businesses
            </Button>
</Link>
            <Link href={"/for-bussiness"}>
            <Button
              // onClick={() => router.push('/auth/login')}
              size="lg"
              variant="outline"
              className="border-white  hover:bg-white hover:text-blue-600 text-blue-500"
            >
              <Calendar className="mr-2 h-5 w-5 text-blue-500"  />
              List Your Business
            </Button>
            </Link>
          </div>
        </div>
      </section>
  )
}

export default CTA