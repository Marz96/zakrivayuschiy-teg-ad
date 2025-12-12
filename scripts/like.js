/* этот скрипт использует такие имена классов:
✦ like-icon — для svg-иконки анимированного сердца
✦ card__like-button — для кнопки Like рядом с иконкой
✦ card__icon-button — для кнопки, оборачивающей иконку
✦ card__icon-button — для кнопки, оборачивающей иконку
✦ is-liked — для обозначения состояния лайкнутой иконки в виде сердца
✦ button__text — для обозначения текстового элемента внутри кнопки
Если эти классы поменять в HTML, скрипт перестанет работать. Будьте аккуратны.
*/

const likeHeartArray = document.querySelectorAll('.like-icon');
const likeButtonArray = document.querySelectorAll('.card__like-button');
const iconButtonArray = document.querySelectorAll('.card__icon-button');

iconButtonArray.forEach((iconButton, index) => {
  iconButton.onclick = () =>
    toggleIsLiked(likeHeartArray[index], likeButtonArray[index]);
});

likeButtonArray.forEach((button, index) => {
  button.onclick = () => toggleIsLiked(likeHeartArray[index], button);
});

function toggleIsLiked(heart, button) {
  heart.classList.toggle('is-liked');
  setButtonText(heart, button);
}

function setButtonText(heart, button) {
  if ([...heart.classList].includes('is-liked')) {
    setTimeout(
      () => (button.querySelector('.button__text').textContent = 'Unlike'),
      500
    );
  } else {
    setTimeout(
      () => (button.querySelector('.button__text').textContent = 'Like'),
      500
    );
  }
}

// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
  // Находим кнопку "Сохранить на память"
  const saveButton = document.querySelector('.save__button');
  // Находим диалоговое окно
  const dialog = document.getElementById('dialog-id');
  
  // Если элементы найдены, добавляем обработчик
  if (saveButton && dialog) {
    saveButton.addEventListener('click', function(event) {
      // Предотвращаем возможное стандартное поведение
      event.preventDefault();
      // Открываем модальное окно
      dialog.showModal();
    });
  }
  
  // Можно добавить закрытие диалога по клику вне окна
  if (dialog) {
    dialog.addEventListener('click', function(event) {
      if (event.target === dialog) {
        dialog.close();
      }
    });
    
    // Или по кнопке закрытия внутри диалога
    const closeButton = dialog.querySelector('.dialog__close-button');
    if (closeButton) {
      closeButton.addEventListener('click', function() {
        dialog.close();
      });
    }
  }
});