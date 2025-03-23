import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

import { Toaster } from "@/components/ui/toaster";

import NextTopLoader from "nextjs-toploader";
import Header from "@/components/ui/Header";

const AntonSC = localFont({
  src: "./fonts/Tanker_Complete/Fonts/OTF/Tanker-Regular.otf",
  variable: "--font-antonsc",
  weight: "100 900",
});
const SCHABO = localFont({
  src: "./fonts/SCHABO-Condensed.woff",
  variable: "--font-schabo",
  weight: "100 900",
});
const W95FA = localFont({
  src: "./fonts/W95FA/W95FA/w95fa.woff",
  variable: "--font-w95fa",
  weight: "100 900",
});
const RobotoCondensed = localFont({
  src: "./fonts/RobotoCondensed-VariableFont_wght.ttf",
  variable: "--font-robotorondensed",
  weight: "100 900",
});
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const Walkway = localFont({
  src: "./fonts/Walkway/Walkway_UltraBold.ttf",
  variable: "--font-walkway",
  weight: "100 900",
});
export const metadata: Metadata = {
  title: "Talent Track",
  description: "Track and manage talent efficiently",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${Walkway.variable} ${W95FA.variable} ${SCHABO.variable} ${geistSans.variable} ${geistMono.variable} ${AntonSC.variable} ${RobotoCondensed.variable} bg-cover bg-no-repeat  font-antonsc  relative antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader
            color="#dc2626"
            initialPosition={0.08}
            crawlSpeed={200}
            height={2}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
            zIndex={1600}
            showAtBottom={false}
          />
          <Header />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
