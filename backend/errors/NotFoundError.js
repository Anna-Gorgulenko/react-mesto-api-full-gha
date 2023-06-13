/**
 * Класс NotFoundError (Ошибка: ресурс не найден)
 *
 * Класс, представляющий ошибку "ресурс не найден". Используется для
 *  обработки ситуаций, когда запрашиваемый ресурс не найден.
 * Устанавливает статус код 404.
 *
 * Пример использования:
 * throw new NotFoundError('Запрашиваемый ресурс не найден.');
 *
 * @class NotFoundError
 * @extends Error
 */
module.exports = class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
};
