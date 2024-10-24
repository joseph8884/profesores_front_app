import React, { useState } from "react";
import NavMobile from "../../Nav/NavMobile";
import NavWeb from "../../Nav/NavWeb";
import { Button } from "../../../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";
import { BellIcon } from "@radix-ui/react-icons";
import { DownloadIcon } from "@radix-ui/react-icons";
import EstudentData from "./EstudentData";
import { Input } from "../../../ui/input";
import { Textarea } from "../../../ui/textarea";
import { Select, SelectItem } from "../../../ui/select";
import { Checkbox } from "../../../ui/checkbox";
import { SelectContent } from "../../../ui/select";

const RegisterForm = () => {
  const [attendance, setAttendance] = useState("");
  const [hours, setHours] = useState("");
  const [comments, setComments] = useState("");
  const [cancellationReason, setCancellationReason] = useState("");
  const [cancelBy, setCancelBy] = useState("");
  const [wasLate, setWasLate] = useState(false);
  const [classTopic, setClassTopic] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Register Student Hours</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Attendance</label>
        <Select onValueChange={setAttendance}>
          <SelectContent>
            <SelectItem value="attended">Attended</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Hours dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Hours Attended</label>
        <Select onValueChange={setHours}>
          <SelectContent>
            <SelectItem value="30min">30 minutes</SelectItem>
            <SelectItem value="1hr">1 hour</SelectItem>
            <SelectItem value="2hr">2 hours</SelectItem>
            <SelectItem value="3hr">3 hours</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Date and Time picker */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Date</label>
        <Input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Comments */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Comments</label>
        <Textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Comments about the class and topic covered"
        />
      </div>

      {/* Cancellation Section */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-800 mb-2">Cancellation</h3>
        
        {/* Cancellation reason */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Reason for cancellation</label>
          <Input
            value={cancellationReason}
            onChange={(e) => setCancellationReason(e.target.value)}
            placeholder="Reason for cancellation"
          />
        </div>

        {/* Cancelled by */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Cancelled by</label>
          <Select onValueChange={setCancelBy}>
            <SelectContent>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="teacher">Teacher</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Lateness Checkbox */}
        <div className="flex items-center">
          <Checkbox
            id="wasLate"
            checked={wasLate}
            onCheckedChange={setWasLate}
          />
          <label htmlFor="wasLate" className="ml-2 text-sm">
            Was late?
          </label>
        </div>

        {/* Topic for cancelled class */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Topic for the cancelled class</label>
          <Input
            value={classTopic}
            onChange={(e) => setClassTopic(e.target.value)}
            placeholder="Planned topic for the class"
          />
        </div>

        {/* Date and Time for cancelled class */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Original Date and Time</label>
          <Input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <Button className="mt-4 w-full">Submit</Button>
    </div>
  );
};

export default RegisterForm;
