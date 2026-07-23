import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simanto Kumar Sen — Student Researcher & Builder",
  description:
    "The portfolio of Simanto Kumar Sen, a student exploring engineering, research, artificial intelligence, and web development.",
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
