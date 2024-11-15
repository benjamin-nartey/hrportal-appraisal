"use client";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Spinner from "@/components/Spinner";
import { Card } from "@/components/ui/card";

type SliderProps = React.ComponentProps<typeof Slider>;

export default function SelfAppraislForm({ className, ...props }: SliderProps) {
  const [loading, setLoading] = useState(false);

  const [kpiDescription1, setKpiDescription1] = useState("");
  const [kpiDescription2, setKpiDescription2] = useState("");
  const [kpiDescription3, setKpiDescription3] = useState("");
  const [kpiDescription4, setKpiDescription4] = useState("");
  const [kpiDescription5, setKpiDescription5] = useState("");

  const [kpiValue1, setKpiValue1] = useState([0]);
  const [kpiValue2, setKpiValue2] = useState([0]);
  const [kpiValue3, setKpiValue3] = useState([0]);
  const [kpiValue4, setKpiValue4] = useState([0]);
  const [kpiValue5, setKpiValue5] = useState([0]);

  return (
    <>
      <h2 className="text-xl font-semibold mb-6">
        Evaluation of Key Results Areas(KRA)
      </h2>
      <form
        action="
        "
        className="w-full flex items-center justify-center"
      >
        <Card className="w-9/12 max-w-full flex flex-col items-center justify-center p-6">
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
              <Slider
                max={5}
                step={1}
                name="kpiValue1"
                value={kpiValue1}
                onValueChange={setKpiValue1}
                className={cn("", className)}
                {...props}
              />
              <div>
                <Badge className="text-white">{kpiValue1}</Badge>
              </div>
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
              <Slider
                max={5}
                step={1}
                name="kpiValue2"
                value={kpiValue2}
                onValueChange={setKpiValue2}
                className={cn("", className)}
                {...props}
              />
              <div>
                <Badge className="text-white">{kpiValue2}</Badge>
              </div>
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
              <Slider
                max={5}
                step={1}
                name="kpiValue3"
                value={kpiValue3}
                onValueChange={setKpiValue3}
                className={cn("", className)}
                {...props}
              />
              <div>
                <Badge className="text-white">{kpiValue3}</Badge>
              </div>
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
              <Slider
                max={5}
                step={1}
                name="kpiValue4"
                value={kpiValue4}
                onValueChange={setKpiValue4}
                className={cn("", className)}
                {...props}
              />
              <div>
                <Badge className="text-white">{kpiValue4}</Badge>
              </div>
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
              <Slider
                max={5}
                step={1}
                name="kpiValue5"
                value={kpiValue5}
                onValueChange={setKpiValue5}
                className={cn("", className)}
                {...props}
              />
              <div>
                <Badge className="text-white">{kpiValue5}</Badge>
              </div>
            </div>
          </div>

          <button
            className="bg-secondary font-semibold hover:bg-primary hover:text-white transition-all active:bg-secondary text-black p-2 flex items-center justify-center gap-4 w-full"
            type="submit"
          >
            {loading && <Spinner variant="small" />}
            {loading ? "Submiting..." : "Submit"}
          </button>
        </Card>
      </form>
    </>
  );
}
