import "~/styles/globals.css";
import Providers from "~/providers/query-provider";

export const metadata = {
  title: "Wikipedia on this day app",
  description: "A simple app to show the current Wikipedia article on a given day",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-brand_background text-brand_prose">
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
