import axios from "axios";
import { getLocalStorageData, JWT_TOKEN_KEY } from "../utils/local_storage";
import { GET_REPORT_DETAILS_ENDPOINT } from "./api";

export const performGetReportDetails = async () => {
    try {
        const response = await axios.get(
            GET_REPORT_DETAILS_ENDPOINT, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getLocalStorageData(JWT_TOKEN_KEY)
                },
            }
        );
        return response
    } catch (err) {
        console.error("Report details get failed", err);
        throw new Error(err.response?.data?.message || "Report details Get failed");
    }
};