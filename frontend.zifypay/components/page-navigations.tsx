"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function PageNavigation() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 p-2 hover-glow">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Button
              variant={pathname === "/" ? "default" : "ghost"}
              size="sm"
              className="rounded-full transition-all duration-300 hover:scale-105"
            >
              Business Platform
            </Button>
          </Link>
          <Link href="/general-store">
            <Button
              variant={pathname === "/general-store" ? "default" : "ghost"}
              size="sm"
              className="rounded-full transition-all duration-300 hover:scale-105"
            >
              General Store POS
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
