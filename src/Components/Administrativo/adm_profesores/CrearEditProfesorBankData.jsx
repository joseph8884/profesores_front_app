import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import Loader from "../../Loader/Loader";
import { getBankDataTeacherbyID } from "../../../provider/adm/profesores/BankData/getBankData";
import { postBankData } from "../../../provider/adm/profesores/BankData/postBankData";
import { putBankData } from "../../../provider/adm/profesores/BankData/PutBankData";
const CrearEditarProfesorBankData = ({ personal_info_teacher }) => {
  const [bankdata, setBankData] = useState({});
  const [contractCity, setContractCity] = useState("");
  const [virtualHourValue, setVirtualHourValue] = useState(1.2);
  const [inpersonTimeValue, setInpersonTimeValue] = useState(1.2);
  const [bankAccountNumber, setBankAccountNumber] = useState(1);
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
        if (bankdata) {
          await putBankData(formattedData);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } 
      } catch (error) {
        console.error("Error updating student:", error);
        
        console.log("trying to post it ...");
        try {
          await postBankData(formattedData);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } catch (error) {
          console.error("Error posting bank data:", error);
        }        
      } finally {
        setLoading(false);
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
            onChange={(e) => setVirtualHourValue(parseFloat(e.target.value))}
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
            onChange={(e) => setInpersonTimeValue(parseFloat(e.target.value))}
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
            onChange={(e) => setBankAccountNumber(parseInt(e.target.value))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
