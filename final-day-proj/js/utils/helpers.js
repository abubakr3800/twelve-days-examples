// Helper utility functions

// Format date
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
};

// Format time
export const formatTime = (date) => {
    return new Date(date).toLocaleTimeString();
};

// Format date and time
export const formatDateTime = (date) => {
    return new Date(date).toLocaleString();
};

// Format relative time
export const formatRelativeTime = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} day${days === 1 ? '' : 's'} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else {
        return 'Just now';
    }
};

// Debounce function
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle function
export const throttle = (func, limit) => {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Show notification
export const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span class="icon">${getNotificationIcon(type)}</span>
        <span class="message">${message}</span>
    `;

    const container = document.getElementById('notificationContainer');
    container.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
};

// Get notification icon
const getNotificationIcon = (type) => {
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    return icons[type] || icons.info;
};

// Generate unique ID
export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Deep clone object
export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

// Check if object is empty
export const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
};

// Get object keys
export const getKeys = (obj) => {
    return Object.keys(obj);
};

// Get object values
export const getValues = (obj) => {
    return Object.values(obj);
};

// Get object entries
export const getEntries = (obj) => {
    return Object.entries(obj);
};

// Filter object
export const filterObject = (obj, predicate) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([key, value]) => predicate(key, value))
    );
};

// Map object
export const mapObject = (obj, mapper) => {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, mapper(value)])
    );
};

// Reduce object
export const reduceObject = (obj, reducer, initialValue) => {
    return Object.entries(obj).reduce(
        (acc, [key, value]) => reducer(acc, key, value),
        initialValue
    );
};

// Group array by key
export const groupBy = (array, key) => {
    return array.reduce((result, item) => {
        const group = item[key];
        result[group] = result[group] || [];
        result[group].push(item);
        return result;
    }, {});
};

// Sort array by key
export const sortBy = (array, key, order = 'asc') => {
    return [...array].sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];
        return order === 'asc' ? aValue > bValue : aValue < bValue;
    });
};

// Filter array by predicate
export const filterArray = (array, predicate) => {
    return array.filter(predicate);
};

// Map array
export const mapArray = (array, mapper) => {
    return array.map(mapper);
};

// Reduce array
export const reduceArray = (array, reducer, initialValue) => {
    return array.reduce(reducer, initialValue);
};

// Find array element
export const findArray = (array, predicate) => {
    return array.find(predicate);
};

// Find array index
export const findIndexArray = (array, predicate) => {
    return array.findIndex(predicate);
};

// Check if array includes element
export const includesArray = (array, element) => {
    return array.includes(element);
};

// Check if array is empty
export const isEmptyArray = (array) => {
    return array.length === 0;
};

// Get array length
export const getArrayLength = (array) => {
    return array.length;
};

// Get array first element
export const getFirstElement = (array) => {
    return array[0];
};

// Get array last element
export const getLastElement = (array) => {
    return array[array.length - 1];
};

// Get array slice
export const getArraySlice = (array, start, end) => {
    return array.slice(start, end);
};

// Get array unique elements
export const getUniqueElements = (array) => {
    return [...new Set(array)];
};

// Get array intersection
export const getArrayIntersection = (array1, array2) => {
    return array1.filter(x => array2.includes(x));
};

// Get array union
export const getArrayUnion = (array1, array2) => {
    return [...new Set([...array1, ...array2])];
};

// Get array difference
export const getArrayDifference = (array1, array2) => {
    return array1.filter(x => !array2.includes(x));
};

// Get array symmetric difference
export const getArraySymmetricDifference = (array1, array2) => {
    return array1.filter(x => !array2.includes(x))
        .concat(array2.filter(x => !array1.includes(x)));
}; 