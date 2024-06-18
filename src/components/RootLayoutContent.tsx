import { Montserrat as FontSans } from "next/font/google";

import { cn } from "~/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "min-h-screen bg-background font-sans antialiased font-semibold text-lg",
        fontSans.variable
      )}
    >
      {children}
    </div>
  );
}

export default RootLayoutContent;
