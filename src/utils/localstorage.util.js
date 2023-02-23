export const setLocalStorageVariable = (key, value) => {
  return localStorage.setItem(key, value);
};

export const getLocalStorageVariable = (key) => {
  return localStorage.getItem(key);
};

export const removeLocalStorageVariable = (key) => {
  return localStorage.removeItem(key);
};

export const setSessionStorageVariable = (key, value) => {
  return sessionStorage.setItem(key, value);
};

export const getSessionStorageVariable = (key) => {
  return sessionStorage.getItem(key);
};
