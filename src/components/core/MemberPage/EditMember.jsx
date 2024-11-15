import React from 'react';

const EditMember = ({ member, onClose }) => (
  <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
    <h2 className="text-2xl font-semibold text-center mb-6">Edit Member</h2>
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name:</label>
        <input
          type="text"
          defaultValue={member.name}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Address:</label>
        <input
          type="text"
          defaultValue={member.address}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone:</label>
        <input
          type="text"
          defaultValue={member.phone}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex justify-between gap-4">
        <button
          type="submit"
          className="w-full py-2 bg-primary hover:bg-secondary text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Save Changes
        </button>
      </div>
    </form>
    <div className="mt-4 text-center">
      <button
        onClick={onClose}
        className="w-full py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Cancel
      </button>
    </div>
  </div>
);

export default EditMember;
