// ---------- Лайки ----------
function toggleIsLiked(section) {
  const heart = section.querySelector('.like-icon');
  const button = section.querySelector('.card__like-button');
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

// Делегирование — ловим клики один раз
document.addEventListener('click', (e) => {
  const iconBtn = e.target.closest('.card__icon-button');
  const likeBtn = e.target.closest('.card__like-button');

  if (iconBtn) {
    const section = iconBtn.closest('.section');
    toggleIsLiked(section);
  }

  if (likeBtn) {
    const section = likeBtn.closest('.section');
    toggleIsLiked(section);
  }
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

