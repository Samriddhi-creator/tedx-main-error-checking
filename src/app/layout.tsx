import type { ReactNode } from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import "./globals.css";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-[#0a0a0a] text-white min-h-screen flex flex-col">
        {/* Navigation Bar */}
        <Navbar />
        {/* Page Content */}
        <main className="flex-1 w-full px-6 py-8">
          {children}
        </main>
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}