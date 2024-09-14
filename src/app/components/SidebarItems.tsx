"use client";
import {
  BarChart3,
  LayoutDashboard,
  LifeBuoy,
  Settings,
  UserCircle,
} from "lucide-react";
import { SidebarItem } from "./Sidebar";
import { usePathname } from "next/navigation";

const SidebarItems = () => {
  const pathname = usePathname(); // Get the current path

  return (
    <div>
      <SidebarItem
        href="/admin/dashboard"
        icon={<LayoutDashboard size={20} />}
        text="Dashboard"
        alert
        active={pathname === "/admin/dashboard"} // Check if current path is active
      />
      <SidebarItem
        href="/admin/scrape-data"
        icon={<BarChart3 size={20} />}
        text="ScrapeData"
        active={pathname === "/admin/scrape-data"} // Check if current path is active
      />
      <SidebarItem
        href="/admin/users"
        icon={<UserCircle size={20} />}
        text="Users"
        active={pathname === "/admin/users"} // Check if current path is active
      />

      <hr className="my-3" />
      <SidebarItem
        href="/"
        icon={<Settings size={20} />}
        text="Settings"
        active={pathname === "/settings"} // Modify as needed for the correct path
      />
      <SidebarItem
        href="/"
        icon={<LifeBuoy size={20} />}
        text="Help"
        active={pathname === "/help"} // Modify as needed for the correct path
      />
    </div>
  );
};

export default SidebarItems;
