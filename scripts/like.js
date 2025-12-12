const likeHearts = document.querySelectorAll('.like-icon');
const likeButtons = document.querySelectorAll('.card__like-button');
const iconButtons = document.querySelectorAll('.card__icon-button');

function toggleIsLiked(heart, button) {
  if (!heart || !button) return;
  heart.classList.toggle('is-liked');
  setButtonText(heart, button);
}

function setButtonText(heart, button) {
  const textEl = button.querySelector('.button__text');
  if (!textEl) return;
  setTimeout(() => {
    textEl.textContent = heart.classList.contains('is-liked')
      ? 'Unlike'
      : 'Like';
  }, 500);
}

iconButtons.forEach((iconBtn, i) => {
  const heart = likeHearts[i];
  const button = likeButtons[i];
  iconBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleIsLiked(heart, button);
  });
});

likeButtons.forEach((button, i) => {
  const heart = likeHearts[i];
  button.addEventListener('click', (e) => {
    e.preventDefault();
    toggleIsLiked(heart, button);
  });
});

// ---------- Модалка ----------
const modal = document.querySelector("#modal");
const saveButton = document.querySelector(".button--save");
const okButton = modal.querySelector(".modal__button"); // кнопка «ОК»

// Открываем модалку по кнопке «Сохранить на память»
saveButton.addEventListener("click", (e) => {
  e.preventDefault();
  modal.showModal();
});

// Закрываем модалку по кнопке «ОК» — БЕЗ перезагрузки страницы
okButton.addEventListener("click", (e) => {
  e.preventDefault();   // ← Эта строка убирает перезагрузку
  modal.close();
});

// Дополнительно защищаемся от Enter в форме (на всякий случай)
modal.addEventListener("submit", (e) => {
  e.preventDefault();
  modal.close();
});
