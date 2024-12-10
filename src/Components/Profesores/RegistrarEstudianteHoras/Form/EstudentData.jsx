import PhoneInput from "react-phone-input-2";
const EstudentData = ({ studentData }) => {
  return (
    <>
      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
          <img
            src={studentData.photo || "/profilephoto.jpeg"}
            alt="User"
            className="h-32 w-32 object-cover rounded-full"
          />
        </div>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {/* Full Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            value={studentData.fullName} // Changed from name to fullName
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter full name"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={studentData.email}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter email"
          />
        </div>

        {/* Phone Number Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Numero de telefono
          </label>
          <PhoneInput
            country={"co"} // Default country
            value={studentData.phoneNumber}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter phone number"
          />
        </div>

        {/* Hours Purchased Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Hours purchased
          </label>
          <input
            type="numeber"
            value={studentData.latestPurchasedHour.hours} // Changed from horasPlaneadas
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Hours remaining
          </label>
          <input
            type="numeber"
            value={studentData.hoursRemaining} // Changed from horasPlaneadas
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            readOnly
          />
        </div>

        {/* Hours Spent Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Office 
          </label>
          <input
            type="text"
            value={studentData.office} // Changed from horasRestantes
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </form>
</>
  );
};

export default EstudentData;
