# Task Manager Application - Day 4 Project

## Task Overview
Create a Task Manager application that demonstrates your understanding of arrays, loops, and data persistence using localStorage. The application should allow users to manage their tasks with features like adding, completing, deleting, and filtering tasks.

## Learning Objectives
- [ ] Implement and manipulate arrays using various array methods
- [ ] Use different types of loops effectively
- [ ] Implement data persistence using localStorage
- [ ] Create a responsive and user-friendly interface
- [ ] Handle user input and form validation
- [ ] Implement search and filter functionality
- [ ] Use modern JavaScript features and best practices

## Required Sections

### 1. Task List Interface
- [ ] Display a list of tasks with their details
- [ ] Show task completion status
- [ ] Display task priority levels
- [ ] Show task categories
- [ ] Include creation date/time

### 2. Task Management Features
- [ ] Add new tasks with description
- [ ] Mark tasks as complete/incomplete
- [ ] Delete tasks
- [ ] Edit existing tasks
- [ ] Clear all completed tasks

### 3. Task Organization
- [ ] Categorize tasks (e.g., Work, Personal, Shopping)
- [ ] Set priority levels (High, Medium, Low)
- [ ] Sort tasks by different criteria
- [ ] Filter tasks by category or priority
- [ ] Search tasks by description

### 4. Data Persistence
- [ ] Save tasks to localStorage
- [ ] Load tasks from localStorage on page load
- [ ] Handle storage errors gracefully
- [ ] Implement data validation
- [ ] Provide feedback on save operations

## Technical Requirements

### Array Methods
- [ ] Use map() for transforming data
- [ ] Use filter() for searching/filtering
- [ ] Use reduce() for calculations
- [ ] Use find() for specific items
- [ ] Use some() and every() for validation

### Loops
- [ ] Implement for...of loops
- [ ] Use forEach() for array iteration
- [ ] Use while loops where appropriate
- [ ] Handle loop edge cases
- [ ] Optimize loop performance

### Data Structure
```javascript
{
    id: number,
    text: string,
    completed: boolean,
    priority: 'high' | 'medium' | 'low',
    category: string,
    createdAt: string (ISO date)
}
```

## Bonus Challenges
- [ ] Implement drag-and-drop task reordering
- [ ] Add task due dates and reminders
- [ ] Create task statistics and progress tracking
- [ ] Implement task sharing functionality
- [ ] Add task notes or subtasks
- [ ] Create a dark/light theme toggle
- [ ] Add task export/import functionality
- [ ] Implement task tags

## Submission Guidelines
1. Create a new HTML file named `task-manager.html`
2. Include all necessary CSS and JavaScript
3. Ensure the code is well-commented
4. Test all functionality thoroughly
5. Make sure the interface is responsive
6. Handle edge cases and errors gracefully

## Testing Checklist
- [ ] Test adding new tasks
- [ ] Test completing tasks
- [ ] Test deleting tasks
- [ ] Test editing tasks
- [ ] Test filtering and sorting
- [ ] Test search functionality
- [ ] Test data persistence
- [ ] Test error handling
- [ ] Test responsive design
- [ ] Test browser compatibility

## Design Guidelines
- Use a clean and intuitive interface
- Implement proper spacing and typography
- Use appropriate colors for different priorities
- Make the interface responsive
- Include loading states and feedback
- Use appropriate icons and visual cues
- Ensure good contrast and readability
- Follow accessibility guidelines

## Resources
- MDN Web Docs: Array Methods
- MDN Web Docs: Loops and Iteration
- MDN Web Docs: Web Storage API
- JavaScript.info: LocalStorage
- CSS-Tricks: Flexbox Guide
- CSS-Tricks: Grid Guide

## Common Mistakes to Avoid
- Not handling localStorage errors
- Forgetting to parse/stringify JSON
- Not validating user input
- Using inefficient loops
- Not handling edge cases
- Forgetting to update the UI
- Not implementing proper error handling
- Using global variables unnecessarily

## Tips for Success
1. Plan your data structure first
2. Break down the task into smaller components
3. Test each feature as you build it
4. Use console.log for debugging
5. Comment your code thoroughly
6. Follow JavaScript best practices
7. Keep the UI simple and intuitive
8. Handle edge cases early

## Evaluation Criteria
- Code organization and structure
- Implementation of required features
- Error handling and edge cases
- User interface and experience
- Code efficiency and performance
- Documentation and comments
- Responsive design
- Browser compatibility

## Final Checklist
- [ ] All required features implemented
- [ ] Code is well-organized and commented
- [ ] Error handling is in place
- [ ] UI is responsive and user-friendly
- [ ] Data persistence works correctly
- [ ] All features are tested
- [ ] Code follows best practices
- [ ] Documentation is complete 