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

function openImagePopup(cardData) {
  image.src = cardData.link;
  image.alt = cardData.name;
  imageCaption.textContent = cardData.name;
  openPopup(imagePopup);
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
  disableButton(evt.submitter);
}

function toggleLikeButton(evt) {
  evt.target.classList.toggle('card__like-button_active');
}

function deleteCard(evt) {
  const cardElement = evt.target.closest('.card');
  cardElement.remove();
}

function createCard(cardData) {
  const cardTemplate = document.querySelector("#template-card").content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  const buttonLike = cardElement.querySelector('.card__like-button');
  buttonLike.addEventListener('click', toggleLikeButton);

  const buttonDelete = cardElement.querySelector('.card__delete-button');
  buttonDelete.addEventListener('click', deleteCard);

  cardImage.addEventListener('click', () => openImagePopup(cardData));

  return cardElement;
}

function addCard(cardData) {
  const cardElement = createCard(cardData);
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
