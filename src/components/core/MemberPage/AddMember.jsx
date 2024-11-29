import React from 'react';

const AddMember = ({ onClose }) => (
  <div className="p-4 bg-dark1 text-white rounded-lg w-[700px] mx-auto">
    <h2 className="text-xl font-semibold text-center mb-4">Add Member</h2>
    <form className="grid grid-cols-2 gap-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium">Name:</label>
        <input
          type="text"
          className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
          required
        />
      </div>
      {/* Mobile */}
      <div>
        <label className="block text-sm font-medium">Mobile:</label>
        <input
          type="text"
          className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
          required
        />
      </div>
      {/* Email */}
      <div>
        <label className="block text-sm font-medium">Email:</label>
        <input
          type="email"
          className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
        />
      </div>
      {/* Profile Picture */}
      <div>
        <label className="block text-sm font-medium">Profile Picture URL:</label>
        <input
          type="text"
          className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
        />
      </div>
      {/* Age */}
      <div>
        <label className="block text-sm font-medium">Age:</label>
        <input
          type="number"
          className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
        />
      </div>
      {/* Address */}
      <div>
        <label className="block text-sm font-medium">Address:</label>
        <input
          type="text"
          className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
        />
      </div>
      {/* Subscription Status */}
      <div>
        <label className="block text-sm font-medium">Subscription Status:</label>
        <input
          type="text"
          className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
        />
      </div>
      {/* Subscription ID */}
      <div>
        <label className="block text-sm font-medium">Subscription ID:</label>
        <input
          type="text"
          className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
        />
      </div>
      {/* Join Date */}
      <div>
        <label className="block text-sm font-medium">Join Date:</label>
        <input
          type="date"
          className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
        />
      </div>
      {/* Start Date */}
      <div>
        <label className="block text-sm font-medium">Start Date:</label>
        <input
          type="date"
          className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
        />
      </div>
      {/* End Date */}
      <div className="col-span-2">
        <label className="block text-sm font-medium">End Date:</label>
        <input
          type="date"
          className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
        />
      </div>
      {/* Buttons */}
      <div className="col-span-2 flex justify-between gap-4">
        <button
          type="submit"
          className="w-full py-2 bg-primary hover:bg-secondary text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Member
        </button>
        <button
          onClick={onClose}
          type="button"
          className="w-full py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
);

export default AddMember;
