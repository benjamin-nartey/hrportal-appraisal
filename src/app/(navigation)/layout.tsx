import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "../../app/globals.css";
import Navigation from "@/components/Navigation";
import { fetchUser } from "@/lib/fetchUser";
import { cookies } from "next/headers";

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
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.error("Token not found in cookies");
    return <div>Token not found</div>;
  }

  const userData = await fetchUser<UserProps>(
    "http://localhost:8000/user",
    token
  );
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation userData={userData}>{children}</Navigation>
      </body>
    </html>
  );
}
