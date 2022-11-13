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

  getInitialInformation(jwt) {
    return Promise.all([this.getUserInfo(jwt), this.getUsersCards(jwt)]);
  }

  getUserInfo(jwt) {
    return fetch(`${this._host}/users/me`, {
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${jwt}`
      },
    })
    .then(this._checkRequest);
  }

  getUsersCards(jwt) {
    return fetch(`${this._host}/cards`, {
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${jwt}`
      },
    })
    .then(this._checkRequest);
  }

  setUserInfo(inputValues, jwt) {
    return fetch(`${this._host}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify({
        name: inputValues.name,
        about: inputValues.about
      }),
    })
    .then(this._checkRequest);
  }

  setUserAvatar(inputValue, jwt) {
    return fetch(`${this._host}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify({
        avatar: inputValue.avatar
      })
    })
    .then(this._checkRequest);
  }

  addCard(inputValues, jwt) {
    return fetch(`${this._host}/cards`, {
      method: 'POST',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify({
        name: inputValues.title,
        link: inputValues.link
      }),
    })
    .then(this._checkRequest);
  }

  changeLikeCardStatus(id, isLiked, jwt) {
    if(isLiked) {
      return this.unlikeCard(id, jwt);
    } else {
      return this.likeCard(id, jwt);
    }
  }

  likeCard(id, jwt) {
    return fetch(`${this._host}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${jwt}`
      },
    })
    .then(this._checkRequest);
  }

  unlikeCard(id, jwt) {
    return fetch(`${this._host}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${jwt}`
      },
    })
    .then(this._checkRequest);
  }

  deleteCard(id, jwt) {
    return fetch(`${this._host}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${jwt}`
      },
    })
    .then(this._checkRequest);
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
    //'Authorization': `Bearer ${localStorage.getItem('jwt')}`
  }
});

export default api;