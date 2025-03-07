"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetGalleryQuery } from "@/apis/_gallery_index.api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCreateEventOrderMutation } from "@/apis/_event_index.api";
import {
  calculateDurationWithDate,
  isStartTimeBeforeEndTime,
} from "@/static/calc_distance";
import toast from "react-hot-toast";
import { eventSchema } from "@/static/schema";
import { useRouter } from "next/navigation";

const Events = () => {
  const { data } = useGetGalleryQuery();
  const [createEventOrder, { isLoading, isSuccess }] =
    useCreateEventOrderMutation();
  const [orderId, setOrderId] = useState("");
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
  });
  const distance =
    startTime && endTime
      ? calculateDurationWithDate(
          format(startTime, "HH:mm"),
          format(endTime, "HH:mm")
        )
      : "Please select a valid start and end time.";

  async function onSubmit(data: z.infer<typeof eventSchema>) {
    const isGreater = isStartTimeBeforeEndTime(data.startTime, data.endTime);
    if (!isGreater) {
      toast.error("stoppage time must be greater");
      return;
    }
    const res = await createEventOrder({
      ...data,
      price: distance && typeof distance === "object" && distance?.hours * 20,
    });
    setOrderId(res.data.resData.id);
  }
  useEffect(() => {
    if (isSuccess && orderId) {
      router.push(`/events/${orderId}`);
    }
  }, [isSuccess, orderId]);

  return (
    <div>
      <h1 className="text-3xl text-gray-600 flex flex-col  flex-none overflow-x-hidden font-semibold w-fit relative">
        Welcome to our have fun
        <span className="h-[6px] w-[40%] translate-x-0 animate-rebound bg-[#EA6D27] mt-2"></span>
      </h1>
      <div className="my-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="gallery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pick a Dinning Hall</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="p-4">
                        <SelectValue placeholder="Select a gallery to dine" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data &&
                        data.length &&
                        data.map((item) => (
                          <SelectItem
                            className="text-gray-800 text-lg capitalize"
                            key={item.id}
                            value={item.id}
                          >
                            {item.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Pick a start Time</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          {startTime
                            ? format(startTime, "hh:mm a")
                            : "Select Time"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                       <DatePicker
                          selected={startTime}
                          onChange={(time) => {
                            setStartTime(time);
                            field.onChange(format(time as Date, "HH:mm"));
                          }}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={60}
                          minTime={new Date()}
                          maxTime={new Date(new Date().setHours(23, 59))}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          className="border rounded-md p-2 w-full"
                        /> 
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Pick an end time</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          {endTime ? format(endTime, "hh:mm a") : "Select Time"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                         <DatePicker
                          selected={endTime}
                          onChange={(time) => {
                            setEndTime(time);
                            field.onChange(format(time as Date, "HH:mm"));
                          }}
                          showTimeSelect
                          minTime={new Date()}
                          maxTime={new Date(new Date().setHours(23, 59))}
                          showTimeSelectOnly
                          timeIntervals={60}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          className="border rounded-md p-2 w-full"
                        /> 
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Pick a Day</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3">
              <h2 className="text-lg text-gray-700">Total hours selected </h2>
              <h1 className=" text-lg text-gray-700 ">
                {distance && typeof distance === "object" && distance?.hours > 0
                  ? distance?.hours
                  : 0}
                {" hours"}
              </h1>
            </div>
            <div className="flex gap-3">
              <h2 className="text-lg text-gray-700 capitalize">Total price </h2>
              <h1 className=" text-lg text-gray-700 ">
                {distance &&
                typeof distance === "object" &&
                distance?.hours * 20 > 0
                  ? "$ " + distance?.hours * 20
                  : "Enter valid date"}
              </h1>
            </div>
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full py-[25px] text-lg"
            >
              {isLoading ? (
                <LoaderCircle className="animate-spin text-center" size={20} />
              ) : (
                "Book event"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Events;
