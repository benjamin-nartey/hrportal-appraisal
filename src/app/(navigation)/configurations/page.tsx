export const dynamic = "force-dynamic";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configurations",
};

import { refreshTokenAndFetchAllUsers } from "@/lib/refreshTokenAndFetchUsers";
import { ConfigTabs } from "./configTab";

export default async function Configurations() {
  const { tokenData } = await refreshTokenAndFetchAllUsers();
  return (
    <div className="container flex flex-col items-center justify-center mx-auto lg:p-12 p-2 animate-slide-up">
      <ConfigTabs tokenData={tokenData} />
    </div>
  );
}
