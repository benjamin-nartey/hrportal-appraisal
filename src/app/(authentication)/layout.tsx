import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "../../app/globals.css";

const inter = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "login | COCOBOD Appraisal Sysytem",
  description: "COCOBOD Appraisal Sysytem",
  applicationName: "COCOBOD Appraisal Sysytem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
