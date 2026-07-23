import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simanto — Personal Website",
  description: "Simanto's personal website about creativity, technology, and learning.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
