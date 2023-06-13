
const BASE_URL = "https://api.gorgulenko.nomoredomains.rocks"

// Сообщение для ревью:
// Сервер Яндекс.Практик не работает с 05.05.23 г. В Пачке написали что временно можно подключиться к другому серверу и дали ссылку - http://104.131.160.75:3000

function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`${res.status}`)
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
     // Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then(checkResponse)
}

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token)
        return data
      }
    })
}

export const checkToken = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  }).then(checkResponse)
}