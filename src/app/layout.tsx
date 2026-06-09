import type { ReactNode } from "react";
import "./globals.css";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-[#0a0a0a] text-white min-h-screen flex flex-col">
        {/* Navigation Bar */}
        <header className="sticky top-0 z-50 border-b border-white/5 bg-black/30 backdrop-blur-md px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight text-white">
              TEDx<span className="text-[#eb0028]">IITP</span>
            </span>
          </div>
          <span className="text-xs text-neutral-500 uppercase tracking-widest font-semibold">
            x = independently organized TED event
          </span>
        </header>

        {/* Page Content */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
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

