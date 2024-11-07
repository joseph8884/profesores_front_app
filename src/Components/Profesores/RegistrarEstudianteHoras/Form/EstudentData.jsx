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

        {/* Country Code Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Country Code
          </label>
          <input
            type="text"
            value={studentData.countryCode}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter country code"
          />
        </div>

        {/* Phone Number Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            value={studentData.phoneNumber }
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter phone number"
          />
        </div>

        {/* Hours Purchased Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Hours Purchased
          </label>
          <input
            type="number"
            value={studentData.hoursPurchased} // Changed from horasPlaneadas
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Hours Spent Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Hours Spent
          </label>
          <input
            type="number"
            value={studentData.hoursSpented} // Changed from horasRestantes
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Last Log Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Log
          </label>
          <input
            type="text"
            value={studentData.lastLog ? new Date(studentData.lastLog).toLocaleString() : "N/A"} // Changed from lastRegister
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </form>
</>
  );
};

export default EstudentData;
