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
  title: "Nexamanga - Latest Manga, Manhwa, and Manhua Reader",
  description:
    "Nexamanga is an online manga reader providing the latest and greatest manga, manhwa, and manhua. Read your favorite comics online for free!",
  keywords: [
    "manga",
    "manhwa",
    "manhua",
    "online manga reader",
    "free manga",
    "Nexamanga",
    "latest manga",
  ],
  openGraph: {
    title: "Nexamanga - Online Manga Reader",
    description:
      "Read the latest manga, manhwa, and manhua on Nexamanga. Enjoy a wide selection of your favorite titles online.",
    url: "https://www.nexamanga.com",
    type: "website",
    images: [
      {
        url: "https://www.nexamanga.com/og-image.jpg",
        width: 800,
        height: 600,
        alt: "Nexamanga logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Nexamanga",
    title: "Nexamanga - Online Manga Reader",
    description:
      "Read the latest manga, manhwa, and manhua online. Nexamanga provides a vast library of popular titles.",
    images: ["https://www.nexamanga.com/twitter-image.jpg"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://www.nexamanga.com" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`antialiased ${kanit.variable} ${montserrat.variable} ${anton.variable}`}
      >
        <Providers>
          <header>
            <Header />
          </header>
          <main>{children}</main>
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
