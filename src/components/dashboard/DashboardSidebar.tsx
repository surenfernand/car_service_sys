import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Users,
  Car,
  Wrench,
  Bell,
  Settings,
  LogOut,
  BarChart3,
  Calendar,
} from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

interface DashboardSidebarProps {
  userRole?: "admin" | "staff";
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

const NavItem = ({ icon, label, href, active = false }: NavItemProps) => {
  return (
    <Link to={href} className="block">
      <Button
        variant={active ? "secondary" : "ghost"}
        className={`w-full justify-start mb-1 ${active ? "bg-secondary" : ""}`}
      >
        <div className="flex items-center">
          <span className="mr-2">{icon}</span>
          <span>{label}</span>
        </div>
      </Button>
    </Link>
  );
};

const DashboardSidebar = ({
  userRole = "admin",
  userName = "John Doe",
  userEmail = "john@example.com",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
}: DashboardSidebarProps) => {
  // Determine which path is active (in a real app, this would use router state)
  const activePath = "/dashboard";

  return (
    <div className="w-[280px] h-full bg-background border-r flex flex-col">
      {/* Logo and branding */}
      <div className="p-6">
        <h1 className="text-xl font-bold flex items-center">
          <Car className="mr-2" />
          <span>AutoService</span>
        </h1>
      </div>

      {/* User profile section */}
      <div className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>
              {userName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{userName}</p>
            <p className="text-xs text-muted-foreground">{userEmail}</p>
            <p className="text-xs text-muted-foreground capitalize">
              {userRole}
            </p>
          </div>
        </div>
      </div>

      <Separator className="my-2" />

      {/* Navigation */}
      <div className="flex-1 px-4 py-2 overflow-auto">
        <nav className="space-y-1">
          <NavItem
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            href="/dashboard"
            active={activePath === "/dashboard"}
          />
          <NavItem
            icon={<Users size={18} />}
            label="Customers"
            href="/customers"
            active={activePath === "/customers"}
          />
          <NavItem
            icon={<Car size={18} />}
            label="Vehicles"
            href="/vehicles"
            active={activePath === "/vehicles"}
          />
          <NavItem
            icon={<Wrench size={18} />}
            label="Services"
            href="/services"
            active={activePath === "/services"}
          />
          <NavItem
            icon={<Calendar size={18} />}
            label="Schedule"
            href="/schedule"
            active={activePath === "/schedule"}
          />
          <NavItem
            icon={<Bell size={18} />}
            label="Notifications"
            href="/notifications"
            active={activePath === "/notifications"}
          />

          {/* Admin-only menu items */}
          {userRole === "admin" && (
            <>
              <Separator className="my-4" />
              <p className="text-xs font-medium text-muted-foreground mb-2 px-2">
                ADMIN
              </p>
              <NavItem
                icon={<BarChart3 size={18} />}
                label="Reports"
                href="/reports"
                active={activePath === "/reports"}
              />
              <NavItem
                icon={<Users size={18} />}
                label="Staff Management"
                href="/staff"
                active={activePath === "/staff"}
              />
              <NavItem
                icon={<Settings size={18} />}
                label="System Settings"
                href="/settings"
                active={activePath === "/settings"}
              />
            </>
          )}
        </nav>
      </div>

      {/* Logout button */}
      <div className="p-4 mt-auto">
        <Button variant="outline" className="w-full justify-start">
          <LogOut size={18} className="mr-2" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
