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

async function submitForm(form, statusEl) {
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
        source: data.source,
        course: 'Курс по наращиванию волос',
        date: new Date().toLocaleString('ru-RU')
      })
    });

    if (!res.ok) throw new Error('server error');

    form.reset();
    statusEl.textContent = 'Заявка отправлена! Скоро свяжусь.';
    statusEl.style.color = '#2e7d32';
  } catch (e) {
    statusEl.textContent = 'Ошибка отправки. Попробуйте ещё раз или напишите в Telegram.';
    statusEl.style.color = '#c62828';
    console.error(e);
  }
}

document.getElementById('formHero').addEventListener('submit', e => {
  e.preventDefault();
  submitForm(e.target, document.getElementById('formHeroStatus'));
});

document.getElementById('formContact').addEventListener('submit', e => {
  e.preventDefault();
  submitForm(e.target, document.getElementById('formStatus'));
});
