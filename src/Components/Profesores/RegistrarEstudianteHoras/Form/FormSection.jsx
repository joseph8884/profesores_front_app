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
  const [showCancellation, setShowCancellation] = useState(false);

  // Manejo de cambios en los inputs
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
    setShowCancellation(value === "false"); // Mostrar sección de cancelación si no se realizó la clase
  };

  // Función para convertir la duración a horas
  const convertDurationToHours = (duration) => {
    if (duration === "30min") return 0.5;
    if (duration === "1hr") return 1;
    if (duration === "2hr") return 2;
    if (duration === "3hr") return 3;
    return 0; // Valor por defecto si no coincide
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      date,
      classType,
      hours: convertDurationToHours(hours), // Convertir a horas numéricas
      comments,
      topics,
      cancellationTiming,
      cancelledBy,
      cancellationReason,
      classHeld: classHeld === "true",
    };
    console.log(JSON.stringify(formData, null, 2)); // Imprimir en consola
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="hours">
          <div className="attandance">
            <label className="mb-2 font-semibold">
              ¿Se hizo la clase?
              <Select
                onValueChange={handleAttendanceChange}
                value={classHeld}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Sí</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </label>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">
              Fecha y hora de inicio:
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
              Tipo de clase:
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
                  <SelectItem value="Presencial">Presencial</SelectItem>
                </SelectContent>
              </Select>
            </label>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">
              Duración (horas):
              <Select
                name="hours"
                onValueChange={setHours}
                value={hours}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Duratio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30min">30 minutos</SelectItem>
                  <SelectItem value="1hr">1 hora</SelectItem>
                  <SelectItem value="2hr">2 horas</SelectItem>
                  <SelectItem value="3hr">3 horas</SelectItem>
                </SelectContent>
              </Select>
            </label>
          </div>
        </div>

        <div className="reson">
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">
              Comentarios:
              <Textarea
                name="comments"
                value={comments}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">
              Temática vista:
              <Textarea
                name="topics"
                value={topics}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>

        {/* Mostrar sección de cancelación solo si classHeld es "false" */}
        {classHeld === "false" && (
          <div className="cancelation">
            <div className="flex flex-col">
              <label className="mb-2 font-semibold">
                ¿Cancelación a tiempo?
                <Select
                  name="cancellationTiming"
                  onValueChange={setCancellationTiming}
                  value={cancellationTiming}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Cancelation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A tiempo">A tiempo</SelectItem>
                    <SelectItem value="Sobre el tiempo">
                      Sobre el tiempo
                    </SelectItem>
                  </SelectContent>
                </Select>
              </label>
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-semibold">
                ¿Quién canceló?
                <Select
                  name="cancelledBy"
                  onValueChange={setCancelledBy}
                  value={cancelledBy}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Cancelled by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Estudiante">Estudiante</SelectItem>
                    <SelectItem value="Profesor">Profesor</SelectItem>
                  </SelectContent>
                </Select>
              </label>
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-semibold">
                Motivo de la cancelación:
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
          <Button type="submit">
            Enviar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormSection;
