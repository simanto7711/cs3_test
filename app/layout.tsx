import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your Name — Personal Website",
  description: "A student portfolio about my interests and what I am learning.",
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
