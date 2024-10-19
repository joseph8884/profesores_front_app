import { Button } from "../../../ui/button";
const EstudentData = ({ studentData }) => {
    return(
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
            <form className="space-y-4">
              {/* Full Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={studentData.name || ""}
                  onChange={() => {}}
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
                  value={studentData.email || ""}
                  onChange={() => {}}
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
                  value={studentData.countryCode || ""}
                  onChange={() => {}}
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
                  value={studentData.phoneNumber || ""}
                  onChange={() => {}}
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
                  value={parseInt(studentData.horasPlaneadas) || 0}
                  onChange={() => {}}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              {/* Hours Spent Field*/}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hours Spent
                </label>
                <input
                  type="number"
                  value={parseInt(studentData.horasRestantes) || 0}
                  onChange={() => {}}
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
                  value={
                    studentData.lastRegister
                      ? new Date(studentData.lastRegister).toLocaleString()
                      : "N/A"
                  }
                  onChange={() => {}}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              {/* Save Button */}
              <div className="pt-4">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md">
                  Save Changes
                </Button>
              </div>
            </form>
        </>
    );
};
export default EstudentData;