/*class Api {
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
   /*getUserInfo() {
      return fetch(`${this._baseUrl}/users/me `, {
         headers: this._headers,
      })
         .then(res => this._getResponseData(res));
   }

   /* Загрузка карточек с сервера */
   /*getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
         headers: this._headers,
      })
         .then(res => this._getResponseData(res));
   }

   /*  Редактирование профиля */
   /*changeUserInfo(data) {
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
   /*addCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
         method: 'POST',
         headers: this._headers,
         body: JSON.stringify(data)
      })
         .then(res => this._getResponseData(res));
   }

   /* Удаление карточки */
   /*deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
         method: 'DELETE',
         headers: this._headers,
      })
         .then(res => this._getResponseData(res));
   }

   /* Постановка и снятие лайка */
   /*addLikeToCard(cardId) {
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
   /*changeUserAvatar(data) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
         method: 'PATCH',
         headers: this._headers,
         body: JSON.stringify({ avatar: data.avatar, })
      })
         .then(res => this._getResponseData(res));
   }
}


/* Api */
/*const api = new Api({
   baseUrl: 'https://api.gorgulenko.nomoredomains.rocks',
   headers: {
     // authorization: 'e8ff1818-32ec-483e-81a6-a3c457dfad06',
     authorization: `Bearer ${localStorage.getItem("jwt")}`,
      'Content-Type': 'application/json'
   }
});

export default api*/

//create class api
class Api {
   constructor(options) {
     this._baseUrl = options.baseUrl;
   }
 
   //checking the server response
   _handleResponse(res) {
     if (res.ok) {
       return Promise.resolve(res.json());
     }
 
     //reject promise
     return Promise.reject(`Ошибка: ${res.status}`);
   }
 
   //edit profile
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
     return this._handleResponse(response);
   }
 
   //downloading user info trom the server
   async getUserInfo() {
     const response = await fetch(`${this._baseUrl}/users/me`, {
       headers: {
         "Content-Type": "application/json",
         authorization: `Bearer ${localStorage.getItem("jwt")}`,
       },
     });
     return this._handleResponse(response);
   }
 
   //downloading cards from the server
   async getInitialCards() {
     const response = await fetch(`${this._baseUrl}/cards`, {
       headers: {
         "Content-Type": "application/json",
         authorization: `Bearer ${localStorage.getItem("jwt")}`,
       },
     });
     return this._handleResponse(response);
   }
 
   //add a new card from the server
   async addCard(data) {
     const response = await fetch(`${this._baseUrl}/cards`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         authorization: `Bearer ${localStorage.getItem("jwt")}`,
       },
       body: JSON.stringify(data),
     });
     return this._handleResponse(response);
   }
 
   //delete card
   async deleteCard(cardId) {
     const response = await fetch(`${this._baseUrl}/cards/${cardId}`, {
       method: "DELETE",
       headers: {
         "Content-Type": "application/json",
         authorization: `Bearer ${localStorage.getItem("jwt")}`,
       },
     });
     return this._handleResponse(response);
   }
 
   //add like for the cards
   async addLikeToCard(cardId) {
     const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
       method: "PUT",
       headers: {
         "Content-Type": "application/json",
         authorization: `Bearer ${localStorage.getItem("jwt")}`,
       },
     });
     return this._handleResponse(response);
   }
 
   //remove like for the cards
   async deleteLikeFromCard(cardId) {
     const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
       method: "DELETE",
       headers: {
         "Content-Type": "application/json",
         authorization: `Bearer ${localStorage.getItem("jwt")}`,
       },
     });
     return this._handleResponse(response);
   }
 
   //avatar update
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
     return this._handleResponse(response);
   }
 }
 
 //connect api
 const api = new Api({
   baseUrl: "https://api.gorgulenko.nomoredomains.rocks",
 });
 
 export default api;