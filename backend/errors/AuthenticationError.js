/**
 * Класс AuthenticationError (Ошибка аутентификации)
 *
 * Класс, представляющий ошибку "аутентификации". Используется для
 *  обработки ситуаций, когда требуется аутентификация пользователя для доступа к ресурсу.
 * Устанавливает статус код 401.
 *
 * Пример использования:
 * throw new AuthenticationError('Требуется аутентификация для доступа к ресурсу.');
 *
 * @class AuthenticationError
 * @extends Error
 */
module.exports = class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
};
