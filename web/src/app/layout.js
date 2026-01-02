import { Inter } from "next/font/google";
import CssBaseline from "@mui/material/CssBaseline";

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body style={{ backgroundColor: "#FDFCF9", padding: 0, margin: 0 }}>
        <CssBaseline />
        {children}
      </body>
    </html>
  );
}
