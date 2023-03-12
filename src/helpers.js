export const waait = () => new Promise(res => setTimeout(res, Math.random() * 800));


// colors
const generateRandomColor = () => {
    const existingRoleLength = fetchData("roles")?.length ?? 0;

    return `${existingRoleLength * 34} 65% 50%`;

};

// Local storage for now

export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

// Create job roles

export const createNewRole = ({ name, amount }) => {
    const newItem = {
        id: crypto.randomUUID(),
        name,
        amount: +amount,
        createdAt: Date.now(),
        color: generateRandomColor()
    };
    const existingRoles = fetchData("roles") ?? [];
    return localStorage.setItem("roles",
        JSON.stringify([...existingRoles, newItem])
    );
};

// Create job application

export const createApplication = ({
    name,
    roleId,
    source,
    deadlineDate,
    status,
    notes
}) => {
    const newItem = {
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        name,
        source,
        status,
        notes,
        deadlineDate,
        roleId: roleId
    };
    const existingApplications = fetchData("applications") ?? [];
    return localStorage.setItem("applications",
        JSON.stringify([...existingApplications, newItem])
    );
};

// delete item

// delete item from local storage
export const deleteData = ({ key, id }) => {
    const existingData = fetchData(key);
    if (id) {
        const newData = existingData.filter((item) => item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
};

// total applied

export const totalApplied = (roleId) => {
    const applications = fetchData("applications") ?? [];
    return applications.filter(app => app.roleId === roleId).length;
};

// total remaining

export const totalRemaining = (roleId) => {
    const role = fetchData("roles").find(role => role.id === roleId);
    return role.amount - totalApplied(roleId);
};

// get role from roles

export const getRole = (roleId) => {
    const roleData = fetchData("roles").find(role => role.id === roleId);
    return roleData;
};

// get all items from local storage

export const getAllMatchingItems = ({ category, key, value }) => {
    const data = fetchData("roles") ?? [];
    return data.filter(item => item[category] === key && item[key] === value);
};