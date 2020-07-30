const setLocalStorage = (key, value) => setLocalStorage(key, JSON.stringify(value));

const getLocalStorage = (key) => JSON.parse(getLocalStorage(key));

export { setLocalStorage, getLocalStorage };
