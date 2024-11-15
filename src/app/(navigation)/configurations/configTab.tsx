"use client";

import Countdown from "@/components/countdown/Countdown";
import { DatePicker } from "@/components/datePickerCustom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { formattedAppraisalDate } from "@/lib/formattedAppraisalDate";
import { FormEvent, useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface ConfigTabsProps {
  tokenData: AccessTokenProps;
}

export function ConfigTabs({ tokenData }: ConfigTabsProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { toast } = useToast();

  const handleAppraisalTimeline = async (event: FormEvent) => {
    const beginDate = startDate
      ? formattedAppraisalDate(startDate.toISOString())
      : "";

    const endingDate = endDate
      ? formattedAppraisalDate(endDate.toISOString())
      : "";

    const payload = { startDate: beginDate, endDate: endingDate };

    event.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/appraisalTimeline`, {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok && res.status === 409) {
        const data: CreateAppraisalErrorProps = await res.json();
        if (
          data.error ===
          `An appraisal timeline already exists within the specified date range`
        ) {
          throw Error(
            "An appraisal timeline already exists within the specified date range"
          );
        } else if (
          data.error === "startDate or endDate cannot be in the past"
        ) {
          throw Error("startDate or endDate cannot be in the past");
        } else {
          throw new Error(
            "Error encounted while trying to create apparaisal timeline"
          );
        }
      } else if (!res.ok && res.status === 400) {
        throw Error("startDate or endDate cannot be empty");
      }

      const data: createdAppraisalDataProps = await res.json();

      console.log(data);
      setStartDate(data.appraisalTimeline.startDate);
      setEndDate(data.appraisalTimeline.endDate);
      setIsSubmitted(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${error}`,
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mb-16 animate-slide-in">
        {startDate && endDate && isSubmitted && (
          <Countdown startDate={startDate} endDate={endDate} />
        )}
      </div>
      <Tabs
        defaultValue="appraisalTimeline"
        className="w-2/3 flex items-center justify-center flex-col"
      >
        <TabsList className="grid w-full grid-cols-2 bg-secondary">
          <TabsTrigger value="appraisalTimeline">
            Appraisal Timeline
          </TabsTrigger>
          <TabsTrigger value="emailAlerts">Email Alerts</TabsTrigger>
        </TabsList>
        <TabsContent value="appraisalTimeline">
          <Card>
            <CardHeader>
              <CardTitle>Appraisal Timeline</CardTitle>
              <CardDescription>
                Set or make changes to Appraisal Timeline here. Click save when
                you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <form onSubmit={handleAppraisalTimeline}>
                <div className="grid mb-4 gap-2">
                  <legend className="text-sm font-medium">Start Date</legend>
                  <DatePicker onDateChange={setStartDate} />
                </div>
                <div className="grid mb-4 gap-2">
                  <legend className="text-sm font-medium">End Date</legend>
                  <DatePicker onDateChange={setEndDate} />
                </div>

                <Button className="text-white w-full mt-4">Save Changes</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="emailAlerts">
          <Card>
            <CardHeader>
              <CardTitle>Email Alerts</CardTitle>
              <CardDescription>
                Send Email alerts to users or department. Click save when you're
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current emailAlerts</Label>
                <Input id="current" type="emailAlerts" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New emailAlerts</Label>
                <Input id="new" type="emailAlerts" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
