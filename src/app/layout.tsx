import "~/styles/globals.css";

export const metadata = {
  title: "Wikipedia on this day app",
  description: "A simple app to show the current Wikipedia article on a given day",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
