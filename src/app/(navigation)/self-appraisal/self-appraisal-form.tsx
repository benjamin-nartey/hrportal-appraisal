"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/Spinner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RATING } from "../../../lib/const/rating";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormEvent } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface SelfAppraisalProps {
  tokenData: TokenProps;
}

export default function SelfAppraislForm({ tokenData }: SelfAppraisalProps) {
  const [loading, setLoading] = useState(false);

  const [kpiValue1, setKpiValue1] = useState("");
  const [kpiValue2, setKpiValue2] = useState("");
  const [kpiValue3, setKpiValue3] = useState("");
  const [kpiValue4, setKpiValue4] = useState("");
  const [kpiValue5, setKpiValue5] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);

      const payload: SelfAppraisalPayloadProps = {
        kpis: [
          {
            name: formData.get("kpiDescription1") as string,
            score: Number(kpiValue1),
          },
          {
            name: formData.get("kpiDescription2") as string,
            score: Number(kpiValue2),
          },
          {
            name: formData.get("kpiDescription3") as string,
            score: Number(kpiValue3),
          },
          {
            name: formData.get("kpiDescription4") as string,
            score: Number(kpiValue4),
          },
          {
            name: formData.get("kpiDescription5") as string,
            score: Number(kpiValue5),
          },
        ],
      };

      const response = await fetch(`${BASE_URL}/appraisal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-6">
        Evaluation of Key Results Areas(KRA)
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-full flex items-center justify-center"
      >
        <Card className="lg:w-[85%] w-full max-w-full flex flex-col items-center justify-center p-6">
          <div className="flex items-center justify-between w-full mb-6">
            <div className="flex-[0.4]">
              <Input
                className="ring-transparent"
                name="kpiDescription1"
                id="kpiDescription1"
                placeholder="Enter your KPI"
                required
              />
            </div>

            <div className="flex-[0.4] flex gap-4 justify-center items-center">
              <Select
                onValueChange={setKpiValue1}
                value={kpiValue1}
                name="departmentId"
                required
              >
                <SelectTrigger className="w-full ring-transparent">
                  <SelectValue placeholder="Rate yourself out of 5" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    {RATING?.map((option) => (
                      <SelectItem
                        className="cursor-pointer  hover:bg-secondary hover:text-black"
                        key={option.id}
                        value={option.value}
                      >
                        {option.value}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mb-6">
            <div className="flex-[0.4]">
              <Input
                className="ring-transparent"
                name="kpiDescription2"
                id="kpiDescription2"
                placeholder="Enter your KPI"
                required
              />
            </div>

            <div className="flex-[0.4] flex gap-4 justify-center items-center">
              <Select
                onValueChange={setKpiValue2}
                value={kpiValue2}
                name="departmentId"
                required
              >
                <SelectTrigger className="w-full ring-transparent">
                  <SelectValue placeholder="Rate yourself out of 5" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    {RATING?.map((option) => (
                      <SelectItem
                        className="cursor-pointer  hover:bg-secondary hover:text-black"
                        key={option.id}
                        value={option.value}
                      >
                        {option.value}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mb-6">
            <div className="flex-[0.4]">
              <Input
                className="ring-transparent"
                name="kpiDescription3"
                id="kpiDescription3"
                placeholder="Enter your KPI"
                required
              />
            </div>

            <div className="flex-[0.4] flex gap-4 justify-center items-center">
              <Select
                onValueChange={setKpiValue3}
                value={kpiValue3}
                name="departmentId"
                required
              >
                <SelectTrigger className="w-full ring-transparent">
                  <SelectValue placeholder="Rate yourself out of 5" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    {RATING?.map((option) => (
                      <SelectItem
                        className="cursor-pointer  hover:bg-secondary hover:text-black"
                        key={option.id}
                        value={option.value}
                      >
                        {option.value}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mb-6">
            <div className="flex-[0.4]">
              <Input
                className="ring-transparent"
                name="kpiDescription4"
                id="kpiDescription4"
                placeholder="Enter your KPI"
                required
              />
            </div>

            <div className="flex-[0.4] flex gap-4 justify-center items-center">
              <Select
                onValueChange={setKpiValue4}
                value={kpiValue4}
                name="departmentId"
                required
              >
                <SelectTrigger className="w-full ring-transparent">
                  <SelectValue placeholder="Rate yourself out of 5" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    {RATING?.map((option) => (
                      <SelectItem
                        className="cursor-pointer  hover:bg-secondary hover:text-black"
                        key={option.id}
                        value={option.value}
                      >
                        {option.value}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mb-6">
            <div className="flex-[0.4]">
              <Input
                className="ring-transparent"
                name="kpiDescription5"
                id="kpiDescription5"
                placeholder="Enter your KPI"
                required
              />
            </div>

            <div className="flex-[0.4] flex gap-4 justify-center items-center">
              <Select
                onValueChange={setKpiValue5}
                value={kpiValue5}
                name="departmentId"
                required
              >
                <SelectTrigger className="w-full ring-transparent">
                  <SelectValue placeholder="Rate yourself out of 5" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    {RATING?.map((option) => (
                      <SelectItem
                        className="cursor-pointer  hover:bg-secondary hover:text-black"
                        key={option.id}
                        value={option.value}
                      >
                        {option.value}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            className="font-semibold mt-6 text-white transition-all p-2 flex items-center justify-center gap-4 w-full"
            type="submit"
          >
            {loading && <Spinner variant="small" />}
            {loading ? "Submiting..." : "Submit"}
          </Button>
        </Card>
      </form>
    </>
  );
}
