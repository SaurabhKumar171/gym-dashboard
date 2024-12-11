import React, { useState, useEffect } from 'react';
import { addUser } from '../../../services/operations/userApis';
import { getAllPlans } from '../../../services/operations/plansApis';

const AddMember = ({ onClose }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    role: 'member', // Default role
    image: null, // New field for image
    subscription_from: '', // New date field
    subscription_to: '', // New date field
    plan_id: '',
    amount: '', // New field for amount
  });

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const resp = await getAllPlans();
        setPlans(resp?.data);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };
    fetchPlans();
  }, []);

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
      const imageUrl = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        image: imageUrl, // Store the image URL to display preview
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, image, subscription_from, subscription_to, amount, ...restData } = formData;

    // Ensure dates are in the correct format (YYYY-MM-DD)
    const formattedSubscriptionFrom = new Date(subscription_from).toISOString().split('T')[0];
    const formattedSubscriptionTo = new Date(subscription_to).toISOString().split('T')[0];

    const memberData = {
      ...restData,
      ...(formData.role === 'admin' && { password }), // Include password only if role is admin
      status: 'active', // Automatically set status to active
      image, // Include image URL in the submitted data
      subscription_from: formattedSubscriptionFrom,
      subscription_to: formattedSubscriptionTo,
      amount, // Include amount in the submitted data
    };

    addUser(memberData);
    onClose();
  };

  return (
    <div className="p-4 bg-dark1 text-white rounded-lg w-full max-w-[700px] mx-auto">
      <h2 className="text-xl font-semibold text-center mb-4">Add Member</h2>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={handleSubmit}
      >
        {/* Image Upload and Preview */}
        <div className="col-span-1 md:col-span-2 mb-4">
          <label className="block text-sm font-medium">Profile Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
          />
          {formData.image && (
            <div className="mt-2 flex justify-center">
              <img
                src={formData.image}
                alt="Preview"
                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-md"
              />
            </div>
          )}
        </div>

        {/* First Name */}
        <div>
          <label className="block text-sm font-medium">First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
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
            className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
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
            className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
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
            className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
            minLength={10}
            maxLength={10}
            required
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium">Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
            required
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
            <option value="trainer">Trainer</option>
          </select>
        </div>

        {/* Password - Show only if Role is Admin */}
        {formData.role === 'admin' && (
          <div>
            <label className="block text-sm font-medium">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
              required
            />
          </div>
        )}

        {/* Subscription From Date */}
        <div>
          <label className="block text-sm font-medium">Subscription From:</label>
          <input
            type="date"
            name="subscription_from"
            value={formData.subscription_from}
            onChange={handleInputChange}
            className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
            required
          />
        </div>

        {/* Subscription To Date */}
        <div>
          <label className="block text-sm font-medium">Subscription To:</label>
          <input
            type="date"
            name="subscription_to"
            value={formData.subscription_to}
            onChange={handleInputChange}
            className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
            required
          />
        </div>

        {/* Plan Dropdown */}
        <div>
          <label className="block text-sm font-medium">Select Plan:</label>
          <select
            name="plan_id"
            value={formData.plan_id}
            onChange={handleInputChange}
            className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
            required
          >
            <option value="">Select a plan</option>
            {plans.length > 0 ? (
              plans.map((plan) => (
                <option key={plan?.plan_id} value={plan?.plan_id} className='capitalize'>
                  {plan?.plan_name}
                </option>
              ))
            ) : (
              <option value="">Loading plans...</option>
            )}
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium">Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-dark1"
            required
          />
        </div>

        {/* Buttons */}
        <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-4 justify-center">
          <button
            type="submit"
            className="w-full md:w-auto px-4 py-2 bg-primary hover:bg-secondary text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Member
          </button>
          <button
            onClick={onClose}
            type="button"
            className="w-full md:w-auto px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMember;
