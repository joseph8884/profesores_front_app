import React, { useState } from "react";
import { Button } from "../../../../ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../ui/dialog";
import { Input } from "../../../../ui/input";
import Loader from "../../../../Loader/Loader";
import { Textarea } from "../../../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../ui/select";
import {putIndividualClass} from "../../../../../provider/adm/Clases/ClasesIndividuales/putIndividualClass";
import { toast } from "sonner";
const ModificarClases = ({ data }) => {
  const [classHeld, setClassHeld] = useState(data.classHeld || false);
  const [date, setDate] = useState(data.dateTime || "");
  const [classType, setClassType] = useState(data.classType || "Virtual");
  const [hours, setHours] = useState(data.duration || "");
  const [comments, setComments] = useState(data.comment || "");
  const [topics, setTopics] = useState(data.topic || "");
  const [cancellationTiming, setCancellationTiming] = useState(
    data.cancellationTiming || ""
  );
  const [cancelledBy, setCancelledBy] = useState(data.canceledBy || "");
  const [cancellationReason, setCancellationReason] = useState(
    data.cancellationReason || ""
  );
  const [loading, setLoading] = useState(false);

  // Handle input changes
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
  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !date ||
      !comments ||
      !topics ||
      !classType ||
      !hours ||
      !data.teacherID ||
      !data.studentID
    ) {
      toast.error("Por favor, completa todos los campos requeridos. dsa");
      return;
    }
    if (classHeld === false) {
      if (cancelledBy === "Class held" || cancellationTiming === "Class held") {
        toast.error("Por favor, completa todos los campos requeridos.");
        return;
      }
    }
    setLoading(true);
    const formatDate = (date) => {
      const isoString = date.toISOString();
      const formattedDate = isoString.replace("Z", "000000Z");
      return formattedDate;
    };

    var formData = {
      teacherID: data.teacherID,
      classType,
      dateTime: formatDate(new Date(date)),
      duration: hours,
      studentID: data.studentID,
      comment: comments,
      topic: topics,
      classHeld: classHeld === true ? true : false,
      cancellationReason: cancellationReason,
      cancellationTiming: classHeld === false
        ? cancellationTiming
        : "Class held",
      canceledBy: classHeld === false ? cancelledBy : "Class held",
    };
    try {
      await putIndividualClass(formData, data.id);
    } catch (error) {
      console.log("Error creating team class:", error);
    } finally {
      setLoading(false);
    }
    console.log("Submitted Data nueva:", JSON.stringify(formData, null, 2));
  };

  return (
    <div className="overflow-y-auto max-h-[70vh] p-6">
      {loading && <Loader />}

      <DialogHeader>
        <DialogTitle>Modificar clase</DialogTitle>
        <DialogDescription>
          Modifique los datos que requiera de la clase
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
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
              value={formatDateForInput(date)}
              onChange={handleChange}
              className="w-full"
            />
          </label>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold">
            Class type:
            <Select
              name="classType"
              onValueChange={setClassType}
              defaultValue={classType}
            >
              <SelectTrigger className="w-full">
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
            <Select name="hours" onValueChange={(value)=>setHours(parseFloat(value))} value={hours}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={1}>1 hour</SelectItem>
                <SelectItem value={1.5}>1:30 hours</SelectItem>
                <SelectItem value={2}>2 hours</SelectItem>
                <SelectItem value={2.5}>2:30 hours</SelectItem>
                <SelectItem value={3}>3 hours</SelectItem>
                <SelectItem value={3.5}>3:30 hours</SelectItem>
                <SelectItem value={4}>4 hours</SelectItem>
              </SelectContent>
            </Select>
          </label>
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 font-semibold">
            Comments:
            <Textarea
              name="comments"
              value={comments}
              onChange={handleChange}
              className="w-full"
            />
          </label>
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 font-semibold">
            Topics covered:
            <Textarea
              name="topics"
              value={topics}
              onChange={handleChange}
              className="w-full"
            />
          </label>
        </div>
        {classHeld === false && (
          <div className="cancellation md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-2 font-semibold">
                Was the cancellation timely?
                <Select
                  name="cancellationTiming"
                  onValueChange={setCancellationTiming}
                  defaultValue={cancellationTiming}
                >
                  <SelectTrigger className="w-full">
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
                  defaultValue={cancelledBy}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Cancelled by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Teacher">Teacher</SelectItem>
                  </SelectContent>
                </Select>
              </label>
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="mb-2 font-semibold">
                Reason for cancellation:
                <Textarea
                  name="cancellationReason"
                  value={cancellationReason}
                  onChange={handleChange}
                  className="w-full"
                />
              </label>
            </div>
          </div>
        )}
      </div>
      <DialogFooter>
        <Button
          type="button"
          variant="ghost"
          onClick={handleSubmit}
          className="w-full"
        >
          Save changes
        </Button>
      </DialogFooter>
    </div>
  );
};

export default ModificarClases;
