const profile = document.querySelector('.profile');
const editProfileOpenButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');

const editProfilePopup = document.querySelector('.popup_type_profile');
const editProfileCloseButton = editProfilePopup.querySelector('.popup__close');
const editProfileForm = editProfilePopup.querySelector('.popup__form')
const editProfileName = editProfilePopup.querySelector('.popup__form-item_el_name');
const editProfileAbout = editProfilePopup.querySelector('.popup__form-item_el_about');

function openPopupEditProfile() {
  editProfilePopup.classList.remove('popup_hidden');
  editProfileName.value = profileName.textContent;
  editProfileAbout.value = profileAbout.textContent;
}

function closePopupEditProfile() {
  editProfilePopup.classList.add('popup_hidden');
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
