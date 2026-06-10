import type { ReactNode } from "react";
import "./globals.css";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-[#0a0a0a] text-white min-h-screen flex flex-col">
       

        {/* Page Content */}
        <main className=" w-full">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 py-8 text-center text-sm text-neutral-500 bg-black/40">
          <p>© {new Date().getFullYear()} TEDxIITP. This independent TEDx event is operated under license from TED.</p>
        </footer>
      </body>
    </html>
  );
}