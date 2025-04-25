export const JWT_TOKEN_KEY = "auth-token";

export const getLocalStorageData = (key) => {
    return localStorage.getItem(key);
};

export const setLocalStorageData = (key, data) => {
    localStorage.setItem(key, data);
};
