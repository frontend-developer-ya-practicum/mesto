import './index.css';

import Api from '../scripts/components/Api';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';

import {
  avatarForm,
  avatarEditButton,
  profileForm,
  profileOpenButton,
  cardForm,
  cardOpenButton,
  validationSelectors,
} from '../scripts/utils/constants.js';

import {
  API_ROOT,
  API_TOKEN,
} from '../scripts/utils/envrionment.js';

function createCard(cardData) {
  const card = new Card({
    cardData: cardData,
    cardSelector: '#template-card',
    userInfo: userInfo.getUserInfo(),
    api: api,
    openImagePopup: data => imagePopup.open(data),
    openConfirmDeletePopup: (handler) => {
      confirmCardDeletePopup.setHandleSubmit(handler);
      confirmCardDeletePopup.open();
    }
  });
  return card.generateCard();
}

function addCard(cardData) {
  const cardElement = createCard(cardData);
  cardsList.addItem(cardElement);
}

const cardsList = new Section({ renderer: addCard }, '.cards__grid');

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userAboutSelector: '.profile__about',
  userAvatarSelector: '.profile__avatar-image',
});

const api = new Api({
  baseUrl: API_ROOT,
  headers: {
    authorization: API_TOKEN,
    'Content-Type': 'application/json',
  },
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    cardsList.renderItems(cards);
  })
  .catch(err => console.log(err));

const profileValidation = new FormValidator(validationSelectors, profileForm);
profileValidation.enableValidation();

const newCardValidation = new FormValidator(validationSelectors, cardForm);
newCardValidation.enableValidation();

const avatarValidation = new FormValidator(validationSelectors, avatarForm);
avatarValidation.enableValidation();

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

const cardPopup = new PopupWithForm('.popup_type_card', data => {
  return api.postCard(data)
    .then(data => addCard(data))
    .catch(err => console.log(err))
});
cardPopup.setEventListeners();

const profilePopup = new PopupWithForm('.popup_type_profile', data => {
  return api.patchUserInfo(data)
    .then(data => userInfo.setUserInfo(data))
    .catch(err => console.log(err))
});
profilePopup.setEventListeners();

const confirmCardDeletePopup = new PopupWithForm('.popup_type_confirm');
confirmCardDeletePopup.setEventListeners();

const editAvatarPopup = new PopupWithForm('.popup_type_avatar', data => {
  return api.patchUserAvatar(data)
    .then(data => userInfo.setUserAvatar(data))
    .catch(err => console.log(err))
});
editAvatarPopup.setEventListeners();

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

function openEditAvatarPopup() {
  avatarValidation.resetValidation();
  editAvatarPopup.open();
}

avatarEditButton.addEventListener('click', openEditAvatarPopup);
profileOpenButton.addEventListener('click', openProfilePopup);
cardOpenButton.addEventListener('click', openCardPopup);
