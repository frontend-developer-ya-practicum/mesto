const profileForm = document.querySelector('.popup_type_profile .popup__form');
const profileOpenButton = document.querySelector('.profile__edit-button');

const cardForm = document.querySelector('.popup_type_card .popup__form');
const cardOpenButton = document.querySelector('.profile__add-button');

const validationSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export {
  profileForm,
  profileOpenButton,
  cardForm,
  cardOpenButton,
  validationSelectors
};
