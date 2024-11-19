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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { formattedAppraisalDate } from "@/lib/formattedAppraisalDate";
import { FormEvent, useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface ConfigTabsProps {
  tokenData: TokenProps;
}

export function ConfigTabs({ tokenData }: ConfigTabsProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedOption, setSelectedOption] = useState("");

  const [edit, setEdit] = useState(false);

  const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>(
    undefined
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>(
    undefined
  );

  const [allAppraisalForDivision, setAllAppraisalForDivision] =
    useState<GetAllAppraisalForDivisionProps>();

  const { toast } = useToast();

  const getAppraisalTimeline = async () => {
    try {
      const res = await fetch(`${BASE_URL}/appraisalTimeline`, {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData?.token}`,
        },
      });
      const data: GetAllAppraisalForDivisionProps = await res.json();

      setAllAppraisalForDivision(data);

      if (
        data.appraisalTimeline[0]?.startDate &&
        data.appraisalTimeline[0]?.endDate
      ) {
        setStartDate(new Date(data.appraisalTimeline[0].startDate));
        setEndDate(new Date(data.appraisalTimeline[0].endDate));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppraisalTimeline();
  }, [tokenData.token]);

  const handleAppraisalTimeline = async (event: FormEvent) => {
    event.preventDefault();

    if (!selectedStartDate || !selectedEndDate) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select valid start and end dates.",
      });
      return;
    }

    const payload = {
      startDate: formattedAppraisalDate(selectedStartDate!.toISOString()),
      endDate: formattedAppraisalDate(selectedEndDate!.toISOString()),
    };

    const appraisalUrl = edit
      ? `appraisalTimeline/${allAppraisalForDivision?.appraisalTimeline[0].id}`
      : "appraisalTimeline";

    try {
      const res = await fetch(`${BASE_URL}/${appraisalUrl}`, {
        method: edit ? "PATCH" : "POST",
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

      const data: CreatedAppraisalDataProps = await res.json();

      console.log(data);
      setStartDate(new Date(data.appraisalTimeline.startDate));
      setEndDate(new Date(data.appraisalTimeline.endDate));

      setSelectedStartDate(undefined);
      setSelectedEndDate(undefined);
      toast({
        title: "Success",
        description: `${
          edit
            ? "Appraisal timeline updated successfuly"
            : "Appraisal timeline created successfuly"
        }`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${error}`,
      });
    }
  };

  return (
    <div className="relative lg:w-[85%] w-full flex flex-col items-center justify-center">
      <div className="flex items-center justify-center mb-16 animate-slide-in">
        {startDate && endDate && (
          <Countdown startDate={startDate} endDate={endDate} />
        )}
      </div>
      <Tabs
        defaultValue="appraisalTimeline"
        className="w-full flex items-center justify-center flex-col"
      >
        <TabsList className="grid w-full grid-cols-2 bg-secondary">
          <TabsTrigger value="appraisalTimeline">
            Appraisal Timeline
          </TabsTrigger>
          <TabsTrigger value="emailAlerts">Email Alerts</TabsTrigger>
        </TabsList>
        <TabsContent value="appraisalTimeline" className="w-full">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span> Appraisal Timeline</span>
                <Button
                  onClick={() => setEdit((prev) => !prev)}
                  className="text-white"
                >
                  {edit ? "New timeline" : "Edit timeline"}
                </Button>
              </CardTitle>
              <CardDescription>
                Set or make changes to Appraisal Timeline here. Click save when
                you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <form onSubmit={handleAppraisalTimeline}>
                <div className="grid mb-4 gap-2">
                  <legend className="text-sm font-medium">Start Date</legend>
                  <DatePicker
                    value={selectedStartDate}
                    onDateChange={setSelectedStartDate}
                  />
                </div>
                <div className="grid mb-4 gap-2">
                  <legend className="text-sm font-medium">End Date</legend>
                  <DatePicker
                    value={selectedEndDate}
                    onDateChange={setSelectedEndDate}
                  />
                </div>

                <Button className="text-white w-full mt-4">
                  {edit ? "Save Edits" : "Save"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="emailAlerts" className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>Email Alerts</CardTitle>
              <CardDescription>
                Send Email alerts to users or department. Click send when you're
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <form>
                <div className="space-y-1">
                  <legend className="text-sm font-semibold">
                    Select email target
                  </legend>
                  <Select
                    onValueChange={setSelectedOption}
                    value={selectedOption}
                    name="departmentId"
                    required
                  >
                    <SelectTrigger className="w-full ring-transparent">
                      <SelectValue placeholder="Select target" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectGroup>
                        <SelectItem
                          className="cursor-pointer  hover:bg-secondary hover:text-black"
                          key={`users`}
                          value={`users`}
                        >
                          Users
                        </SelectItem>
                        <SelectItem
                          className="cursor-pointer  hover:bg-secondary hover:text-black"
                          key={`departments`}
                          value={`departments`}
                        >
                          Departments
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="mt-8 w-full text-white">Send</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
