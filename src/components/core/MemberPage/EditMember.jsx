import React, { useState, useEffect } from "react";
import { editUser } from "../../../services/operations/userApis";

const EditMember = ({ member, onClose }) => {
  const [formData, setFormData] = useState({
    user_id: member.user_id || "",
    first_name: member.first_name || "",
    last_name: member.last_name || "",
    email: member.email || "",
    phone_number: member.phone_number || "",
    address: member.address || "",
    status: member.status || "active",
    profile_image_url: member.profile_image_url || "",
    role: member.role || "member",
  });

  const [image, setImage] = useState(null);

  // Set initial image preview if the user already has a profile image URL
  useEffect(() => {
    if (member.profile_image_url) {
      setImage(member.profile_image_url); // Existing image URL
    }
  }, [member]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Set the file for preview
      setFormData((prevData) => ({
        ...prevData,
        profile_image_url: file, // Add the file to the form data
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object to send the image and other data
    const data = new FormData();
    data.append("user_id", formData.user_id);
    data.append("first_name", formData.first_name);
    data.append("last_name", formData.last_name);
    data.append("email", formData.email);
    data.append("phone_number", formData.phone_number);
    data.append("address", formData.address);
    data.append("status", formData.status);
    data.append("profile_image_url", formData.profile_image_url);
    data.append("role", formData.role);

    // Call the editUser function with the form data
    editUser(data);
    onClose();
  };

  return (
    <div className="p-6 bg-dark1 text-white rounded-lg w-full max-w-3xl mx-auto sm:h-[40em] sm:overflow-y-scroll">
      <h2 className="text-2xl font-semibold text-center mb-6">Edit Member</h2>
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium">First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
            required
          />
        </div>
        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium">Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
          />
        </div>
        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
            required
          />
        </div>
        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium">Phone Number:</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
          />
        </div>
        {/* Address */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium">Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
          />
        </div>
        {/* Image Upload */}
        <div className="col-span-1 sm:col-span-2 mb-4">
          <label className="block text-sm font-medium">Profile Image:</label>
          <input
            type="file"
            name="profile_image_url"
            onChange={handleFileChange}
            className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
          />
          {image && (
            <div className="mt-2 flex justify-center">
              <img
                src={image}
                alt="Preview"
                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-md"
              />
            </div>
          )}
        </div>
        {/* Role */}
        <div>
          <label className="block text-sm font-medium">Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
            <option value="trainer">Trainer</option>
          </select>
        </div>
        {/* Status */}
        <div>
          <label className="block text-sm font-medium">Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        {/* Buttons */}
        <div className="sm:col-span-2 flex flex-col md:flex-row justify-center md:gap-6 gap-3">
          <button
            type="submit"
            className="px-6 py-2 bg-primary hover:bg-secondary text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
            type="button"
            className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMember;
