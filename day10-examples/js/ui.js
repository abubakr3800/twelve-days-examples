export const renderTasks = (tasks) => {
    document.getElementById('task-list').innerHTML = tasks
    .map(task => `<li>${task.title}</li>`)
    .join('');
};