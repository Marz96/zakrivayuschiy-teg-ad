// ---------- Лайки ----------
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

// навешиваем события
iconButtons.forEach((iconBtn, i) => {
  const heart = likeHearts[i];
  const button = likeButtons[i];
  iconBtn.addEventListener('click', () => toggleIsLiked(heart, button));
});

likeButtons.forEach((button, i) => {
  const heart = likeHearts[i];
  button.addEventListener('click', () => toggleIsLiked(heart, button));
});


// ---------- Модалка ----------
const modal = document.querySelector("#modal");
const saveButton = document.querySelector(".button--save");
const modalForm = modal.querySelector(".modal__controller");

// открыть модалку
saveButton.addEventListener("click", (e) => {
  e.preventDefault();
  modal.showModal();
});

// закрыть модалку
modalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  modal.close();
});
