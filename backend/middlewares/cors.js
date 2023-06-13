/*
В этом файле определен middleware для обработки CORS (Cross-Origin Resource Sharing) - механизма,
 который позволяет веб-странице получать ресурсы с другого источника (домена),
  отличного от источника самой страницы.
*/

/* allowedCors - массив, содержащий список разрешенных источников запросов.
 Если источник запроса находится в этом списке, то будет разрешен доступ к ресурсам. */
const allowedCors = [
  'https://gorgulenko.nomoredomains.rocks',
  'http://gorgulenko.nomoredomains.rocks',
  'https://localhost:3000',
  'http://localhost:3000',
  'https://localhost:3001',
  'http://localhost:3001',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers; // сохраняет источник запроса в переменную
  const { method } = req; // сохраняет тип запроса (HTTP-метод) в переменную
  // сохраняем заголовки запроса, отправленные в предварительном запросе OPTIONS,
  // в переменную requestHeaders.
  const requestHeaders = req.headers['access-control-request-headers'];

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  // устанавливает заголовок, который разрешает передачу учетных данных
  // (как куки или заголовки авторизации) в запросах с другого источника.
  res.header('Access-Control-Allow-Credentials', true);
  // проверяет, содержит ли массив allowedCors значение origin (источник запроса), если да,
  // то устанавливает заголовок 'Access-Control-Allow-Origin', разрешая запросы с этого источника.
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }

  return next();
};
