const BASE_URL = process.env.REACT_APP_BASE_URL;

// Member endpoints
export const userEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "users/getUser",
    ADD_USER_DETAILS_API: BASE_URL + "users/addUser",
    DELETE_USER_DETAILS_API: BASE_URL + "users/deleteUser",
    EDIT_USER_DETAILS_API: BASE_URL + "users/updateUser",
}