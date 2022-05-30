let profile = document.querySelector('.profile');
let editProfileOpenButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');

let popup = document.querySelector('.popup');
let editProfileCloseButton = popup.querySelector('.popup__close');
let editProfileForm = popup.querySelector('.popup__content')
let editProfileName = popup.querySelector('.popup__input-name');
let editProfileAbout = popup.querySelector('.popup__input-about');

function openPopupEditProfile() {
  popup.classList.add('popup_opened');
  editProfileName.value = profileName.textContent;
  editProfileAbout.value = profileAbout.textContent;
}

function closePopupEditProfile() {
  popup.classList.remove('popup_opened');
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
