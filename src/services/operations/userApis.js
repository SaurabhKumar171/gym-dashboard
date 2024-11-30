import { userEndpoints } from "../api"
import { apiConnector } from "../apiconnector";

const { 
        GET_USER_DETAILS_API,
        DELETE_USER_DETAILS_API

        } = userEndpoints;

export const getUserDetails = async (page, limit) => {
    
    const response = await apiConnector("POST", GET_USER_DETAILS_API, {
        page,
        limit
    });
    const data = response.data;

    return data;
}

export const deleteUser = async (user_id) => {
    
    const response = await apiConnector("POST", DELETE_USER_DETAILS_API, {
        user_id
    });


}