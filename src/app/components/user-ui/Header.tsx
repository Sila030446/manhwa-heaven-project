"use client";
import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
import { FcEnteringHeavenAlive } from "react-icons/fc";
import { CiBookmark } from "react-icons/ci";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { Bungee } from "next/font/google";
import Link from "next/link";

import SearchInput from "../SearchInput";

// กำหนดฟอนต์ Kanit

const bungee = Bungee({
  subsets: ["latin"],
  weight: ["400"],
});

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { title: "หน้าหลัก", href: "/" },
    { title: "อ่านมังงะ", href: "/manga" },
    { title: "อ่านมันฮวา", href: "/manhwa" },
    { title: "Bookmarks", href: "/bookmarks", Icon: <CiBookmark /> },
  ];

  return (
    <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen} maxWidth="xl">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href={"/"} className="flex items-center justify-center">
            <FcEnteringHeavenAlive size={48} />
            <p className={` font-bold text-inherit ${bungee.className}`}>
              MANHWA-HEAVEN
            </p>
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((menuItem) => (
            <NavbarMenuItem key={menuItem.title}>
              <Link color="foreground" href={menuItem.href}>
                <Button
                  variant="light"
                  className={`flex items-center justify-center gap-0.5 font-Kanit text-base`}
                >
                  {menuItem.title}
                  {menuItem.Icon ? menuItem.Icon : null}
                </Button>
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarContent>
      </NavbarContent>

      <NavbarContent justify="end" className="items-center gap-4">
        {/* Improved Search Bar */}
        <NavbarItem className="hidden md:flex w-full max-w-[300px]">
          <SearchInput />
        </NavbarItem>

        {/* Theme Switcher */}
        <NavbarItem className="flex items-center justify-between">
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" href={item.href}>
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
        <SearchInput />
      </NavbarMenu>
    </Navbar>
  );
}
