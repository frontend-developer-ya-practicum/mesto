let profile = document.querySelector(".profile");
let edit_profile_open_button = profile.querySelector(".profile__edit-button");
let profile_name = profile.querySelector(".profile__name");
let profile_about = profile.querySelector(".profile__about");

let popup = document.querySelector(".popup");
let edit_profile_close_button = popup.querySelector(".popup__close");
let edit_profile_save_button = popup.querySelector(".popup__save");
let edit_profile_name = popup.querySelector(".popup__input-name");
let edit_profile_about = popup.querySelector(".popup__input-about");

let card_like_buttons = document.querySelectorAll(".card__like-button");

function openPopupEditProfile() {
  popup.classList.add("popup__opened");
  edit_profile_name.value = profile_name.textContent;
  edit_profile_about.value = profile_about.textContent;
}

function closePopupEditProfile() {
  popup.classList.remove("popup__opened");
}

function savePopupEditProfile(event) {
  event.preventDefault();
  profile_name.textContent = edit_profile_name.value
  profile_about.textContent = edit_profile_about.value
  closePopupEditProfile();
}

edit_profile_open_button.addEventListener("click", openPopupEditProfile);
edit_profile_close_button.addEventListener("click", closePopupEditProfile);
edit_profile_save_button.addEventListener("click", savePopupEditProfile);

for (let i = 0; i < card_like_buttons.length; i++) {
  card_like_buttons[i].addEventListener("click", function() {
    card_like_buttons[i].classList.toggle("card__like-button_active");
  });
}

