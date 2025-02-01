import "./globals.css";

import type {Metadata} from "next";

import {Roboto} from 'next/font/google';

import {Toaster} from "@/components/ui/toaster";
import {SheetProvider} from "@/providers/sheet-provider";
import {ThemeProvider} from "@/providers/theme-provider";

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Start Page - Personalize Your Browsing Experience",
  description: "Create your own personalized start page with our customizable features. Access your favorite links in one place!",
  keywords: "customizable start page, personalized homepage, browser start page, favorite links, widgets, tools",
  icons: [{rel: "image/png", url: "/favicon.png"}],
  authors: {
    name: "Diego Rezende",
    url: "https://github.com/diegorezm"
  },
  openGraph: {
    title: "Customizable Start Page - Personalize Your Browsing Experience",
    description: "Create your own personalized start page with our customizable features. Access your favorite links in one place!",
    url: "https://diegorezm-start-page.netlify.app/",
    siteName: "Start page",
    images: [
      {
        url: "https://diegorezm-start-page.netlify.app/og.png",
        width: 800,
        height: 600,
        alt: "A preview of the customizable start page",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Toaster />
        <SheetProvider />
      </body>
    </html>
  );
}
