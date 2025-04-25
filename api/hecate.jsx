import axios from "axios";
import { CREATE_EVENT_ENDPOINT, GET_EVENT_DETAILS_ENDPOINT, REGISTER_FOR_EVENT_ENDPOINT, UNREGISTER_FOR_EVENT_ENDPOINT,GET_STUDENT_RECORDS_ENDPOINT } from "./api";
import { getLocalStorageData, JWT_TOKEN_KEY } from "../utils/local_storage";

export const performGetEventDetails = async () => {
    try {
        const response = await axios.get(
            GET_EVENT_DETAILS_ENDPOINT, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getLocalStorageData(JWT_TOKEN_KEY)
                },
            }
        );
        return response
    } catch (err) {
        console.error("Entity get failed", err);
        throw new Error(err.response?.data?.message || "Entity Get failed");
    }
};

export const performCreateEvent = async (event_details) => {
    try {
      const response = await axios.post(
        CREATE_EVENT_ENDPOINT,
        {
            event_details
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
      console.error("Create event error:", err);
      throw new Error(err.response?.data?.message || "Create event failed");
    }
};

export const performRegisterForEvent = async (event_id) => {
    try {
      const response = await axios.post(
        REGISTER_FOR_EVENT_ENDPOINT,
        {
          event_id: event_id
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
      console.error("Register for event error:", err);
      throw new Error(err.response?.message || "Register for event failed");
    }
};

export const performUnRegisterForEvent = async (event_id) => {
    try {
      const response = await axios.post(
        UNREGISTER_FOR_EVENT_ENDPOINT,
        {
          event_id: event_id
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
      console.error("UnRegister for event error:", err);
      throw new Error(err.response?.data?.message || "UnRegister for event failed");
    }
};



export const performGetStudentRecords = async (username) => {
  try {
      const response = await axios.post(
        GET_STUDENT_RECORDS_ENDPOINT,
        {
          username
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
      console.error("Event records fetch failed", err);
      throw new Error(err.response?.data?.message || "Event records fetch failed");
  }
};

// export const performGetStudentRecords = async (studentId) => {
//   try {
//       if (!studentId || !/^[A-Z0-9]+$/.test(studentId)) {
//         throw new Error("Invalid Student ID format");
//         }
//       const token = getLocalStorageData(JWT_TOKEN_KEY);
//       if (!token) {
//           throw new Error("No JWT token found");
//       }
//       console.log("Endpoint:", GET_STUDENT_RECORDS_ENDPOINT); // For debugging
//       const response = await axios.get(
//           GET_STUDENT_RECORDS_ENDPOINT,
//           {
//               headers: {
//                   'Content-Type': 'application/json',
//                   'Authorization': getLocalStorageData(JWT_TOKEN_KEY)
//               },
//               params: {
//                 username: studentId // Changed to student_id
//             }
//           }
//       );
//       return response;
//   } catch (err) {
//       console.error("Student records get failed:", {
//           message: err.message,
//           status: err.response?.status,
//           data: JSON.stringify(err.response?.data, null, 2),
//       });
//       throw new Error(err.response?.data?.message || "Student records get failed");
//   }
// };