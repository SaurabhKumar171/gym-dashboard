import { userEndpoints } from "../api";
import { apiConnector } from "../apiconnector";

// Destructure API endpoints for better readability
const {
    GET_USER_DETAILS_API,
    ADD_USER_DETAILS_API,
    DELETE_USER_DETAILS_API,
    EDIT_USER_DETAILS_API
} = userEndpoints;

/**
 * Fetch user details with pagination.
 *
 * @param {number} page - The current page number.
 * @param {number} limit - The number of users to fetch per page.
 * @returns {Promise<object>} - The user details data.
 */
export const getUserDetails = async (page, limit) => {
    try {
        const response = await apiConnector("POST", GET_USER_DETAILS_API, { page, limit });
        return response?.data;
    } catch (error) {
        console.error("Error fetching user details:", error);
        throw error; // Rethrow error to handle it at the call site
    }
};

/**
 * Add a new user to the system.
 *
 * @param {object} bodyData - The data for the new user.
 * @returns {Promise<object>} - The response after adding the user.
 */
export const addUser = async (bodyData) => {
    try {
        const response = await apiConnector("POST", ADD_USER_DETAILS_API, bodyData);
        return response?.data;
    } catch (error) {
        console.error("Error adding user:", error);
        throw error; // Rethrow error to handle it at the call site
    }
};

/**
 * Delete a user by their ID.
 *
 * @param {string | number} user_id - The ID of the user to be deleted.
 * @returns {Promise<object>} - The response after deleting the user.
 */
export const deleteUser = async (user_id) => {
    try {
        const response = await apiConnector("POST", DELETE_USER_DETAILS_API, { user_id });
        return response?.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error; // Rethrow error to handle it at the call site
    }
};


export const editUser = async (bodyData) => {
    try {
        const response = await apiConnector("POST", EDIT_USER_DETAILS_API, bodyData);
        return response?.data;
    } catch (error) {
        console.error("Error editing user:", error);
        throw error; // Rethrow error to handle it at the call site
    }
};
