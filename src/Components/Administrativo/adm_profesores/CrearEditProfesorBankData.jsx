import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import Loader from "../../Loader/Loader";
import { getBankDataTeacherbyID } from "../../../provider/adm/profesores/BankData/getBankData";
import { postBankData } from "../../../provider/adm/profesores/BankData/postBankData";

const CrearEditarProfesorBankData = ({ personal_info_teacher, context }) => {
  const [bankdata, setBankData] = useState({});
  const [contractCity, setContractCity] = useState("");
  const [virtualHourValue, setVirtualHourValue] = useState("");
  const [inpersonTimeValue, setInpersonTimeValue] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBankData = async () => {
      try {
        const data = await getBankDataTeacherbyID(personal_info_teacher.id);
        console.log("Bank data:", data);
        setBankData(data);
      } catch (error) {
        console.error("Error fetching bank data:", error);
      }
    };
    fetchBankData();
  }, [personal_info_teacher.id]);

  useEffect(() => {
    if (bankdata) {
      setContractCity(bankdata.contractCity || "");
      setVirtualHourValue(bankdata.virtualHourValue || "");
      setInpersonTimeValue(bankdata.inpersonTimeValue || "");
      setBankAccountNumber(bankdata.bankAccountNumber || "");
      setBankName(bankdata.bankName || "");
    }
  }, [bankdata]);

  const validateFields = () => {
    if (
      !contractCity ||
      !virtualHourValue ||
      !inpersonTimeValue ||
      !bankAccountNumber ||
      !bankName
    ) {
      alert("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    if (window.confirm("Are you sure you want to save the changes?")) {
      setLoading(true);

      const formattedData = {
        contractCity,
        virtualHourValue,
        inpersonTimeValue,
        bankAccountNumber,
        bankName,
        teacherId: personal_info_teacher.id,
      };
        try {
          await postBankData(formattedData);
        } catch (error) {
          console.error("Error creating student:", error);
        } finally {
            setLoading(false);
            window.location.reload();
            }
    }
  };

  return (
    <>
      {loading && <Loader />} {/* Muestra el loader si loading es true */}
      {/* Form */}
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ciudad de Contrato
          </label>
          <input
            type="text"
            value={contractCity}
            onChange={(e) => setContractCity(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter contract city"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Valor por hora virtual
          </label>
          <input
            type="text"
            value={virtualHourValue}
            onChange={(e) => setVirtualHourValue(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter virtual hour value"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Valor por hora presencial
          </label>
          <input
            type="money"
            value={inpersonTimeValue}
            onChange={(e) => setInpersonTimeValue(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter in-person hour value"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Numero de cuenta
          </label>
          <input
            type="number"
            value={bankAccountNumber}
            onChange={(e) => setBankAccountNumber(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter bank account number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre del banco
          </label>
          <input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter bank name"
          />
        </div>

        <div className="pt-4">
          <Button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </form>
    </>
  );
};

export default CrearEditarProfesorBankData;
