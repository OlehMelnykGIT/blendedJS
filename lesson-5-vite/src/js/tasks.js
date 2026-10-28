import izitoast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { renderTasks } from './render-tasks';
import { getFromLs, saveInLS, TASK_LS_KEY } from './local-storage-api';

let tasks = getFromLs(TASK_LS_KEY) || [];

/* if (!getFromLs(TASK_LS_KEY)){
  tasks = [];
} else {
  tasks = getFromLs(TASK_LS_KEY);
} */

export function addTask(event) {
  event.preventDefault();
  const title = event.target.elements.taskName.value.trim();
  const descr = event.target.elements.taskDescription.value.trim();

  if (title === '' || descr === '') {
    izitoast.warning({ message: 'Заповніть всі поля !' });
    return;
  }

  // Перевірка на унікальний title: deleteTask видаляє за title,
  // тому дві задачі з однаковою назвою видалились би разом
  const isDuplicate = tasks.some(
    el => el.title.toLowerCase() === title.toLowerCase()
  );
  if (isDuplicate) {
    izitoast.warning({ message: 'Задача з такою назвою вже є !' });
    return;
  }

  const task = { title, descr };
  tasks.push(task);
  renderTasks(tasks);
  saveInLS(TASK_LS_KEY, tasks);

  event.target.reset();
}

export function initTasks() {
  renderTasks(tasks);
}
/* export function deleteTask(evt) {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }

  const h3Value = evt.target.nextElementSibling.textContent;
  tasks = tasks.filter(el => el.title !== h3Value);
  renderTasks(tasks);
  saveInLS(TASK_LS_KEY, tasks);
} */

export function deleteTask(evt) {
  if (!evt.target.classList.contains('task-list-item-btn')) {
    return;
  }

  const h3Value = evt.target.nextElementSibling.textContent;
  tasks = tasks.filter(el => el.title !== h3Value);
  renderTasks(tasks);
  saveInLS(TASK_LS_KEY, tasks);
}
