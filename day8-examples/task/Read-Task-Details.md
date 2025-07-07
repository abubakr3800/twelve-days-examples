# Day 8: Asynchronous JavaScript Task

## Task Overview
Create a "Task Manager" application that demonstrates the use of asynchronous JavaScript concepts including callbacks, promises, and async/await. The application should allow users to manage their daily tasks with features like adding, completing, and filtering tasks.

## Requirements

### 1. Task Management
- Create a Task class with the following properties:
  - id (unique identifier)
  - title
  - description
  - dueDate
  - priority (high, medium, low)
  - status (pending, in-progress, completed)
  - createdAt

### 2. Task Storage
- Implement a StorageService class that handles:
  - Saving tasks to localStorage
  - Loading tasks from localStorage
  - All operations should be asynchronous using Promises

### 3. Task Operations
Implement the following asynchronous operations:
- Add a new task
- Update task status
- Delete a task
- Filter tasks by:
  - Status
  - Priority
  - Due date
- Sort tasks by:
  - Due date
  - Priority
  - Creation date

### 4. UI Components
Create a responsive UI with:
- Task input form
- Task list display
- Filter and sort controls
- Task details view
- Loading states and error handling

### 5. Error Handling
- Implement proper error handling for all async operations
- Display user-friendly error messages
- Handle edge cases (e.g., invalid dates, empty inputs)

## Technical Requirements

### 1. Async Operations
- Use Promises for all storage operations
- Implement async/await for task management
- Use callbacks for UI updates
- Handle multiple concurrent operations

### 2. Code Structure
- Use ES6+ features
- Implement proper error handling
- Follow async/await best practices
- Use proper Promise chaining

### 3. Performance
- Implement efficient task filtering
- Use proper async patterns for better performance
- Handle large datasets efficiently

## Bonus Features
1. Task Categories/Tags
2. Task Search functionality
3. Task Statistics (completed vs pending)
4. Task Export/Import
5. Task Reminders

## Evaluation Criteria
1. Proper implementation of async operations
2. Code organization and structure
3. Error handling
4. UI/UX design
5. Performance optimization
6. Code readability and maintainability

## Getting Started
1. Create the basic HTML structure
2. Implement the Task class
3. Create the StorageService
4. Build the UI components
5. Implement the async operations
6. Add error handling
7. Test all features

## Tips
- Use async/await for cleaner code
- Implement proper error boundaries
- Use Promise.all for parallel operations
- Consider using a debounce for search/filter operations
- Implement proper loading states

## Resources
- MDN Web Docs: [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- MDN Web Docs: [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- MDN Web Docs: [Error handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)

## Example Usage

### Task Creation
```javascript
const task = new Task(
    "Complete project",
    "Finish the task manager implementation",
    "2024-03-20T15:00",
    "high"
);
```

### Storage Operations
```javascript
// Save tasks
await storageService.saveTasks(tasks);

// Load tasks
const tasks = await storageService.loadTasks();
```

### Task Management
```javascript
// Add task
await taskManager.addTask(task);

// Update status
await taskManager.updateTaskStatus(taskId, "completed");

// Delete task
await taskManager.deleteTask(taskId);

// Filter tasks
const filteredTasks = await taskManager.filterTasks("pending", "high");

// Sort tasks
const sortedTasks = await taskManager.sortTasks("dueDate");
```

## Common Pitfalls to Avoid
1. Not handling Promise rejections
2. Missing error boundaries
3. Blocking the main thread
4. Not implementing loading states
5. Poor error message handling
6. Inefficient data operations
7. Missing input validation
8. Not handling edge cases

## Testing Checklist
- [ ] Task creation works correctly
- [ ] Task updates persist
- [ ] Task deletion works
- [ ] Filters work correctly
- [ ] Sorting works correctly
- [ ] Error messages are clear
- [ ] Loading states work
- [ ] Data persists after refresh
- [ ] UI is responsive
- [ ] All async operations complete

## Submission Requirements
1. Complete implementation of all required features
2. Clean, well-documented code
3. Proper error handling
4. Responsive UI
5. Working demo
6. README with setup instructions 