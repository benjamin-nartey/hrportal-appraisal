import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "../../app/globals.css";
import Navigation from "@/components/Navigation";

const inter = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation>{children}</Navigation>
      </body>
    </html>
  );
}
