var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);



/*
const fcm = require('fcm-notification');
const FCM = new fcm("./chatappkurs-427a3-firebase-adminsdk-hluk7-4b90e188fa.json");

const AndroidToken = "cfae3e5NTQqDD5YPTVJS_s:APA91bEeRi1GWxU8_RuTa4ZFNnZ9BXsKqQQ1cz52UT4ymEgAvqN-CAEmr-pmbmCzVsQdl8bDtOeoWMYXFBErThknfELoIQuQ5D30Q-6DQY8T5czR917_Vz-TGO8l0QBFQhycpTSwf8FA";

var message = {
 
    notification:{
        title : 'Title of notification',
        body : 'Body of notification'
    },
    token : AndroidToken
    };


    FCM.send(message, function(err, response) {
        if(err){
            console.log('error found', err);
        }else {
            console.log('response here', response);
        }
    });
*/
/*
app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html');
   });
   io.on('connection', function (socket) {
    socket.on('update', (data) => io.emit('update', {data}));
   }); 
   */ 
 
app.get('/', function(req,res){
    res.send('Hello');
});
let connectionRoomCount = {};
io.on('connection', function(socket){
    socket.on('connection-room',(data)=>{
        socket.join(data.roomId);
        connectionRoomCount[data.roomId] = (typeof connectionRoomCount[data.roomId] == 'undefined' ? 0 : connectionRoomCount[data.roomId] + 1);
        io.to(data.roomId).emit('connection-room-view', {count : connectionRoomCount[data.roomId]});
        console.log(connectionRoomCount);
    });
    
    socket.on('leave-room',(data)=>{
        socket.leave(data.roomId);
        connectionRoomCount[data.roomId] = (typeof connectionRoomCount[data.roomId] == 'undefined' ? 0 : connectionRoomCount[data.roomId] - 1);
        io.to(data.roomId).emit('connection-room-view', {count : connectionRoomCount[data.roomId]});
        console.log(connectionRoomCount);
    })
});


server.listen(3000);