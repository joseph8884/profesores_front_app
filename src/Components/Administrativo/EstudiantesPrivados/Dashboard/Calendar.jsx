"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "../../../../Lib/utils";
import { toast } from "../../../../hooks/use-toast.js";
import { Button } from "../../../ui/button";
import { Calendar } from "../../../ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";


export default function CalendarForm({ setDate, date }) {
  const FormSchema = z.object({
    dob: z.date({
      required_error: "A date of birth is required.",
    }),
  });
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  // Convert the incoming date prop to a Date object
  const initialDate = new Date(parseInt(date.year), parseInt(date.month) - 1, 1); // Restar 1 al mes
  form.setValue("dob", initialDate); // Set the initial value for the form

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
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
                        format(field.value, "MMM yyyy") // Format to show month and year
                      ) : (
                        <span>Pick a month and year</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(selectedDate) => {
                      if (selectedDate) {
                        const newDate = new Date(
                          selectedDate.getFullYear(),
                          selectedDate.getMonth(), 
                          1
                        );
                        field.onChange(newDate); 
                        const dateObj = {
                          month: (newDate.getMonth() + 1).toString(),
                          year: newDate.getFullYear().toString(),
                        };
                        setDate(dateObj); 
                        console.log(dateObj);
                      } else {
                        console.error("No date selected");
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {
          //<Button type="submit">Submit</Button>
        }
      </form>
    </Form>
  );
}
