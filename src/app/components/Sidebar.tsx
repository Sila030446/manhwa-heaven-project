"use client";
import { Avatar, Button } from "@nextui-org/react";
import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createContext, useState, ReactNode, useContext } from "react";

type SidebarContextType = {
  expanded: boolean;
};

const SidebarContext = createContext<SidebarContextType>({ expanded: true });

const Sidebar = ({ children }: { children: ReactNode }) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <aside className="h-[100vh] sticky top-0 z-50">
      <nav className="h-full flex flex-col bg-default-50 border-r dark:border-gray-900 shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <Image
            src={"https://img.logoipsum.com/243.svg"}
            alt="logo"
            width={500}
            height={500}
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
          />
          <Button
            isIconOnly
            className="bg-default-100"
            aria-label="Toggle"
            onPress={() => setExpanded((curr) => !curr)}
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </Button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 flex p-3">{children}</ul>
        </SidebarContext.Provider>
        <div className="border-t dark:border-default-200 flex p-3">
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-default-600">
                johndoe@gmail.com
              </span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;

// Corrected SidebarItem component
export function SidebarItem({
  icon,
  text,
  active,
  alert,
  href,
}: {
  icon: JSX.Element;
  text: string;
  active?: boolean;
  alert?: boolean;
  href: string;
}) {
  const { expanded } = useContext(SidebarContext);
  return (
    <Link href={href}>
      <li
        className={`
    relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
      active
        ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
        : "hover:bg-transparent text-default-900"
    }`}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}
        {!expanded && (
          <div
            className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-default-100 text-default-900 text-sm invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-50`}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}
