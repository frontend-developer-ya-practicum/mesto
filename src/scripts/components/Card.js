class Card {
  constructor(cardData, cardSelector, openImagePopup) {
    this._cardData = cardData;
    this._cardSelector = cardSelector;
    this._openImagePopup = openImagePopup;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._buttonLike = this._element.querySelector('.card__like-button');
    this._likesCount = this._element.querySelector('.card__like-count');
    this._buttonDelete = this._element.querySelector('.card__delete-button');

    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');

    this._cardImage.src = this._cardData.link;
    this._cardImage.alt = this._cardData.name;
    this._cardTitle.textContent = this._cardData.name;
    this._likesCount.textContent = this._cardData.likes.length;
    this._id = this._cardData._id;

    this._setEventListeners();

    return this._element;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _toggleButtonLike() {
    this._buttonLike.classList.toggle('card__like-button_active');
  }

  _delete() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._toggleButtonLike();
    });
    this._buttonDelete.addEventListener('click', () => {
      this._delete();
    });
    this._cardImage.addEventListener('click', () => {
      this._openImagePopup(this._cardData);
    });
  }
}

export default Card;
