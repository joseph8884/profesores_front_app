import React, { useState } from "react";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Textarea } from "../../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { Toaster, toast } from "sonner";
import Loader from "../../../Loader/Loader";
import { postIndividualClass } from "../../../../provider/profesor/EstudianteIndividual/postIndividualClass";
import { useLocation } from "react-router-dom";
const FormSection = ({ data }) => {
  const [classHeld, setClassHeld] = useState(true);
  const [date, setDate] = useState("");
  const [classType, setClassType] = useState("Virtual");
  const [hours, setHours] = useState();
  const [comments, setComments] = useState("");
  const [topics, setTopics] = useState("");
  const [cancellationTiming, setCancellationTiming] = useState("");
  const [cancelledBy, setCancelledBy] = useState("");
  const [cancellationReason, setCancellationReason] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const teacherId = params.get("profesorId");

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
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !comments || !topics || !classType || !hours || !data.id) {
      toast.error("Por favor, completa todos los campos requeridos.");
      return;
    }
    setLoading(true);
    try {
      const formatDate = (date) => {
        const isoString = date.toISOString();
        const formattedDate = isoString.replace("Z", "000000Z");
        return formattedDate;
      };
      if (data.hoursRemaining <= 0 || data.hoursRemaining == null) {
        toast.error("El estudiante no tiene horas disponibles.");
        setLoading(false);
        return;
      }
      var formData = {
        teacherID: teacherId,
        classType,
        dateTime: formatDate(new Date(date)),
        duration: hours,
        studentID: data.id,
        comment: comments,
        topic: topics,
        classHeld: classHeld === true ? true : false,
        cancellationReason: cancellationReason,
        cancellationTiming:
          classHeld === false ? cancellationTiming : "Class held",
        canceledBy: classHeld === false ? cancelledBy : "Class held",
      };
      await postIndividualClass(formData);
      toast.success("Class has been created");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong, please try again.");
      console.log("Error creating student class:", error);
    } finally {
      setLoading(false);
    }
    console.log("Form data:", formData);
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
                  value === "true" ? setClassHeld(true) : setClassHeld(false)
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
                max={getCurrentDateTime()}
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
                onValueChange={(value) => {
                  setHours(parseFloat(value));
                }}
                value={hours}
              >
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
                Reason for cancellation:
                <Textarea
                  name="cancellationReason"
                  value={cancellationReason}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
        )}

        <div className="button">
          <Button type="submit">Submit</Button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default FormSection;
