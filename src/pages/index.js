import './index.css';

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';

import {
  initialCards,
  profileForm,
  profileOpenButton,
  cardForm,
  cardOpenButton,
  validationSelectors
} from '../scripts/utils/constants.js';


const profileValidation = new FormValidator(validationSelectors, profileForm);
profileValidation.enableValidation();

const newCardValidation = new FormValidator(validationSelectors, cardForm);
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
