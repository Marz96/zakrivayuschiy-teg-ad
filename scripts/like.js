// like.js — диагностический + рабочий скрипт
(function() {
  'use strict';

  // utils
  const log = (...args) => {
    // поменьше шума — можно отключить, заменив на ()=>{}
    console.info('[like.js]', ...args);
  };
  const warn = (...args) => console.warn('[like.js]', ...args);
  const err = (...args) => console.error('[like.js]', ...args);

  function setButtonText(heart, button) {
    const textEl = button && button.querySelector('.button__text');
    if (!textEl) {
      warn('Элемент .button__text не найден в', button);
      return;
    }
    setTimeout(() => {
      textEl.textContent = heart.classList.contains('is-liked') ? 'Unlike' : 'Like';
    }, 500);
  }

  function toggleIsLikedForSection(section) {
    if (!section) return;
    const heart = section.querySelector('.like-icon');
    const button = section.querySelector('.card__like-button');

    if (!heart) {
      warn('Сердечко (.like-icon) не найдено в секции', section);
      return;
    }
    if (!button) {
      warn('Кнопка (.card__like-button) не найдена в секции', section);
      return;
    }

    heart.classList.toggle('is-liked');
    setButtonText(heart, button);
    log('toggle', { section: section.className || section.id, liked: heart.classList.contains('is-liked') });
  }

  function openModal(modalEl) {
    if (!modalEl) {
      err('openModal: modal element отсутствует');
      return;
    }

    try {
      if (typeof modalEl.showModal === 'function') {
        modalEl.showModal();
        log('modal.showModal() called');
      } else {
        // fallback: показать через класс
        modalEl.classList.add('is-open');
        log('modal fallback: добавлен класс is-open');
      }
    } catch (e) {
      err('Ошибка при открытии модалки:', e);
      // fallback
      modalEl.classList.add('is-open');
    }
  }

  function closeModal(modalEl) {
    if (!modalEl) {
      err('closeModal: modal element отсутствует');
      return;
    }
    try {
      if (typeof modalEl.close === 'function') {
        modalEl.close();
        log('modal.close() called');
      } else {
        modalEl.classList.remove('is-open');
        log('modal fallback: удалён класс is-open');
      }
    } catch (e) {
      err('Ошибка при закрытии модалки:', e);
      modalEl.classList.remove('is-open');
    }
  }

  // Инициализация после загрузки DOM
  function init() {
    log('Инициализация like.js — ищу элементы...');

    const modal = document.querySelector('#modal');
    const saveButton = document.querySelector('.button--save');
    if (!saveButton) warn('Кнопка сохранения (.button--save) не найдена');
    if (!modal) warn('Диалог #modal не найден — модалка работать не будет');

    // Делегируем клики на документ — это покрывает SVG path и т.д.
    document.addEventListener('click', (e) => {
      // если в документе есть другой код, который останавливает propagation — это видно в консоли
      const iconBtn = e.target.closest && e.target.closest('.card__icon-button');
      const likeBtn = e.target.closest && e.target.closest('.card__like-button');

      if (iconBtn) {
        // не блокируем default — это обычная кнопка
        const section = iconBtn.closest('.section') || iconBtn.closest('main') || document.body;
        toggleIsLikedForSection(section);
        return;
      }

      if (likeBtn) {
        const section = likeBtn.closest('.section') || likeBtn.closest('main') || document.body;
        toggleIsLikedForSection(section);
        return;
      }

      // кнопка сохранения (модалка)
      const saveBtn = e.target.closest && e.target.closest('.button--save');
      if (saveBtn) {
        e.preventDefault();
        if (!modal) {
          err('Попытка открыть модалку, но #modal не найден');
          return;
        }
        openModal(modal);
        return;
      }
    }, { capture: false });

    // Закрытие формы модалки (submit внутри form)
    if (modal) {
      const modalForm = modal.querySelector('.modal__controller');
      if (modalForm) {
        modalForm.addEventListener('submit', (ev) => {
          ev.preventDefault();
          closeModal(modal);
        });
      } else {
        warn('.modal__controller не найден в #modal');
      }
    }

    log('Инициализация завершена. Попробуй кликнуть по сердечку и по кнопке "Сохранить на память"');
  }

  // Запуск с безопасной отложкой
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      try { init(); } catch (e) { err('init threw', e); }
    });
  } else {
    try { init(); } catch (e) { err('init threw', e); }
  }

  // Доп. хелп — если есть глобальный код, который вызывает preventDefault на всех кнопках,
  // можно вывести в консоль предупреждение.
  // Проверим, нет ли уже слушателей, которые блокируют клики (best-effort):
  setTimeout(() => {
    log('Проверка: есть ли .card__icon-button на странице?', !!document.querySelector('.card__icon-button'));
    log('Проверка: есть ли .card__like-button на странице?', !!document.querySelector('.card__like-button'));
    log('Проверка: есть ли #modal на странице?', !!document.querySelector('#modal'));
  }, 600);
})();
