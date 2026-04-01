import { renderUsers, findUserById } from './scripts/dom/render.js';
import { createUser } from './scripts/api/create.js';
import { deleteUser } from './scripts/api/delete.js';
import { updateUser, patchUser } from './scripts/api/update.js';

const apiUrl = 'http://localhost:8000/api/users';

// Seleção de elementos do HTML
const form = document.getElementById('create-user-form');
const formError = document.getElementById('form-error');
const usersSection = document.getElementById('users');
const formTitle = document.getElementById('form-title');
const submitBtn = form.querySelector('button[type="submit"]');
const cancelBtn = document.getElementById('cancel-edit');

// Controle de estado (quem estamos editando e como ele era)
let editingId = null;
let originalUser = null;

// Mostra erro na tela
function showError(message) {
  formError.textContent = message;
  formError.classList.remove('d-none');
}

// Esconde o erro
function hideError() {
  formError.classList.add('d-none');
  formError.textContent = '';
}

// Pega os dados do usuário através do clique no botão do Card
function getUserFromCard(button) {
  const card = button.closest('.user-card');
  return findUserById(Number(card.id));
}

// Ativa o modo de edição: preenche formulário e muda botões
function enterEditMode(user) {
  editingId = user.id;
  originalUser = { ...user }; // Cópia para comparar mudanças depois

  document.getElementById('name').value = user.name;
  document.getElementById('age').value = user.age;
  document.getElementById('email').value = user.email;

  formTitle.textContent = 'Edit User';
  submitBtn.textContent = 'Update';
  cancelBtn.style.display = 'inline-block';
  document.getElementById('name').focus();
}

// Limpa o formulário e volta para o modo de "Criação"
function exitEditMode() {
  editingId = null;
  originalUser = null;
  formTitle.textContent = 'Create User';
  submitBtn.textContent = 'Create';
  cancelBtn.style.display = 'none';
  form.reset();
  hideError();
}

// Início: carrega a lista quando o site abre
document.addEventListener('DOMContentLoaded', () => renderUsers(apiUrl));

cancelBtn.addEventListener('click', exitEditMode);

// Lógica principal: Salvar (Criar ou Atualizar)
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Impede a página de recarregar

  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const email = document.getElementById('email').value;

  hideError();

  try {
    if (editingId !== null) {
      // Lógica de Edição: Verifica o que mudou
      const changed = {};
      if (name !== originalUser.name) changed.name = name;
      if (Number(age) !== originalUser.age) changed.age = Number(age);
      if (email !== originalUser.email) changed.email = email;

      if (Object.keys(changed).length === 0) {
        exitEditMode();
        return;
      }

      // Se mudar tudo usa PUT, se mudar só um pouco usa PATCH
      const allChanged = Object.keys(changed).length === 3;

      if (allChanged) {
        await updateUser(apiUrl, editingId, { name, age: Number(age), email });
      } else {
        await patchUser(apiUrl, editingId, changed);
      }
    } else {
      // Lógica de Criação
      await createUser(apiUrl, { name, age: Number(age), email });
    }

    exitEditMode();
    renderUsers(apiUrl); // Recarrega a lista na tela
  } catch (error) {
    showError(error.message);
  }
});

// Lógica de Cliques na lista (Editar ou Deletar)
usersSection.addEventListener('click', async (event) => {
  const { target } = event;
  const user = getUserFromCard(target);

  if (!user) return;

  // Botão Editar clicado
  if (target.dataset.action === 'edit') {
    enterEditMode(user);
  }

  // Botão Deletar clicado
  if (target.dataset.action === 'delete') {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      await deleteUser(apiUrl, user.id);
      
      // Se deletar quem estava sendo editado, limpa o form
      if (editingId === user.id) {
        exitEditMode();
      }
      
      renderUsers(apiUrl);
    } catch (error) {
      showError(error.message);
    }
  }
});