import { renderUsers } from
  './scripts/dom/render.js';

const apiUrl =
  'http://localhost:8000/api/users';

// Quando o DOM estiver pronto, renderiza
document.addEventListener(
  'DOMContentLoaded',
  () => renderUsers(apiUrl)
);