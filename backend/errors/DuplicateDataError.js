/**
 * Класс DuplicateDataError (Ошибка дублирования данных)
 *
 * Класс, представляющий ошибку дублирования данных.
 *  Используется для обработки ситуаций, когда встречаются
 * дублирующиеся данные, которые не могут быть сохранены.
 *  Устанавливает статус код 409.
 *
 * Пример использования:
 * throw new DuplicateDataError('Пользователь с таким именем уже существует');
 *
 * @class DuplicateDataError
 * @extends Error
 */
module.exports = class DuplicateDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
};
