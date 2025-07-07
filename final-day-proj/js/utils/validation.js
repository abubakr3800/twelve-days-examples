// Validation utility functions
export const validateTask = (taskData) => {
    const errors = [];

    // Validate title
    if (!taskData.title) {
        errors.push('Title is required');
    } else if (taskData.title.length < 3) {
        errors.push('Title must be at least 3 characters long');
    } else if (taskData.title.length > 100) {
        errors.push('Title must not exceed 100 characters');
    }

    // Validate description
    if (taskData.description && taskData.description.length > 500) {
        errors.push('Description must not exceed 500 characters');
    }

    // Validate due date
    if (!taskData.dueDate) {
        errors.push('Due date is required');
    } else {
        const dueDate = new Date(taskData.dueDate);
        if (isNaN(dueDate.getTime())) {
            errors.push('Invalid due date');
        } else if (dueDate < new Date()) {
            errors.push('Due date cannot be in the past');
        }
    }

    // Validate priority
    if (!taskData.priority) {
        errors.push('Priority is required');
    } else if (!['low', 'medium', 'high'].includes(taskData.priority)) {
        errors.push('Invalid priority');
    }

    // Validate category
    if (!taskData.category) {
        errors.push('Category is required');
    } else if (!['work', 'personal', 'shopping'].includes(taskData.category)) {
        errors.push('Invalid category');
    }

    // Validate dependencies
    if (taskData.dependencies) {
        if (!Array.isArray(taskData.dependencies)) {
            errors.push('Dependencies must be an array');
        } else {
            for (const depId of taskData.dependencies) {
                if (typeof depId !== 'number') {
                    errors.push('Invalid dependency ID');
                }
            }
        }
    }

    return errors.length > 0 ? errors.join(', ') : null;
};

// Validate search query
export const validateSearchQuery = (query) => {
    if (!query) {
        return null;
    }

    if (query.length < 2) {
        return 'Search query must be at least 2 characters long';
    }

    if (query.length > 50) {
        return 'Search query must not exceed 50 characters';
    }

    return null;
};

// Validate filter
export const validateFilter = (filter) => {
    const validFilters = ['all', 'today', 'upcoming', 'completed'];
    if (!validFilters.includes(filter)) {
        return 'Invalid filter';
    }
    return null;
};

// Validate sort
export const validateSort = (sort) => {
    const validSorts = ['dueDate', 'priority', 'title'];
    if (!validSorts.includes(sort)) {
        return 'Invalid sort option';
    }
    return null;
};

// Validate category
export const validateCategory = (category) => {
    const validCategories = ['work', 'personal', 'shopping'];
    if (!validCategories.includes(category)) {
        return 'Invalid category';
    }
    return null;
};

// Validate date range
export const validateDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) {
        return 'Start date and end date are required';
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return 'Invalid date format';
    }

    if (start > end) {
        return 'Start date must be before end date';
    }

    return null;
};

// Validate task dependencies
export const validateDependencies = (taskId, dependencies, tasks) => {
    if (!Array.isArray(dependencies)) {
        return 'Dependencies must be an array';
    }

    for (const depId of dependencies) {
        if (!tasks.has(depId)) {
            return `Dependency task ${depId} not found`;
        }

        if (depId === taskId) {
            return 'Task cannot depend on itself';
        }

        // Check for circular dependencies
        if (hasCircularDependency(taskId, depId, tasks)) {
            return 'Circular dependency detected';
        }
    }

    return null;
};

// Check for circular dependencies
const hasCircularDependency = (taskId, dependencyId, tasks, visited = new Set()) => {
    if (taskId === dependencyId) {
        return true;
    }

    if (visited.has(dependencyId)) {
        return false;
    }

    visited.add(dependencyId);

    const dependency = tasks.get(dependencyId);
    if (!dependency) {
        return false;
    }

    return dependency.dependencies.some(id =>
        hasCircularDependency(taskId, id, tasks, visited)
    );
}; 