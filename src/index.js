import './style.css';
import {setupUI} from './dom.js';

console.log('Hello from index.js!');
function createTodo(title, dueDate, priority) {
  return {
    title,
    dueDate,
    priority,
    completed: false,
  };
}

function addTodoToCurrentProject(todo) {
  projects[currentProject].push(todo);
  saveProjectsToStorage();
}

function getTodosForCurrentProject() {
  return projects[currentProject];
}

function getAllProjects() {
  return Object.keys(projects);
}

function createProject(name) {
  if (!projects[name]) {
    projects[name] = [];
    saveProjectsToStorage();
  }
}

function getCurrentProject() {
  return currentProject;
}

function setCurrentProject(name) {
  if (projects[name]) {
    currentProject = name;
    saveProjectsToStorage();
  }
}

let projects = loadProjectsFromStorage() || { default: [] };
let currentProject = loadCurrentProject();

function saveProjectsToStorage() {
  localStorage.setItem('projects', JSON.stringify(projects));
  localStorage.setItem('currentProject', currentProject);
}

function loadProjectsFromStorage() {
  const saved = localStorage.getItem('projects');
  return saved ? JSON.parse(saved) : null;
}

function loadCurrentProject() {
  const saved = localStorage.getItem('currentProject');
  return saved || 'default';
}
function deleteTodo(index) {
  projects[currentProject].splice(index, 1);
  saveProjectsToStorage();
}

export {
  createTodo,
  addTodoToCurrentProject,
  getTodosForCurrentProject,
  getAllProjects,
  createProject,
  setCurrentProject,
  getCurrentProject,
  deleteTodo
};



setupUI();