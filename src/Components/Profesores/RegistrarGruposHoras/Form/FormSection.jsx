import React, { useState, useEffect } from "react";
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
import Loader from "../../../Loader/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { Checkbox } from "../../../ui/checkbox";
import { getStudentsCustomByTeamID } from "../../../../provider/profesor/Grupos/getstudentTeamByTeamId";
import { postTeamClass } from "../../../../provider/profesor/Grupos/postTeamClass";
import { postAttendance } from "../../../../provider/profesor/Grupos/postAttendance";

const FormSection = ({ groupDATA }) => {
  const [classHeld, setClassHeld] = useState(true);
  const [date, setDate] = useState("");
  const [classType, setClassType] = useState("Virtual");
  const [hours, setHours] = useState("");
  const [comments, setComments] = useState("");
  const [topics, setTopics] = useState("");
  const [cancellationTiming, setCancellationTiming] = useState("");
  const [cancelledBy, setCancelledBy] = useState("");
  const [cancellationReason, setCancellationReason] = useState("");
  const [loading, setLoading] = useState(true); // Estado para manejar el loading
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data_fromAPI = await getStudentsCustomByTeamID(groupDATA.id);
        setStudents(data_fromAPI);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, [groupDATA]);

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
    }));
  };

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
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const attendedStudents = students.filter(
      (student) => attendance[student.id]
    );
    const formatDate = (date) => {
      const isoString = date.toISOString();
      const formattedDate = isoString.replace("Z", "000000Z");
      return formattedDate;
    };

    const formData = {
      teacherID: 2,
      classType,
      dateTime: formatDate(new Date(date)),
      duration: hours,
      teamID: groupDATA.id,
      comment: comments,
      topic: topics,
      classHelded: classHeld === true ? true : false,
      cancellationReason: cancellationReason,
      cancellationTiming: cancellationTiming
        ? cancellationTiming
        : "Class helded",
      canceledBy: cancelledBy ? cancelledBy : "Class helded",
      //attendance: attendedStudents.map((student) => student.fullName),
    };
    try {
      const response = await postTeamClass(formData);
      if (classHeld === "true") {
        attendedStudents.map(async (student) => {
          const attendanceperStudent = {
            classID: response,
            studentTeamID: student.id,
            attended: true,
          };
          await postAttendance(attendanceperStudent);
        });
      }
    } catch (error) {
      console.log("Error creating team class:", error);
    } finally {
      setLoading(false);
    }
    console.log("Submitted Form Data:", JSON.stringify(formData, null, 2));
    console.log("Attended Students:", attendedStudents);
  };

  return (
    <div className="form">
      {loading && <Loader />}
      <form onSubmit={handleSubmit}>
        <div className="hours">
          <div className="attendance">
            <label className="mb-2 font-semibold">
              Was the class held?
              <Select
                onValueChange={(value) =>
                  value === "true"
                    ? handleAttendanceChange(true)
                    : handleAttendanceChange(false)
                }
                defaultValue={classHeld === true ? "true" : "false"}
              >
                <SelectTrigger className="w-full">
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
              <Select
                name="hours"
                onValueChange={(value) => setHours(parseFloat(value))}
                value={hours}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={0.5}>30 minutes</SelectItem>
                  <SelectItem value={1}>1 hour</SelectItem>
                  <SelectItem value={2}>2 hours</SelectItem>
                  <SelectItem value={3}>3 hours</SelectItem>
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
        {classHeld === true && (
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
                    <TableCell className="font-medium">
                      {student.fullName}
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={attendance[student.id]}
                        onCheckedChange={() =>
                          handleAttendanceCheckbox(student.id)
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Show cancellation section only if classHeld is "false" */}
        {classHeld === false && (
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
