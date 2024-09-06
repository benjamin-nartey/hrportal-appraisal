import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "../../app/globals.css";
import Navigation from "@/components/Navigation";
import { refreshTokenAndFetchUser } from "@/lib/refreshTokenAndFetchUser";

const inter = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "home",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userData } = await refreshTokenAndFetchUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation userData={userData}>{children}</Navigation>
      </body>
    </html>
  );
}
