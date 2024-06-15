import "~/styles/globals.css";
import { Montserrat as FontSans } from "next/font/google"

import { cn } from "~/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "Wikipedia on this day app",
  description: "A simple app to show the current Wikipedia article on a given day",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-brand_background text-brand_prose">
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased font-semibold text-lg",
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
