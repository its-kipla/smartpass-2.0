import { register } from '../services/auth.service.js';
import { saveSession } from '../utils/session.js';

const form = document.querySelector('#registerForm');
const message = document.querySelector('#formMessage');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = form.querySelector('button[type="submit"]');
  const password = form.elements.password.value;
  const confirmation = form.elements.confirmPassword.value;

  message.hidden = true;
  if (password !== confirmation) {
    message.textContent = 'Passwords do not match';
    message.hidden = false;
    return;
  }

  button.disabled = true;
  try {
    const details = {
      fullName: form.elements.fullName.value.trim(),
      email: form.elements.email.value.trim(),
      password,
    };
    const phone = form.elements.phone.value.trim();
    if (phone) details.phone = phone;

    saveSession(await register(details), true);
    window.location.assign('book-visit.html');
  } catch (error) {
    message.textContent = error.message;
    message.hidden = false;
  } finally {
    button.disabled = false;
  }
});
