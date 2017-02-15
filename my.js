// Подключаем http модуль,
var http = require('http'),
// и mysql модуль.
    mysql = require("mysql");

// Создаем соединение.
// Настройки по умолчанию должны быть изменены в соответсвии с настройками mysql.
var connection = mysql.createConnection({
    user: "root",
    password: "root",
    database: "user_reg"
});

// Создаем http сервер.
http.createServer(function (request, response) {
    // Добавляем обработчик события.
    request.on('end', function () {
        console.log('on end');
        // Запрос к базе данных.
        connection.query('SELECT * FROM users;', function (error, rows, fields) {
            console.log(rows);
            response.writeHead(200, {
                'Content-Type': 'x-application/json'
            });
            // Отправляем данные в json формате.
            // Строки переменной содержат результат запроса.
            response.end(JSON.stringify(rows));
        });
    });
// Слушаем 8080 порт.
}).listen(8888);