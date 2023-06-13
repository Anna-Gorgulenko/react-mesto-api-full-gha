const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../utils/constants');
const AuthenticationError = require('../errors/AuthenticationError');

module.exports = (req, _, next) => {
  const { authorization } = req.headers;
  const bearer = 'Bearer ';
  const errorMessage = 'Неправильные почта или пароль';
  // Проверяем наличие и формат заголовка авторизации
  if (!authorization || !authorization.startsWith(bearer)) {
    return next(new AuthenticationError(`${errorMessage}(${authorization})!`));
  }

  const token = authorization.replace(bearer, '');
  let payload;

  try {
    // Верифицируем токен с использованием секретного ключа
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return next(new AuthenticationError(`${errorMessage}!`));
  }

  // Сохраняем данные пользователя в объекте запроса
  req.user = payload;

  return next();
};
