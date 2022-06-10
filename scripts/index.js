const initialCards = [
  {
    name: 'Озеро Комо',
    link: 'https://images.unsplash.com/photo-1652633485407-ffc8351fbead?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Кораблекрушение',
    link: 'https://images.unsplash.com/photo-1653122952207-f20ba3c64f35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Миннеаполис',
    link: 'https://images.unsplash.com/photo-1652845546552-9cb18c0015c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const cardsGrid = document.querySelector('.cards__grid');


const profile = document.querySelector('.profile');
const profileOpenButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');

const profilePopup = document.querySelector('.popup_type_profile');
const profileCloseButton = profilePopup.querySelector('.popup__close');
const profileForm = profilePopup.querySelector('.popup__form');
const profileNameInput = profileForm.querySelector('.popup__form-item_el_name');
const profileAboutInput = profileForm.querySelector('.popup__form-item_el_about');


const cardPopup = document.querySelector('.popup_type_card');
const cardCloseButton = cardPopup.querySelector('.popup__close');
const cardForm = cardPopup.querySelector('.popup__form');
const cardNameInput = cardForm.querySelector('.popup__form-item_el_place');
const cardLinkInput = cardForm.querySelector('.popup__form-item_el_link');
const cardOpenButton = document.querySelector('.profile__add-button');


const imagePopup = document.querySelector('.popup_type_image');
const image = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__image-caption');
const imageCloseButon = imagePopup.querySelector('.popup__close');


function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function addCard(imageName, imageLink) {
  const cardTemplate = document.querySelector("#template-card").content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = imageLink;
  cardImage.alt = imageName;
  cardTitle.textContent = imageName;

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => cardElement.remove());

  cardImage.addEventListener('click', function () {
    openPopup(imagePopup);
    image.src = imageLink;
    imageCaption.textContent = imageName;
  });

  cardsGrid.prepend(cardElement);
}

function loadCards() {
  initialCards.forEach(card => addCard(card.name, card.link));
}


profileOpenButton.addEventListener('click', function () {
  openPopup(profilePopup);

  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent;
});

profileCloseButton.addEventListener('click', () => closePopup(profilePopup));

profileForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = profileAboutInput.value;

  closePopup(profilePopup);
});


cardOpenButton.addEventListener('click', () => openPopup(cardPopup));

cardCloseButton.addEventListener('click', () => closePopup(cardPopup));

cardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  addCard(cardNameInput.value, cardLinkInput.value);
  closePopup(cardPopup);
});


imageCloseButon.addEventListener('click', () => closePopup(imagePopup));

loadCards();
