class Api {
   constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
   }

   _getResponseData(res) {
      if (!res.ok) {
         return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
   }

   /* Загрузка информации о пользователе с сервера */
   getUserInfo() {
      return fetch(`${this._baseUrl}/users/me `, {
         headers: this._headers,
      })
         .then(res => this._getResponseData(res));
   }

   /* Загрузка карточек с сервера */
   getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
         headers: this._headers,
      })
         .then(res => this._getResponseData(res));
   }

   /*  Редактирование профиля */
   changeUserInfo(data) {
      return fetch(`${this._baseUrl}/users/me`, {
         method: 'PATCH',
         headers: this._headers,
         body: JSON.stringify({
            name: data.name,
            about: data.about,
         })
      })
         .then(res => this._getResponseData(res));
   }

   /* Добавление новой карточки */
   addCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
         method: 'POST',
         headers: this._headers,
         body: JSON.stringify(data)
      })
         .then(res => this._getResponseData(res));
   }

   /* Удаление карточки */
   deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
         method: 'DELETE',
         headers: this._headers,
      })
         .then(res => this._getResponseData(res));
   }

   /* Постановка и снятие лайка */
   addLikeToCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
         method: 'PUT',
         headers: this._headers,
      })
         .then(res => this._getResponseData(res));
   }

   deleteLikeFromCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
         method: 'DELETE',
         headers: this._headers,
      })
         .then(res => this._getResponseData(res));
   }

   /* Обновление аватара пользователя */
   changeUserAvatar(data) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
         method: 'PATCH',
         headers: this._headers,
         body: JSON.stringify({ avatar: data.avatar, })
      })
         .then(res => this._getResponseData(res));
   }
}


/* Api */
const api = new Api({
   baseUrl: 'https://api.gorgulenko.nomoredomains.rocks',
   headers: {
     // authorization: 'e8ff1818-32ec-483e-81a6-a3c457dfad06',
     authorization: `Bearer ${localStorage.getItem("jwt")}`,
      'Content-Type': 'application/json'
   }
});

export default api