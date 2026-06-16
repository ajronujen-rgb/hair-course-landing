const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  nav.classList.toggle('open');
  burger.classList.toggle('open');
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    burger.classList.remove('open');
  });
});

async function submitForm(form, statusEl, type) {
  const data = Object.fromEntries(new FormData(form));
  statusEl.textContent = 'Отправляем...';
  statusEl.style.color = 'var(--text-light)';

  try {
    const res = await fetch('/api/sheet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        phone: data.phone,
        source: data.source || type,
        type: type,
        course: 'Курс по наращиванию волос',
        date: new Date().toLocaleString('ru-RU')
      })
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.error || 'server error');

    form.reset();
    statusEl.textContent = '✅ Заявка отправлена! Скоро свяжусь.';
    statusEl.style.color = '#2e7d32';
  } catch (e) {
    statusEl.textContent = '❌ Ошибка отправки. Попробуйте ещё раз или напишите в Telegram @ajronujen.';
    statusEl.style.color = '#c62828';
    console.error(e);
  }
}

function handleFormSubmit(form, statusEl) {
  return function(e) {
    e.preventDefault();
    const btn = e.submitter;
    const type = btn?.dataset?.type || 'course';
    submitForm(form, statusEl, type);
  };
}

document.getElementById('formHero').addEventListener('submit', handleFormSubmit(
  document.getElementById('formHero'),
  document.getElementById('formHeroStatus')
));

document.getElementById('formContact').addEventListener('submit', handleFormSubmit(
  document.getElementById('formContact'),
  document.getElementById('formStatus')
));