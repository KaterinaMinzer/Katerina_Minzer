/**
 * Created by Katherina on 10.02.2017.
 */
var data = {
    'username': username,
    'password': password
};

$.ajax({
    type: "GET",
    url: 'login',
    data: data,
    success: console.log('response sucsess')
});
router.get('/', function(req, res) {

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'user_reg'
    });

    connection.connect();

    var username = req.query.username,
        password = req.query.password
    connection.query('SELECT password FROM `users` WHERE login = "' + username +'"',            function(err, rows, fields) {
        if (err) throw err;
        else if (rows.length > 0 && password == rows[0].password) {
            console.log('Hello');
        } else {
            console.log('Go away!');
        }
    });

    connection.end();
    res.end();
});


app.listen(8888, function () {
    console.log('!!');
});
