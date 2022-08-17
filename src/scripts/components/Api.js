class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers,
    })
      .then(resp => this._checkResp(
        resp, "Ошибка при загрузке карточек")
      )
  }

  postCard({ name, link }) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then(resp => this._checkResp(
        resp, "Ошибка при добавлении новой карточки")
      )
  }

  deleteCard({ cardId }) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(resp => this._checkResp(
        resp, "Ошибка при удалении карточки")
      )
  }

  putLike({ cardId }) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(resp => this._checkResp(
        resp, "Ошибка при постановке лайка")
      )
  }

  deleteLike({ cardId }) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(resp => this._checkResp(
        resp, "Ошибка при снятии лайка")
      )
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers,
    })
      .then(resp => this._checkResp(
        resp, "Ошибка при загрузке информации о пользователе")
      )

  }

  patchUserInfo({ name, about }) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then(resp => this._checkResp(
        resp, "Ошибка при редактировании профиля")
      )
  }

  _checkResp(resp, errorMessage) {
    if (resp.ok) {
      return resp.json()
    }
    return Promise.reject(`${errorMessage}: ${resp.status}`)
  }
}

export default Api;
