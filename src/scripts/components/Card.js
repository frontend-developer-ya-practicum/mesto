class Card {
  constructor({ cardData, cardSelector, userInfo, openImagePopup, putLike, deleteLike}) {
    this._cardData = cardData;
    this._cardSelector = cardSelector;
    this._openImagePopup = openImagePopup;
    this._putLike = putLike;
    this._deleteLike = deleteLike;
    this._meUserId = userInfo.id;
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
    this._id = this._cardData._id;

    this._renderLike(this._cardData);
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
    const isActive = this._buttonLike.classList.contains('card__like-button_active');
    const method = isActive ? this._deleteLike : this._putLike;
    method({ cardId: this._id })
      .then(data => this._renderLike(data))
      .catch(err => console.log(err));
  }

  _renderLike({ likes }) {
    this._likesCount.textContent = likes.length;
    if (likes.find(user => user._id === this._meUserId)) {
      this._buttonLike.classList.add('card__like-button_active');
    } else {
      this._buttonLike.classList.remove('card__like-button_active');
    }
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
