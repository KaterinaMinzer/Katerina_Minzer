var http = require('http');
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'user'

});

connection.connect();

var sockjs = require('sockjs');

var echo = sockjs.createServer();
echo.on('connection', function(conn) {

    setInterval(function(){
        connection.query('SELECT id FROM  users ', function(err, rows, fields) {
            if (err) throw err;

            conn.write('The solution is: '+rows[1]['id']);
        });
    },1000);

    conn.on('data', function(message) {
        console.log(message);
    });
    conn.on('close', function() {});
});

var server = http.createServer();
echo.installHandlers(server, {prefix:'/echo'});
server.listen(8888, '0.0.0.0');
