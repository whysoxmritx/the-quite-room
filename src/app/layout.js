import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import GlobalShell from "@/components/GlobalShell";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata = {
  title: "The Quiet Room",
  description: "A Field Guide to Grounding",
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#080B14",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} bg-void text-text-main min-h-screen flex flex-col antialiased`}>
        <GlobalShell>
          {children}
        </GlobalShell>

        {/* Background Ambient Effects */}
        {/* Background Ambient Effects moved to GlobalShell */}
      </body>
    </html>
  );
}