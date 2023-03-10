export const waait = () => new Promise(res => setTimeout(res, Math.random() * 2000));


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
    budgetId,
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
        budgetId: budgetId
    };
    const existingApplications = fetchData("applications") ?? [];
    return localStorage.setItem("applications",
        JSON.stringify([...existingApplications, newItem])
    );
};

// delete item

export const deleteData = ({ key }) => {
    return localStorage.removeItem(key);
};