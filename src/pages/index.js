import './index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import initialCards from '../scripts/utils/constants.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';

const profileForm = document.querySelector('.popup_type_profile .popup__form');
const profileOpenButton = document.querySelector('.profile__edit-button');

const cardForm = document.querySelector('.popup_type_card .popup__form');
const cardOpenButton = document.querySelector('.profile__add-button');

const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const profileValidation = new FormValidator(selectors, profileForm);
profileValidation.enableValidation();

const newCardValidation = new FormValidator(selectors, cardForm);
newCardValidation.enableValidation();

const userInfo = new UserInfo('.profile__name', '.profile__about');

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

const cardPopup = new PopupWithForm('.popup_type_card', data => addCard(data));
cardPopup.setEventListeners();

const profilePopup = new PopupWithForm('.popup_type_profile', data => userInfo.setUserInfo(data));
profilePopup.setEventListeners();

function createCard(cardItem) {
  const card = new Card(cardItem, '#template-card', imagePopup.open.bind(imagePopup));
  return card.generateCard();
}

function addCard(cardItem) {
  const cardElement = createCard(cardItem)
  cardsList.addItem(cardElement);
}

const cardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    addCard(cardItem);
  },
}, '.cards__grid');
cardsList.renderItems();

function openProfilePopup() {
  const { name, about } = userInfo.getUserInfo();
  profileForm.elements.name.value = name;
  profileForm.elements.about.value = about;
  profileValidation.resetValidation();
  profilePopup.open();
}

function openCardPopup() {
  newCardValidation.resetValidation();
  cardPopup.open();
}

profileOpenButton.addEventListener('click', openProfilePopup);
cardOpenButton.addEventListener('click', openCardPopup);
