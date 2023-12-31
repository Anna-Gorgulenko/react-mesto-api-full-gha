class Api {
   constructor(options) {
      this._baseUrl = options.baseUrl;
   }

   _getResponseData(res) {
      if (res.ok) {
         return Promise.resolve(res.json());
      }
      return Promise.reject(`Ошибка: ${res.status}`);
   }

   /*  Редактирование профиля */
   async changeUserInfo(data) {
      const response = await fetch(`${this._baseUrl}/users/me`, {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("jwt")}`,
         },
         body: JSON.stringify({
            name: data.name,
            about: data.about,
         }),
      });
      return this._getResponseData(response);
   }

   /* Загрузка информации о пользователе с сервера */
   async getUserInfo() {
      const response = await fetch(`${this._baseUrl}/users/me`, {
         headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("jwt")}`,
         },
      });
      return this._getResponseData(response);
   }

   /* Загрузка карточек с сервера */
   async getInitialCards() {
      const response = await fetch(`${this._baseUrl}/cards`, {
         headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("jwt")}`,
         },
      });
      return this._getResponseData(response);
   }

   /* Добавление новой карточки */
   async addCard(data) {
      const response = await fetch(`${this._baseUrl}/cards`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("jwt")}`,
         },
         body: JSON.stringify(data),
      });
      return this._getResponseData(response);
   }

   /* Удаление карточки */
   async deleteCard(cardId) {
      const response = await fetch(`${this._baseUrl}/cards/${cardId}`, {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("jwt")}`,
         },
      });
      return this._getResponseData(response);
   }

   /* Постановка лайка */
   async addLikeToCard(cardId) {
      const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("jwt")}`,
         },
      });
      return this._getResponseData(response);
   }

   /* Удаление лайка */
   async deleteLikeFromCard(cardId) {
      const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("jwt")}`,
         },
      });
      return this._getResponseData(response);
   }

   /* Обновление аватара пользователя */
   async changeUserAvatar(data) {
      const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("jwt")}`,
         },
         body: JSON.stringify({
            avatar: data.avatar,
         }),
      });
      return this._getResponseData(response);
   }
}


const api = new Api({
   baseUrl: "https://api.gorgulenko.nomoredomains.rocks",
});

export default api;