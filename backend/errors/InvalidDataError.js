/**
 * Класс InvalidDataError (Ошибка неверных данных)
 *
 * Класс, представляющий ошибку неверных данных. Используется для обработки
 *  ситуаций, когда предоставленные данные
 * некорректны или неверны. Устанавливает статус код 400.
 *
 * Пример использования:
 * throw new InvalidDataError('Предоставленные данные неверны.');
 *
 * @class InvalidDataError
 * @extends Error
 */
module.exports = class InvalidDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
};
