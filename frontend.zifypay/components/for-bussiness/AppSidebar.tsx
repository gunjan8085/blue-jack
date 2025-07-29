"use client"
import { useRouter } from "next/navigation"
import { LogOut, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarContent as UISidebarContent,
  useSidebar,
} from "@/components/ui/sidebar"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { sidebarItems } from "@/lib/sidebar-routes"
import { useMobile } from "@/hooks/use-mobile"

export default function AppSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const { setOpenMobile, openMobile } = useSidebar()
  const isMobile = useMobile()

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("jwt")
    localStorage.removeItem("twilio_identity")
    localStorage.clear()
    localStorage.removeItem("token")

    // Clear cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
    })

    // Redirect to login
    router.push("/")
  }

  const SidebarContent = () => (
    <>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center justify-between px-2 py-2">
          <div className="flex items-center space-x-2">
            <img
              src="https://res.cloudinary.com/dt07noodg/image/upload/v1748250920/Group_5_e01ync.png"
              alt="ZifyPay Logo"
              className="h-8 w-auto"
            />
          </div>
          {isMobile && (
            <Button variant="ghost" size="icon" className="h-8 w-8 md:hidden" onClick={() => setOpenMobile(false)}>
            </Button>
          )}
        </div>
      </SidebarHeader>

      <UISidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Business Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    onClick={() => isMobile && setOpenMobile(false)}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </UISidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="p-2">
          <Button variant="destructive" size="sm" className="w-full" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </>
  )

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent side="left" className="w-[280px] p-0 bg-sidebar border-r-sidebar-border">
          <VisuallyHidden>
            <SheetTitle>Navigation Menu</SheetTitle>
          </VisuallyHidden>
          <div className="flex h-full w-full flex-col">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Sidebar>
      <SidebarContent />
    </Sidebar>
  )
}
