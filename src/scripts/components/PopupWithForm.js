import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector)

    this._handleFormSubmit = handleFormSubmit;

    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._form.querySelector(".popup__submit");
    this._inputList = this._form.querySelectorAll('.popup__input');
  }

  close() {
    this._form.reset();
    super.close();
  }

  setHandleSubmit(handler) {
    this._handleFormSubmit = handler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()

      const text = this._submitButton.textContent;
      this._submitButton.textContent = "Сохранение...";
      this._handleFormSubmit(this._getInputValues())
        .then(() => this.close())
        .catch(err => console.log(err))
        .finally(() => {
          this._submitButton.textContent = text;
        })
    });
  }

  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    });
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }
}

export default PopupWithForm;
