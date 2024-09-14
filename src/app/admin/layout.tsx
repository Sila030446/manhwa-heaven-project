import type { Metadata } from "next";

import "../globals.css";
import { Providers } from "../providers";
import Sidebar from "../components/Sidebar";
import SidebarItems from "../components/SidebarItems";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Providers>
          <div className="flex">
            <div>
              <Sidebar>
                <div className="flex flex-col w-full">
                  <SidebarItems />
                </div>
              </Sidebar>
            </div>
            <div>{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
