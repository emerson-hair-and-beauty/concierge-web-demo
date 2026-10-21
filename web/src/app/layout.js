import { Inter } from "next/font/google";
import CssBaseline from "@mui/material/CssBaseline";
import ClientLayout from "./client-layout";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Concierge By Emerson",
  description:
    "This app helps you find the best hair care routine, and products for you.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Concierge",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2D5A4A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Concierge" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body style={{ backgroundColor: "#FDFCF9", padding: 0, margin: 0 }}>
        <CssBaseline />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
