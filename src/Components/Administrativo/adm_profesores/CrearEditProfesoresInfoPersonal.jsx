import React, { useState } from "react";
import { Button } from "../../ui/button";
import PhoneInput from "react-phone-input-2";
import Loader from "../../Loader/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../ui/dialog";
import { postorputTeacher } from "../../../provider/adm/profesores/postorputTeacher";

const CrearEditarProfesorInfoPersonal = ({ data, context }) => {
  const [email, setEmail] = useState(data.email || "");
  const [fullName, setFullName] = useState(data.fullName || "");
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber || "");
  const [emergencyContact, setemergencyContact] = useState(
    data.emergencyContact || ""
  );
  const [identificationType, setIdentificationType] = useState(
    data.identificationType || ""
  );
  const [identificationNumber, setidentificationNumber] = useState(
    data.identificationNumber || ""
  );
  const [respuesta, setRespuesta] = useState("");

  const [loading, setLoading] = useState(false); // Estado para manejar el loading

  const validateFields = () => {
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const phoneRegex = /^[0-9]+$/;

    if (!fullName || !nameRegex.test(fullName)) {
      // Changed from name to fullName
      setRespuesta("Please enter a valid name.");
      return false;
    }

    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      setRespuesta("Please enter a valid phone number.");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateFields()) return;
    setLoading(true);

    const updatedData = {
      fullName,
      email,
      phoneNumber,
      emergencyContact,
      identificationType,
      identificationNumber,
      registerDate: new Date().toISOString(),
    };

    try {
      var response = await postorputTeacher(updatedData, data.id);
      console.log("Response:", response);
      setRespuesta(`${response.message}\n with User email: ${updatedData.email}`);
    } catch (error) {
      console.error("Error updating student:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-m font-semibold text-gray-900">
            Nombre completo
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-2 block w-full border-gray-300 rounded-md shadow-sm text-m p-1"
            placeholder="Enter full name"
          />
        </div>
        <div>
          <label className="block text-m font-semibold text-gray-900">
            Email
          </label>
          <input
            id="email"
            placeholder="Enter email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 block w-full border-gray-300 rounded-md shadow-sm text-m p-1"
          />
        </div>

        <div>
          <label className="block text-m font-semibold text-gray-900">
            Número de telefono
          </label>
          <PhoneInput
            country={"co"}
            value={phoneNumber}
            onChange={(value) => {
              setPhoneNumber(value);
            }}
          />
        </div>
        <div>
          <label className="block text-m font-semibold text-gray-900">
            Contacto de Emergencia
          </label>
          <PhoneInput
            country={"co"}
            value={emergencyContact}
            onChange={(value) => {
              setemergencyContact(value);
            }}
          />
        </div>
        <div>
          <label className="block text-m font-semibold text-gray-900">
            Tipo de identificación
          </label>
          <Select
            defaultValue={identificationType}
            onValueChange={(value) => setIdentificationType(value)}
          >
            <SelectTrigger className="w-[100%]">
              <SelectValue placeholder="Tipo de identificacion" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CC">Cedula de Ciudadania</SelectItem>
              <SelectItem value="Pasaporte">Pasaporte</SelectItem>
              <SelectItem value="Visa">Visa</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-m font-semibold text-gray-900">
            Numero de identificación
          </label>
          <input
            type="number"
            value={identificationNumber} // Changed from horasPlaneadas
            onChange={(e) => setidentificationNumber(parseInt(e.target.value))} // Changed from setHorasPlaneadas
            placeholder="Enter identification number"
            className="mt-2 block w-full border-gray-300 rounded-md shadow-sm text-m p-1 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        {data.registerDate && (
          <div>
            <label className="block text-m font-semibold text-gray-900">
              Fecha de registro
            </label>
            <input
              type="text"
              value={
                data.registerDate
                  ? new Date(data.registerDate).toLocaleString()
                  : "No debe ingresar nada aca"
              } // Changed from lastRegister
              className="mt-2 block w-full border-gray-300 rounded-md shadow-sm text-m p-1"
              readOnly
            />
          </div>
        )}

        {/* Save Button */}
        <div className="pt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md text-lg"
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <div className="overflow-y-auto max-h-[70vh] p-5">
                <div className="grid gap-4 py-4">
                  <pre className="bg-gray-100 p-4 rounded-md">{respuesta}</pre>
                  <Button
                    onClick={() => {
                      navigator.clipboard
                        .writeText(respuesta)
                        .then(() => {
                          alert("Texto copiado al portapapeles");
                        })
                        .catch((err) => {
                          console.error(
                            "Error al copiar al portapapeles: ",
                            err
                          );
                        });
                    }}
                    className="mt-2"
                  >
                    Copiar al portapapeles
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </form>
    </>
  );
};

export default CrearEditarProfesorInfoPersonal;
