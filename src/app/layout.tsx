import type { ReactNode } from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import "./globals.css";

interface Props {
  readonly children: ReactNode;
}

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas', 
});

const cormorant = Cormorant({
  subsets: ['latin'],
  variable: '--font-cormorant',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space', 
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning className={`${bebasNeue.variable} ${cormorant.variable} ${spaceGrotesk.variable}`}>
      <body suppressHydrationWarning className={`bg-[#0a0a0a] bg-[url('/bg1.png')] bg-repeat bg-top bg-left text-white min-h-screen flex flex-col`}>
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