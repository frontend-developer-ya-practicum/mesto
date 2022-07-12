let openedPopup = null;
function closePopupOnEsc(evt) {
  if (evt.code === 'Escape') {
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
  openedPopup = popup;
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
  openedPopup = null;
}

function closePopupOnEvent(evt) {
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
    closePopup(evt.currentTarget);
  }
}

export { openPopup, closePopup, closePopupOnEvent };
