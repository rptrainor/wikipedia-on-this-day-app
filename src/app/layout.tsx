import "~/styles/globals.css";

import RootLayoutContent from "~/components/RootLayoutContent";

export const metadata = {
  title: "Wikipedia on this day app",
  description: "A simple app to show the current Wikipedia article on a given day",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

//* RootLayoutContent is exported here because testing library does not support testing a page with an <html> tag but the this layout component needs rendered inside the <html> tag. 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-brand_background text-brand_prose">
      <head />
      <body>
        <RootLayoutContent>{children}</RootLayoutContent>
      </body>
    </html>
  );
}
