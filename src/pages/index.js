import './index.css';

import Api from '../scripts/components/Api';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';

import {
  profileForm,
  profileOpenButton,
  cardForm,
  cardOpenButton,
  validationSelectors
} from '../scripts/utils/constants.js';

function createCard(cardItem) {
  const card = new Card(cardItem, '#template-card', imagePopup.open.bind(imagePopup));
  return card.generateCard();
}

function addCard(cardItem) {
  const cardElement = createCard(cardItem);
  cardsList.addItem(cardElement);
}

const cardsList = new Section({ renderer: addCard }, '.cards__grid');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-48',
  headers: {
    authorization: '***',
    'Content-Type': 'application/json',
  },
});

api.getInitialCards()
  .then(cardsItems => {
    cardsList.renderItems(cardsItems);
  })
  .catch(err => console.log(err))

const profileValidation = new FormValidator(validationSelectors, profileForm);
profileValidation.enableValidation();

const newCardValidation = new FormValidator(validationSelectors, cardForm);
newCardValidation.enableValidation();

const userInfo = new UserInfo('.profile__name', '.profile__about');

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

const cardPopup = new PopupWithForm('.popup_type_card', addCard);
cardPopup.setEventListeners();

const profilePopup = new PopupWithForm('.popup_type_profile', data => userInfo.setUserInfo(data));
profilePopup.setEventListeners();

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
