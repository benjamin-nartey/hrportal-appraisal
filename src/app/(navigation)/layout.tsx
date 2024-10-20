import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "../globals.css";
import Navigation from "@/components/Navigation";
import { refreshTokenAndFetchUser } from "@/lib/refreshTokenAndFetchUser";
import { Toaster } from "@/components/ui/toaster";

const inter = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | COCOBOD Appraisal System",
    default: "COCOBOD Appraisal System",
  },
  description: "COCOBOD Appraisal System",
  applicationName: "COCOBOD Appraisal System",
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
        <Toaster />
      </body>
    </html>
  );
}
