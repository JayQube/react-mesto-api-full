class Api {
  constructor({baseUrl, headers}) {
    this._host = baseUrl;
    this._headers = headers;
  }

  _checkRequest(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialInformation() {
    return Promise.all([this.getUserInfo(), this.getUsersCards()]);
  }

  getUserInfo() {
    return fetch(`${this._host}/users/me`, {
      headers: this._headers,
    })
    .then(this._checkRequest);
  }

  getUsersCards() {
    return fetch(`${this._host}/cards`, {
      headers: this._headers
    })
    .then(this._checkRequest);
  }

  setUserInfo(inputValues) {
    return fetch(`${this._host}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: inputValues.name,
        about: inputValues.about
      }),
    })
    .then(this._checkRequest);
  }

  setUserAvatar(inputValue) {
    return fetch(`${this._host}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: inputValue.avatar
      })
    })
    .then(this._checkRequest);
  }

  addCard(inputValues) {
    return fetch(`${this._host}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: inputValues.title,
        link: inputValues.link
      }),
    })
    .then(this._checkRequest);
  }

  changeLikeCardStatus(id, isLiked) {
    if(isLiked) {
      return this.unlikeCard(id);
    }
    return this.likeCard(id);
  }

  likeCard(id) {
    return fetch(`${this._host}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._checkRequest);
  }

  unlikeCard(id) {
    return fetch(`${this._host}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkRequest);
  }

  deleteCard(id) {
    return fetch(`${this._host}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkRequest);
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-47',
  headers: {
    authorization: '27812169-906a-4979-a2e1-91654db30e03',
    'Content-Type': 'application/json'
  }
});

export default api;