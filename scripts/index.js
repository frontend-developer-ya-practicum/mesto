import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import initialCards from './cards.js';
import UserInfo from './UserInfo.js';

const profile = document.querySelector('.profile');
const profileOpenButton = profile.querySelector('.profile__edit-button');

const profilePopup = document.querySelector('.popup_type_profile');
const profileForm = profilePopup.querySelector('.popup__form');
const profileNameInput = profileForm.elements.name;
const profileAboutInput = profileForm.elements.about;

const cardPopup = document.querySelector('.popup_type_card');
const cardForm = cardPopup.querySelector('.popup__form');
const cardNameInput = cardForm.elements.name;
const cardLinkInput = cardForm.elements.link;
const cardOpenButton = document.querySelector('.profile__add-button');

const imagePopup = document.querySelector('.popup_type_image');
const image = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__image-caption');

const popups = document.querySelectorAll('.popup');

const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const profileValidation = new FormValidator(selectors, profileForm);
const newCardValidation = new FormValidator(selectors, cardForm);
profileValidation.enableValidation();
newCardValidation.enableValidation();


function createCard(cardItem) {
  const card = new Card(cardItem, '#template-card', openImagePopup);
  return card.generateCard();
}

const cardListSelector = '.cards__grid';
const cardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const cardElement = createCard(cardItem)
    cardsList.addItem(cardElement);
  },
}, cardListSelector);
cardsList.renderItems();

const userNameSelector = '.profile__name';
const userAboutSelector = '.profile__about'
const userInfo = new UserInfo(userNameSelector, userAboutSelector);

function closePopupOnEsc(evt) {
  if (evt.code === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
}

function closePopupOnEvent(evt) {
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
    closePopup(evt.currentTarget);
  }
}

function openImagePopup(cardItem) {
  image.src = cardItem.link;
  image.alt = cardItem.name;
  imageCaption.textContent = cardItem.name;
  openPopup(imagePopup);
}

function openProfilePopup() {
  const {name, about} = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileAboutInput.value = about;
  profileValidation.resetValidation();
  openPopup(profilePopup);
}

function openCardPopup() {
  cardForm.reset();
  newCardValidation.resetValidation();
  openPopup(cardPopup);
}

function submitProfileForm(evt) {
  evt.preventDefault();
  userInfo.setUserInfo({
    name: profileNameInput.value,
    about: profileAboutInput.value,
  });
  closePopup(profilePopup);
}

function submitCardForm(evt) {
  evt.preventDefault();

  const cardItem = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };
  const cardElement = createCard(cardItem);
  cardsList.addItem(cardElement);
  closePopup(cardPopup);
}

profileOpenButton.addEventListener('click', openProfilePopup);
cardOpenButton.addEventListener('click', openCardPopup);

profileForm.addEventListener('submit', submitProfileForm);
cardForm.addEventListener('submit', submitCardForm);

popups.forEach((popup) => {
  popup.addEventListener('click', closePopupOnEvent);
});
