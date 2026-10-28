export const TASK_LS_KEY = 'tasks';
export const THEMA_LS_KEY = 'theme';

export function saveInLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLs(key) {
  const storageData = localStorage.getItem(key);
  if (!storageData) {
    return null;
  }
  return JSON.parse(storageData);
}
