import axios from "axios";
import { LOGIN_ENDPOINT, LOGOUT_ENDPOINT, VALIDATE_ENDPOINT, CHANGE_PASSWORD_ENDPOINT, UPDATE_CONTACT_NUMBER_ENDPOINT, GET_USER_DETAILS_ENDPOINT } from "./api.jsx"
import { encodeBase64 } from "../utils/encoder.jsx"
import { getLocalStorageData, JWT_TOKEN_KEY } from "../utils/local_storage.jsx";

export const performLogin = async (username, password, rememberMe) => {
  try {
    const response = await axios.post(
      LOGIN_ENDPOINT,
      {
        username,
        password: encodeBase64(password),
        remember_me: rememberMe
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  } catch (err) {
    console.error("Login error:", err);
    throw new Error(err.response?.data?.message || "Login failed");
  }
};

export const performLogout = async () => {
  try {
    await axios.post(
      LOGOUT_ENDPOINT,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getLocalStorageData(JWT_TOKEN_KEY)
        },
      }
    );
    localStorage.removeItem(JWT_TOKEN_KEY);
  } catch (err) {
    console.error("Logout error:", err);
    throw new Error(err.response?.data?.message || "Logout failed");
  }
};

export const performChangePassword = async (old_password, new_password, confirmPassword) => {
  try {
    const response = await axios.post(
      CHANGE_PASSWORD_ENDPOINT,
      {
        old_password: encodeBase64(old_password),
        new_password: encodeBase64(new_password),
        confirm_new_password: encodeBase64(confirmPassword)
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
    console.error("ChangePassword error:", err);
    throw new Error(err.response?.data?.message || "ChangePassword failed");
  }
};

export const performValidate = async () => {
  try {
    const response = await axios.post(
      VALIDATE_ENDPOINT,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getLocalStorageData(JWT_TOKEN_KEY)
        },
      }
    );
    return response;
  } catch (err) {
    console.error("Validate call error:", err);
    throw new Error(err.response?.data?.message || "Validate call failed");
  }
};

export const performUpdateContactNumber = async (contact_number) => {
  try {
    const response = await axios.post(
      UPDATE_CONTACT_NUMBER_ENDPOINT,
      {
        contact_number
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
    console.error("Update Contact Number error:", err);
    throw new Error(err.response?.data?.message || "Update Contact Number failed");
  }
};

export const performGetUserDetails = async () => {
  try {
      const response = await axios.get(
          GET_USER_DETAILS_ENDPOINT, 
          {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': getLocalStorageData(JWT_TOKEN_KEY)
              },
          }
      );
      return response
  } catch (err) {
      console.error("User Details get failed: ", err);
      throw new Error(err.response?.data?.message || "User Details Get failed");
  }
};