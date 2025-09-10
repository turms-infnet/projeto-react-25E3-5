const Storage = {
    getItem: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error("Error parsing JSON from localStorage", error);
            return item;
        }
    },
    setItem: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: (key) => {
        localStorage.removeItem(key);
    }
};

export default Storage;