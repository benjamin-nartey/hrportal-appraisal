export const dynamic = "force-dynamic";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sel Appraisal",
};

import React from "react";
import SelfAppraislForm from "./self-appraisal-form";

export default function SelfAppraisl() {
  return (
    <div className=" flex justify-center items-center flex-col lg:p-12 px-2 py-4 ">
      <SelfAppraislForm />
    </div>
  );
}
