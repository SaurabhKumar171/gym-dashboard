import React from 'react';

const DeleteMember = ({ member, onClose, onDelete }) => (
  <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
    <h2 className="text-2xl font-semibold text-center mb-4">Confirm Delete</h2>
    <p className="text-lg text-center text-gray-700 mb-6">
      Are you sure you want to delete <span className="font-bold">{member.name}</span>?
    </p>
    
    <div className="flex justify-between gap-4">
      <button
        onClick={onClose}
        className="w-full py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Cancel
      </button>
      <button
        onClick={() => {
          onDelete(member.id); // Handle deletion logic
          onClose();
        }}
        className="w-full py-2 bg-red-600 text-white font-semibold rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Confirm Delete
      </button>
    </div>
  </div>
);

export default DeleteMember;
