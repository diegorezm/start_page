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
  title: "Start page",
  description: "Start page",
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
