import axios from "axios";
import { CREATE_ENTITY_ENDPOINT, GET_ENTITY_ENDPOINT, GET_REGISTERED_CLUB_ENDPOINT , GET_LEGACY_HOLDERS} from "./api";
import { getLocalStorageData, JWT_TOKEN_KEY } from "../utils/local_storage";

export const performGetEntityDetails = async () => {
    try {
        const response = await axios.get(
            GET_ENTITY_ENDPOINT, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getLocalStorageData(JWT_TOKEN_KEY)
                },
            }
        );
        return response
    } catch (err) {
        console.error("Entity get failed: ", err);
        throw new Error(err.response?.data?.message || "Entity Get failed");
    }
};

export const performGetRegisteredClub = async () => {
    try {
        const response = await axios.get(
            GET_REGISTERED_CLUB_ENDPOINT, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getLocalStorageData(JWT_TOKEN_KEY)
                },
            }
        );
        return response
    } catch (err) {
        console.error("Registered Club get failed: ", err);
        throw new Error(err.response?.data?.message || "GET Registered Club failed");
    }
};

export const performCreateEntity = async (entity_details) => {
    try {
      const response = await axios.post(
        CREATE_ENTITY_ENDPOINT,
        {
            entity_details
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': getLocalStorageData(JWT_TOKEN_KEY)
          },
        }
      );
      return response;
    } catch (err) {
      console.error("Create entity error:", err);
      throw new Error(err.response?.data?.message || "Create entity failed");
    }
};


export const performGetLegacyHolders = async (entity_id) => {
    try {
      const response = await axios.post(
        GET_LEGACY_HOLDERS,
        {
          entity_id
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': getLocalStorageData(JWT_TOKEN_KEY)
          }
        }
      );
      return response;
    } catch (err) {
      console.error("Get legacy holders error:", err);
      throw new Error(err.response?.data?.message || "Get legacy holders failed");
    }
  };