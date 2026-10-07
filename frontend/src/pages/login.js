import { login } from '../services/auth.service.js';
import { saveSession } from '../utils/session.js';

const form = document.querySelector('#loginForm');
const message = document.querySelector('#formMessage');
const password = document.querySelector('#pw');
const toggle = document.querySelector('#toggle');
const slash = document.querySelector('#slash');

const showMessage = (text) => {
  message.textContent = text;
  message.hidden = !text;
};

toggle.addEventListener('click', () => {
  const show = password.type === 'password';
  password.type = show ? 'text' : 'password';
  slash.style.display = show ? 'none' : '';
  toggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  showMessage('');

  try {
    const result = await login({
      email: form.elements.email.value.trim(),
      password: form.elements.password.value,
    });
    saveSession(result, form.elements.remember.checked);

    const destination = new URLSearchParams(window.location.search).get('next');
    window.location.assign(destination === 'book-visit.html' ? destination : 'index.html');
  } catch (error) {
    showMessage(error.message);
  } finally {
    button.disabled = false;
  }
});
