import React from 'react';

const DeleteMember = ({ member, onClose, onDelete }) => (
  <div className="p-6 bg-dark1 text-white rounded-lg w-full">
    <h2 className="text-2xl font-semibold text-center mb-4">Confirm Delete</h2>
    <p className="text-lg text-center mb-6">
      Are you sure you want to delete <span className="font-bold">{`${member.first_name} ${member.last_name}`}</span>?
    </p>
    
    <div className="flex justify-between gap-4">
      <button
        onClick={onClose}
        className="w-full py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
      >
        Cancel
      </button>
      <button
        onClick={() => {
          onDelete(member.user_id); // Handle deletion logic
          onClose();
        }}
        className="w-full py-2 bg-red-600 text-white font-semibold rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
      >
        Confirm Delete
      </button>
    </div>
  </div>
);

export default DeleteMember;
