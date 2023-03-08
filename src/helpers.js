// Local storage for now

export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

// delete item

export const deleteData = ({ key }) => {
    return localStorage.removeItem(key);
};