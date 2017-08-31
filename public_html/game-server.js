var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/game.html')
});

server.listen(process.env.PORT || 8081, function () {
    console.log('SERVIDOR ON | PORT : 8081');
});

io.on('connection', function (socket) {
    socket.on('test', function () {
        console.log('Teste Ativado');
    });
    
    socket.on('movimentarPlayer', function (data) {
        console.log(data);
    });
});