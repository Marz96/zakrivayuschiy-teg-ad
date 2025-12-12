const likeIcons = document.querySelectorAll('.like-icon');
  const iconButtons = document.querySelectorAll('.card__icon-button');
  const likeButtons = document.querySelectorAll('.card__like-button');

  function toggleLike(heart, textButton) {
    heart.classList.toggle('is-liked');

    // Меняем текст кнопки после окончания анимации
    setTimeout(() => {
      const textSpan = textButton.querySelector('.button__text');
      if (textSpan) {
        textSpan.textContent = heart.classList.contains('is-liked') ? 'Unlike' : 'Like';
      }
    }, 400);
  }

  // Клик по иконке сердца
  iconButtons.forEach((iconBtn, index) => {
    iconBtn.addEventListener('click', () => {
      toggleLike(likeIcons[index], likeButtons[index]);
    });
  });

  // Клик по текстовой кнопке Like / Unlike
  likeButtons.forEach((textBtn, index) => {
    textBtn.addEventListener('click', () => {
      toggleLike(likeIcons[index], textBtn);
    });
  });
