"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";

import { cn } from "../../../../Lib/utils";
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
export default function CalendarForm({ setDate, date, ID, setClasses, getClasses, setClasses2, getClasses2 }) {
  const FormSchema = z.object({
    dob: z.date({
      required_error: "A date of birth is required.",
    }),
  });
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });
  useEffect(() => {
    const fetchClasses = async () => {
    console.log("Fetching classes... with date and id student", date, ID);
      if (!ID) return;
      const clases = await getClasses(ID, date.year, date.month);
      if (clases) {
        setClasses(clases);
        console.log(clases); 
      }
      if (setClasses2 && getClasses2) {
        const clases2 = await getClasses2(ID, date.year, date.month);
        if (clases2) {
          setClasses2(clases2);
          console.log(clases2);
        }
      }
    };
    fetchClasses();
  }, [ID, date, setClasses, getClasses, setClasses2, getClasses2]);

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
