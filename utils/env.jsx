/* global process */


const env = {
    LNK_ENVIRONMENT: "dev",
    API_PREFIX: "http://139.59.194.231:8081/srm/linckapiv1/",
    AUTH_PREFIX: "auth/",
    GANDALF_PREFIX: "gandalf/",
    HECATE_PREFIX: "hecate/events/",
    ODYSSEY_PREFIX: "odyssey/",
    HECATE_STUDENT_PREFIX: "hecate/students/",

}


export const getEnvWithError = (key) => {
    const value = process.env[key];
    if (!value) {
        throw new Error("Missing environment variable: ${key}");
    }
    return value;
}

export const getEnvWithFallback = (key, fallback) => {
    return env[key] || fallback;
}
