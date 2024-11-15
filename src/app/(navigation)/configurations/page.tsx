export const dynamic = "force-dynamic";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configurations",
};

import { ConfigTabs } from "./configTab";
import { refreshTokenAndFetchAllUsers } from "@/lib/refreshTokenAndFetchUsers";

export default async function Configurations() {
  const { tokenData } = await refreshTokenAndFetchAllUsers();
  return (
    <div className="container flex flex-col items-center justify-center mx-auto lg:p-12 p-2 animate-slide-up">
      <ConfigTabs tokenData={tokenData} />
    </div>
  );
}
