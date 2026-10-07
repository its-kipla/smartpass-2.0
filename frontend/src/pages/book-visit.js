import { getVisitTypes, createVisit } from '../services/visit.service.js';

const form = document.querySelector('#bookForm');
const typeSelect = document.querySelector('#visitType');
const dateInput = document.querySelector('#date');
const message = document.querySelector('#ok');

const dateParts = new Intl.DateTimeFormat('en', {
  timeZone: 'Africa/Nairobi',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).formatToParts(new Date()).reduce((parts, part) => {
  parts[part.type] = part.value;
  return parts;
}, {});
const today = `${dateParts.year}-${dateParts.month}-${dateParts.day}`;
dateInput.min = today;

const showMessage = (text, isError = false) => {
  message.textContent = text;
  message.hidden = !text;
  message.classList.toggle('error', isError);
};

const loadVisitTypes = async () => {
  try {
    const { visitTypes } = await getVisitTypes();
    typeSelect.replaceChildren(new Option('Select a visit type', ''));

    for (const type of visitTypes) {
      typeSelect.add(new Option(type.name, type.id));
    }

    if (visitTypes.length === 0) {
      typeSelect.replaceChildren(new Option('No visit types are available', ''));
      typeSelect.disabled = true;
    }
  } catch (error) {
    typeSelect.replaceChildren(new Option('Unable to load visit types', ''));
    typeSelect.disabled = true;
    showMessage(error.message, true);
  }
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  showMessage('');

  try {
    await createVisit({
      visitTypeId: Number(typeSelect.value),
      visitDate: dateInput.value,
      purpose: form.elements.purpose.value.trim(),
    });
    showMessage('Booking submitted. You can review its status after signing in.');
    form.reset();
    dateInput.min = today;
  } catch (error) {
    const needsLogin = /authentication|required|expired token/i.test(error.message);
    showMessage(
      needsLogin
        ? `${error.message}. Please log in to submit a booking.`
        : error.message,
      true
    );
  } finally {
    button.disabled = false;
  }
});

loadVisitTypes();
