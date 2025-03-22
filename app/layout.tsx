import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
import Header from "@/components/ui/Header";
import localFont from "next/font/local";

// Import Local Fonts with All Weights
const inter = localFont({
  src: [
    {
      path: "./fonts/inter/Inter_28pt-Thin.ttf",
      weight: "100",
      style: "normal",
    }, // Thin
    {
      path: "./fonts/inter/Inter_28pt-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    }, // Extra Light
    {
      path: "./fonts/inter/Inter_28pt-Light.ttf",
      weight: "300",
      style: "normal",
    }, // Light
    {
      path: "./fonts/inter/Inter_28pt-Regular.ttf",
      weight: "400",
      style: "normal",
    }, // Regular
    {
      path: "./fonts/inter/Inter_28pt-Medium.ttf",
      weight: "500",
      style: "normal",
    }, // Medium
    {
      path: "./fonts/inter/Inter_28pt-SemiBold.ttf",
      weight: "600",
      style: "normal",
    }, // SemiBold
    {
      path: "./fonts/inter/Inter_28pt-Bold.ttf",
      weight: "700",
      style: "normal",
    }, // Bold
    {
      path: "./fonts/inter/Inter_28pt-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    }, // ExtraBold
    {
      path: "./fonts/inter/Inter_28pt-Black.ttf",
      weight: "900",
      style: "normal",
    }, // Black
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Talent Track",
  description: "Track and manage talent efficiently",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.className}  relative bg-cover bg-no-repeat font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Next.js Page Loader with Spinner Overlay */}
          <NextTopLoader
            color="#2299DD"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD, 0 0 5px #2299DD"
          />

          {/* Header */}
          <Header />

          {/* Page Content */}
          <main>{children}</main>

          {/* Toast Notifications */}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
