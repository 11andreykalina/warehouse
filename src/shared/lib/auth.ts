const AUTH_STORAGE_KEY = "isAuthenticated";

export const setAuthenticated = () => {
    localStorage.setItem(AUTH_STORAGE_KEY, "true");
};

export const getAuthenticated = () => {
    return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
}