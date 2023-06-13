/**
 * Класс AccessDeniedError (Ошибка доступа запрещена)
 *
 * Класс, представляющий ошибку доступа, запрещенного.
 *  Используется для обработки ситуаций, когда у пользователя
 * отсутствуют необходимые права для выполнения определенного действия.
 *  Устанавливает статус код 403.
 *
 * Пример использования:
 * throw new AccessDeniedError('Доступ запрещен. У вас нет прав для
 *  выполнения этого действия.');
 *
 * @class AccessDeniedError
 * @extends Error
 */
module.exports = class AccessDeniedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
};
