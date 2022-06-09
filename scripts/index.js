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

function loadCards() {
  const cardsGrid = document.querySelector('.cards__grid');
  initialCards.forEach(function (card) {
    const cardTemplate = document.querySelector("#template-card").content;

    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;

    cardsGrid.append(cardElement);
  });
}

loadCards();

const profile = document.querySelector('.profile');
const editProfileOpenButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');

const editProfilePopup = document.querySelector('.popup');
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
