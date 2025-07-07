import { fetchTasks } from './api.js';
import { renderTasks } from './ui.js';

async function loadData() {
    const tasks = await fetchTasks();
    renderTasks(tasks);
}

document.addEventListener('DOMContentLoaded', loadData);