const GroupData = ({ groupData }) => {
  return (
    <>
      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
          <img
            src={groupData.photo || "/profilephoto.jpeg"}
            alt="User"
            className="h-32 w-32 object-cover rounded-full"
          />
        </div>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {/* Group Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Group Name
          </label>
          <input
            type="text"
            value={groupData.name}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter group name"
            readOnly
          />
        </div>

        {/* Company Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            value={groupData.companyID.name}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter company name"
            readOnly
          />
        </div>

        {/* Company NIT Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company NIT
          </label>
          <input
            type="text"
            value={groupData.companyID.nit}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter company NIT"
            readOnly
          />
        </div>

        {/* Teacher Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Teacher
          </label>
          <input
            type="text"
            value={groupData.teacherDescription.fullName}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter teacher name"
            readOnly
          />
        </div>
      </form>
    </>
  );
};

export default GroupData;