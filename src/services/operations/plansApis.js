import { apiConnector } from "../apiconnector";
const { planEndpoints } = require("../api");

const {
    GET_PLAN_DETAILS_API
} = planEndpoints;

export const getAllPlans = async () => {
    try {
        const {data} = await apiConnector("POST", GET_PLAN_DETAILS_API);        
        return data;
    } catch (error) {
        console.error("Error fetching plan details:", error);
        throw error;
    }
}