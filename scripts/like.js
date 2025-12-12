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
const modalCloseButton = document.querySelector(".modal__button"); // Изменено!

// открыть модалку
saveButton.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  modal.showModal();
});

// закрыть модалку - обработчик на кнопке, а не на форме
modalCloseButton.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  modal.close();
});

// Дополнительная защита - отмена submit для всех форм на странице
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
});
