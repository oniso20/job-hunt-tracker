// Local storage for now

export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};