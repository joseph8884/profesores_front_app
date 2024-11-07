import React, { useState } from "react";
import { Button } from "../../../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";
import { Input } from "../../../ui/input";
import { Textarea } from "../../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { Checkbox } from "../../../ui/checkbox";

const FormSection = () => {
  const [classHeld, setClassHeld] = useState("true");
  const [date, setDate] = useState("");
  const [classType, setClassType] = useState("Virtual");
  const [hours, setHours] = useState("");
  const [comments, setComments] = useState("");
  const [topics, setTopics] = useState("");
  const [cancellationTiming, setCancellationTiming] = useState("");
  const [cancelledBy, setCancelledBy] = useState("");
  const [cancellationReason, setCancellationReason] = useState("");
  // Lista de estudiantes
  const students = [
    { id: 1, name: "Student A" },
    { id: 2, name: "Student B" },
    { id: 3, name: "Student C" },
    // Añadir más estudiantes si es necesario
  ];


  const [attendance, setAttendance] = useState(
    students.reduce((acc, student) => {
      acc[student.id] = false;
      return acc;
    }, {})
  );

  // Manejar el cambio de asistencia
  const handleAttendanceCheckbox = (studentId) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [studentId]: !prevAttendance[studentId],
    }))};

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "date":
        setDate(value);
        break;
      case "comments":
        setComments(value);
        break;
      case "topics":
        setTopics(value);
        break;
      case "cancellationReason":
        setCancellationReason(value);
        break;
      default:
        break;
    }
  };

  const handleAttendanceChange = (value) => {
    setClassHeld(value);
  };

  const convertDurationToHours = (duration) => {
    if (duration === "30min") return 0.5;
    if (duration === "1hr") return 1;
    if (duration === "2hr") return 2;
    if (duration === "3hr") return 3;
    return 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const attendedStudents = students.filter(
      (student) => attendance[student.id]
    );

    const formData = {
      date,
      classType,
      hours: convertDurationToHours(hours),
      comments,
      topics,
      cancellationTiming,
      cancelledBy,
      cancellationReason,
      classHeld: classHeld === "true",
      attendance: attendedStudents.map((student) => student.name),
    };

    console.log("Submitted Form Data:", JSON.stringify(formData, null, 2));
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="hours">
          <div className="attendance">
            <label className="mb-2 font-semibold">
              Was the class held?
              <Select onValueChange={handleAttendanceChange} value={classHeld}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </label>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">
              Start date and time:
              <Input
                type="datetime-local"
                name="date"
                value={date}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">
              Class type:
              <Select
                name="classType"
                onValueChange={setClassType}
                value={classType}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Virtual">Virtual</SelectItem>
                  <SelectItem value="In-person">In-person</SelectItem>
                </SelectContent>
              </Select>
            </label>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">
              Duration (hours):
              <Select name="hours" onValueChange={setHours} value={hours}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30min">30 minutes</SelectItem>
                  <SelectItem value="1hr">1 hour</SelectItem>
                  <SelectItem value="2hr">2 hours</SelectItem>
                  <SelectItem value="3hr">3 hours</SelectItem>
                </SelectContent>
              </Select>
            </label>
          </div>
        </div>

        <div className="reason">
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">
              Comments:
              <Textarea
                name="comments"
                value={comments}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">
              Topics covered:
              <Textarea name="topics" value={topics} onChange={handleChange} />
            </label>
          </div>
        </div>
 {/* Checkboxes de asistencia */}
        <div className="student-attendance">
          <label className="mb-2 font-semibold">Mark Attendance:</label>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Asistencia</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={attendance[student.id]}
                      onCheckedChange={() => handleAttendanceCheckbox(student.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Show cancellation section only if classHeld is "false" */}
        {classHeld === "false" && (
          <div className="cancellation">
            <div className="flex flex-col">
              <label className="mb-2 font-semibold">
                Was the cancellation timely?
                <Select
                  name="cancellationTiming"
                  onValueChange={setCancellationTiming}
                  value={cancellationTiming}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Cancellation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="On time">On time</SelectItem>
                    <SelectItem value="Late">Late</SelectItem>
                  </SelectContent>
                </Select>
              </label>
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-semibold">
                Who canceled?
                <Select
                  name="cancelledBy"
                  onValueChange={setCancelledBy}
                  value={cancelledBy}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Cancelled by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Teacher">Teacher</SelectItem>
                  </SelectContent>
                </Select>
              </label>
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-semibold">
                Cancellation reason:
                <Textarea
                  name="cancellationReason"
                  value={cancellationReason}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
        )}

        <Button type="submit" className="mt-4">
          Submit Attendance
        </Button>
      </form>
    </div>
  );
};

export default FormSection;
