import { getEnvWithFallback } from "../utils/env";

export const BASE_URL = getEnvWithFallback("API_PREFIX", "http://139.59.194.231:8081/srm/linckapiv1/");
export const AUTH_PREFIX = getEnvWithFallback("AUTH_PREFIX", "auth/");
export const GANDALF_PREFIX = getEnvWithFallback("GANDALF_PREFIX", "gandalf/");
export const HECATE_PREFIX = getEnvWithFallback("HECATE_PREFIX", "hecate/events/");
export const ODYSSEY_PREFIX = getEnvWithFallback("ODYSSEY_PREFIX", "odyssey/");
export const HECATE_STUDENT_PREFIX = getEnvWithFallback("HECATE_STUDENT_PREFIX", "hecate/students/");


export const ERROR_STATUS_CODE = 401;

// Auth Endpoints
export const LOGIN_ENDPOINT = `${BASE_URL}${AUTH_PREFIX}login`;
export const LOGOUT_ENDPOINT = `${BASE_URL}${AUTH_PREFIX}logout`;
export const CHANGE_PASSWORD_ENDPOINT = `${BASE_URL}${AUTH_PREFIX}change_password`;
export const VALIDATE_ENDPOINT = `${BASE_URL}${AUTH_PREFIX}validate`;
export const UPDATE_CONTACT_NUMBER_ENDPOINT = `${BASE_URL}${AUTH_PREFIX}update_mobile_number`;
export const GET_USER_DETAILS_ENDPOINT = `${BASE_URL}${AUTH_PREFIX}user/details`;


// Gandalf Endpoints
export const GET_ENTITY_ENDPOINT = `${BASE_URL}${GANDALF_PREFIX}entity/details`;
export const CREATE_ENTITY_ENDPOINT = `${BASE_URL}${GANDALF_PREFIX}entity/create/entity`;
export const GET_REGISTERED_CLUB_ENDPOINT = `${BASE_URL}${GANDALF_PREFIX}user/registered_entity`;
export const GET_LEGACY_HOLDERS = `${BASE_URL}${GANDALF_PREFIX}entity/legacy_holders`;



// Hecate Endpoints
export const GET_EVENT_DETAILS_ENDPOINT = `${BASE_URL}${HECATE_PREFIX}details`;
export const CREATE_EVENT_ENDPOINT = `${BASE_URL}${HECATE_PREFIX}create/event`;
export const REGISTER_FOR_EVENT_ENDPOINT = `${BASE_URL}${HECATE_PREFIX}register`;
export const UNREGISTER_FOR_EVENT_ENDPOINT = `${BASE_URL}${HECATE_PREFIX}unregister`;
export const GET_STUDENT_RECORDS_ENDPOINT = `${BASE_URL}${HECATE_STUDENT_PREFIX}event/records`;


// Odyssey Endpoints
export const GET_REPORT_DETAILS_ENDPOINT = `${BASE_URL}${ODYSSEY_PREFIX}report/details`;



// export const GET_STUDENT_RECORDS_ENDPOINT = `${BASE_URL}${HECATE_STUDENT_PREFIX}hecate/students/event/records`;
