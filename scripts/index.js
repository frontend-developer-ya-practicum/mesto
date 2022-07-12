import Card from './Card.js'
import initialCards from './cards.js'
import { closePopupOnEvent, openPopup, closePopup } from './utils.js';
import { disableButton, settings } from './validate.js'

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
  disableButton(evt.submitter, settings);
}

function addCard(cardData) {
  const card = new Card(cardData, '#template-card');
  const cardElement = card.generateCard();
  cardsGrid.prepend(cardElement);
}

function loadCards() {
  initialCards.forEach(card => addCard(card));
}

profileOpenButton.addEventListener('click', openProfilePopup);
cardOpenButton.addEventListener('click', openCardPopup);

profileForm.addEventListener('submit', submitProfileForm);
cardForm.addEventListener('submit', submitCardForm);

popups.forEach((popup) => {
  popup.addEventListener('click', closePopupOnEvent);
});

loadCards();
