import Card from './Card.js';
import FormValidator from './FormValidator.js';
import initialCards from './cards.js';

const cardsGrid = document.querySelector('.cards__grid');

const profile = document.querySelector('.profile');
const profileOpenButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');

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

function openImagePopup(cardData) {
  image.src = cardData.link;
  image.alt = cardData.name;
  imageCaption.textContent = cardData.name;
  openPopup(imagePopup);
}

function openProfilePopup() {
  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent;
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
  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = profileAboutInput.value;
  closePopup(profilePopup);
}

function submitCardForm(evt) {
  evt.preventDefault();

  closePopup(cardPopup);
  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };
  addCard(cardData);
}

function createCard(cardData) {
  const card = new Card(cardData, '#template-card', openImagePopup);
  return card.generateCard();
}

function addCard(cardData) {
  const cardElement = createCard(cardData);
  cardsGrid.prepend(cardElement);
}

function loadCards() {
  initialCards.forEach(cardData => addCard(cardData));
}

profileOpenButton.addEventListener('click', openProfilePopup);
cardOpenButton.addEventListener('click', openCardPopup);

profileForm.addEventListener('submit', submitProfileForm);
cardForm.addEventListener('submit', submitCardForm);

popups.forEach((popup) => {
  popup.addEventListener('click', closePopupOnEvent);
});

loadCards();
