import Card from './Card.js'
import FromValidator from './FormValidator.js';
import initialCards from './cards.js'
import { closePopupOnEvent, openPopup, closePopup } from './utils.js';

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

const popups = document.querySelectorAll('.popup');

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const formList = Array.from(
  document.querySelectorAll(validationSettings.formSelector));

function validateFrom(formElement) {
  const validator = new FromValidator(validationSettings, formElement);
  validator.enableValidation();
}

function setInput(inputElement, text) {
  inputElement.value = text;
  inputElement.dispatchEvent(new Event('input'));
}

function openProfilePopup() {
  setInput(profileNameInput, profileName.textContent);
  setInput(profileAboutInput, profileAbout.textContent);
  openPopup(profilePopup);
}

function openCardPopup() {
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
  evt.target.reset();
  validateFrom(evt.target);
}

function addCard(cardData) {
  const card = new Card(cardData, '#template-card');
  const cardElement = card.generateCard();
  cardsGrid.prepend(cardElement);
}

profileOpenButton.addEventListener('click', openProfilePopup);
cardOpenButton.addEventListener('click', openCardPopup);

profileForm.addEventListener('submit', submitProfileForm);
cardForm.addEventListener('submit', submitCardForm);

popups.forEach((popup) => {
  popup.addEventListener('click', closePopupOnEvent);
});

initialCards.forEach(card => addCard(card));
formList.forEach(formElement => validateFrom(formElement));
