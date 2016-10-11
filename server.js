/**
 * chat server
 * @author phachon@163.com
 */
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use('/', express.static(__dirname + '/'));
//监听端口
server.listen(3001);

/**
 * 记录所有的用户
 * @type []
 */
var users = [];

/**
 * 记录在线用户数
 * @type {number}
 */
var onlineNumber = 0;


io.on('connection', function(socket) {

    //用户加入
    socket.on('join', function (userId) {
        if(!users[userId]) {
            users[userId] = {username: 'ss', img: ''};
            onlineNumber += 1;
        }
        //广播在线总数
        io.sockets.emit('onlineCount', onlineNumber);
        //给自己广播当前所有在线用户
        for(var userKey in users) {
            socket.emit('userStatus', userKey);
        }
        //给除自己之外的用户广播状态
        socket.broadcast.emit('userStatus', userId);
        console.log('用户' + userId + '加入了聊天');
    });

    //发送消息
    socket.on('send', function(userId, message) {
        console.log(message);
        io.sockets.emit('show', userId, message);
    });

    //用户退出
    socket.on('logout', function(userId) {
        if(users[userId]) {
            delete users[userId];
            onlineNumber -= 1;
        }
        //除自己之外的所有用户
        socket.broadcast.emit('onlineCount', onlineNumber);
        //广播用户状态
        socket.broadcast.emit('userStatus', userId);
        console.log('用户'+ userId + '退出');
    });
});
