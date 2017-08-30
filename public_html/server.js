var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var pg = require('pg');

const conexaoStr = 'postgres://postgres:postgres@192.168.0.251:5433/nodeTeste';

var postgres = new pg.Client(conexaoStr);
postgres.connect();
postgres.query('CREATE TABLE IF NOT EXISTS usuario(' +
        'id serial NOT NULL, nome varchar(30),'+
        'login varchar(30) not null, senha varchar(30) not null,'+
        'email varchar(70) not null,'+
        'CONSTRAINT solucoes_pedagio_ciot_id_pk PRIMARY KEY (id));');

console.log(postgres.query('SELECT * FROM usuario'));


app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.lastPlayderID = 0;

server.listen(process.env.PORT || 8081, function () {
    console.log('Listening on ' + server.address().port);
});

io.on('connection', function (socket) {

    socket.on('newplayer', function () {
        socket.player = {
            id: server.lastPlayderID++,
            x: randomInt(100, 400),
            y: randomInt(100, 400)
        };
        socket.emit('allplayers', getAllPlayers());
        socket.broadcast.emit('newplayer', socket.player);

        socket.on('click', function (data) {
            console.log("click do usuário : " + socket.player.id);
//            io.emit('move',socket.player);
        });

        socket.on('disconnect', function () {
            io.emit('remove', socket.player.id);
        });
    });

    socket.on('')

    socket.on('test', function () {
        console.log('test received');
    });
});

function getAllPlayers() {
    var players = [];
    Object.keys(io.sockets.connected).forEach(function (socketID) {
        var player = io.sockets.connected[socketID].player;
        if (player)
            players.push(player);
    });
    return players;
}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
