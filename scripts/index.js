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

const viewImagePopup = document.querySelector('.popup_view-image');
const image = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__image-caption');
const closeImagePopupButon = viewImagePopup.querySelector('.popup__close');

closeImagePopupButon.addEventListener('click', function () {
  closePopup(viewImagePopup);
});

function addCard(card) {
  const cardsGrid = document.querySelector('.cards__grid');

  const cardTemplate = document.querySelector("#template-card").content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image')
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;

  const likeButton = cardElement.querySelector('.card__like-button')
  likeButton.addEventListener('click', function (event) {
    const target = event.target;
    target.classList.toggle('card__like-button_active');
  });

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function () {
    cardElement.remove();
  });

  cardImage.addEventListener('click', function () {
    viewImagePopup.classList.add('popup_opened');
    image.src = card.link;
    caption.textContent = card.name;
  });

  cardsGrid.prepend(cardElement);
}

function loadCards() {
  initialCards.forEach(function (card) {
    addCard(card);
  });
}

loadCards();

const profile = document.querySelector('.profile');
const editProfileOpenButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');

const editProfilePopup = document.querySelector('.popup_edit-profile');
const editProfileCloseButton = editProfilePopup.querySelector('.popup__close');
const editProfileForm = editProfilePopup.querySelector('.popup__form')
const editProfileName = editProfilePopup.querySelector('.popup__form-item_el_name');
const editProfileAbout = editProfilePopup.querySelector('.popup__form-item_el_about');

function openPopupEditProfile() {
  editProfilePopup.classList.add('popup_opened');
  editProfileName.value = profileName.textContent;
  editProfileAbout.value = profileAbout.textContent;
}

function closePopupEditProfile() {
  editProfilePopup.classList.remove('popup_opened');
}

function savePopupEditProfile(event) {
  event.preventDefault();
  profileName.textContent = editProfileName.value
  profileAbout.textContent = editProfileAbout.value
  closePopupEditProfile();
}

editProfileOpenButton.addEventListener('click', openPopupEditProfile);
editProfileCloseButton.addEventListener('click', closePopupEditProfile);
editProfileForm.addEventListener('submit', savePopupEditProfile);


const addPlacePopup = document.querySelector('.popup_add-place')
const addPlaceCloseButton = addPlacePopup.querySelector('.popup__close');
const addPlaceForm = addPlacePopup.querySelector('.popup__form')
const addPlaceName = addPlaceForm.querySelector('.popup__form-item_el_place');
const addPlaceLink = addPlaceForm.querySelector('.popup__form-item_el_link');
const addPlaceOpenButton = document.querySelector('.profile__add-button')

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

addPlaceOpenButton.addEventListener('click', function () {
  addPlacePopup.classList.add('popup_opened');
});

addPlaceCloseButton.addEventListener('click', function () {
  closePopup(addPlacePopup);
});

addPlaceForm.addEventListener('submit', function (event) {
  event.preventDefault();
  card = {
    name: addPlaceName.value,
    link: addPlaceLink.value,
  };
  addCard(card);
  closePopup(addPlacePopup);
});
