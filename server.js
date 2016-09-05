var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use(express.static(__dirname+'/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + 'index.html')
});

http.listen(port, function() {
    console.log('Server listening on port ' + port);
});

var users = [];

io.on('connection', function(socket) {
    socket.on('new-message', function(msg) {
        io.emit('new-message', msg);
    });

    socket.on('login', function(username) {
        users[socket.id] = username;

        io.emit('login', {
            numUsers: users.length,
            username: username
        });
    });

    socket.on('disconnect', function (data) {
        io.emit('logout', {
            username: users[socket.id],
            numUsers: users.length
        });

        delete users[socket.id];
    });
});
