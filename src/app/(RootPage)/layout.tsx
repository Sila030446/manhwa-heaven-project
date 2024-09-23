import type { Metadata } from "next";
import { Anton, Kanit, Montserrat } from "next/font/google";
import "../globals.css";
import { Providers } from "../providers";
import Header from "../components/user-ui/Header";

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-Anton",
});

const kanit = Kanit({
  subsets: ["thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-kanit",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexamanga",
  description:
    "Nexamanga is an online manga reader that provides the latest and greatest manga,manhwa and manhua for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${kanit.variable} ${montserrat.variable} ${anton.variable}`}
      >
        <Providers>
          <Header />
          {children}
          <footer className="px-4 py-4 w-full bg-gray-500">
            <p className="text-center">
              © 2024 Nexamanga. All rights reserved.
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
