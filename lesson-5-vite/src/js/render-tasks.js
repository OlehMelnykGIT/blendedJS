import { refs } from './refs';

export function renderTasks(array) {
  const markup = array
    .map(
      elemet =>
        `<li class="task-list-item">
        <button class="task-list-item-btn">Delete</button>
        <h3>${elemet.title}</h3>
        <p>${elemet.descr}</p>
      </li>`
    )
    .join('');

  refs.task.innerHTML = markup;
}
