// Middleware для обработки ошибок
const errorHandler = (err, _, res, next) => {
  const statusCode = err.statusCode || 500; // Определяем статус код ошибки,
  // либо устанавливаем значение по умолчанию 500

  // Определяем сообщение об ошибке в зависимости от статус кода
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;

  res.status(statusCode).send({ message }); // Отправляем ответ с указанным статус кодом
  // и сообщением об ошибке
  next(); // Передаем управление следующему middleware или обработчику маршрута
};

module.exports = errorHandler; // Экспортируем middleware функцию
