import {
  createTodo,
  addTodoToCurrentProject,
  getTodosForCurrentProject,
  getAllProjects,
  createProject,
  setCurrentProject,
  getCurrentProject,
  deleteTodo
} from './index.js';

import { format, isToday, isTomorrow } from 'date-fns';



export function setupUI() {
    const titleInput = document.getElementById('todo-title');
    const dateInput = document.getElementById('todo-date');
    const priorityInput = document.getElementById('todo-priority');
    const addButton = document.getElementById('add-task');
    const todoList = document.getElementById('todo-list');
    const projectSelect = document.getElementById('projects');
    const newProjectBtn = document.getElementById('new-project-btn');

    function renderTodos() {
        todoList.innerHTML = ''; // Clear existing

        const todos = getTodosForCurrentProject();
        todos.forEach((todo, index) => {
        const item = document.createElement('div');
        const due = new Date(todo.dueDate);
        let dueDisplay;

        if (isToday(due)) {
          dueDisplay = 'Today';
        } else if (isTomorrow(due)) {
          dueDisplay = 'Tomorrow';
        } else {
          dueDisplay = format(due, 'dd MMM yyyy'); // e.g., 15 Jul 2025
        }

        item.textContent = `${todo.title} – ${dueDisplay} – ${todo.priority}`;
        if (todo.priority === 'high') {
          item.style.color = 'red';
      } else if (todo.priority === 'medium') {
          item.style.color = 'orange';
      } else {
          item.style.color = 'green';
}
        todoList.appendChild(item);
          const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.addEventListener('click', () => {
          deleteTodo(index);
          renderTodos();
        });
        item.appendChild(deleteBtn);

        });
        
      
    }
       
    
  addButton.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const dueDate = dateInput.value;
    const priority = priorityInput.value;

    if (!title || !dueDate) return;

    const newTodo = createTodo(title, dueDate, priority);
    addTodoToCurrentProject(newTodo);

    titleInput.value = '';
    dateInput.value = '';
    priorityInput.value = 'low';

    renderTodos();
  });

  newProjectBtn.addEventListener('click', () => {
  const name = prompt('Enter new project name:');
  if (!name || getAllProjects().includes(name)) return;

  createProject(name);
  setCurrentProject(name);
  renderProjectDropdown();
  renderTodos();
  });
  projectSelect.addEventListener('change', (e) => {
  setCurrentProject(e.target.value);
  renderTodos();
});


  function renderProjectDropdown() {
  projectSelect.innerHTML = ''; // Clear the dropdown first
  const projects = getAllProjects(); // Get an array of all project names

  projects.forEach((project) => {
    const option = document.createElement('option'); // Create a new <option>
    option.value = project; // Set its value (what's submitted or used in JS)
    option.textContent = project; // Set its visible label in the dropdown

    // If this is the currently selected project, mark it as selected
    if (project === getCurrentProject()) {
      option.selected = true;
    }

    // Add the option to the <select> element
    projectSelect.appendChild(option);
  });
}

  renderProjectDropdown();

  renderTodos(); // Initial call
}