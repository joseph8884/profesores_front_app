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
import Loader from "../../../Loader/Loader";
import { postIndividualClass } from "../../../../provider/profesor/EstudianteIndividual/postIndividualClass";

const FormSection = ({ data }) => {
  const [classHeld, setClassHeld] = useState(true);
  const [date, setDate] = useState("");
  const [classType, setClassType] = useState("Virtual");
  const [hours, setHours] = useState(2);
  const [comments, setComments] = useState("");
  const [topics, setTopics] = useState("");
  const [cancellationTiming, setCancellationTiming] = useState("");
  const [cancelledBy, setCancelledBy] = useState("");
  const [cancellationReason, setCancellationReason] = useState("");
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

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formatDate = (date) => {
      const isoString = date.toISOString();
      const formattedDate = isoString.replace("Z", "000000Z");
      return formattedDate;
    };

    var formData = {
      teacherID: 2,
      classType,
      dateTime: formatDate(new Date(date)),
      duration: hours,
      studentID: data.id,
      comment: comments,
      topic: topics,
      classHelded: classHeld === true ? true : false,
      cancellationReason: cancellationReason,
      cancellationTiming: cancellationTiming
        ? cancellationTiming
        : "Class helded",
      canceledBy: cancelledBy ? cancelledBy : "Class helded",
    };
    try {
      await postIndividualClass(formData);
    } catch (error) {
      console.log("Error creating team class:", error);
    } finally {
      setLoading(false);
    }
    console.log("Submitted Form Data:", JSON.stringify(formData, null, 2));
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
            <Select onValueChange={(value)=>{
              setHours(parseFloat(value));
              }} value={hours}>
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
    </div>
  );
};

export default FormSection;
