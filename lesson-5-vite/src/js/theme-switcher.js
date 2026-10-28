import { getFromLs, saveInLS, THEMA_LS_KEY } from './local-storage-api';

export function themeSwitch() {
  if (document.body.classList.contains('theme-dark')) {
    document.body.classList.add('theme-light');
    document.body.classList.remove('theme-dark');
    saveInLS(THEMA_LS_KEY, 'theme-light');
  } else {
    {
      document.body.classList.add('theme-dark');
      document.body.classList.remove('theme-light');
      saveInLS(THEMA_LS_KEY, 'theme-dark');
    }
  }
}

export function initTheme() {
  const themeStatus = getFromLs(THEMA_LS_KEY);
  if (themeStatus === 'theme-light') {
    document.body.classList.add('theme-light');
    document.body.classList.remove('theme-dark');
  }
}
