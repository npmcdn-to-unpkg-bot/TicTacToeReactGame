var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//server initialization
app.use(express.static('static'));

app.get('/', function(req, res){
  res.sendfile('index.html');
});

http.listen(3777, function(){
  console.log('listening on *:3777');
});

function userLogin(roomID, socket){
  if(roomID){
    findRoom(roomID, socket);
  }else{
    createRoom(socket);
  }
}
function userLogout(socket){
  rooms.forEach(function(item){
    if(item.player1 == socket.id || item.player2 == socket.id){
      console.log('destroy room id:' + item.id);
      destroyRoom(item.id);
      console.log(rooms);
    }
  });
}

var rooms = [];


//rooms and maps!
function generateID(){
  var maxrand = 1000000000;
  var minrand = 1;
  return Math.floor(Math.random() * (maxrand - minrand + 1)) + minrand;;
}

function createMap(){
  width = 3;
  height = 3;
  var map = [];
  for(var i = 0;i < width; i++){
    map[i] = [];
    for(var j = 0 ;j < height; j++){
      map[i][j] = 0;
    }
  }
  return map;
}

function createRoom(socket){
  var newRoom = {
    id : generateID(),
    map : createMap(),
    player1 : socket.id,
    player2 : null,
    turn:0,
    state:'wait'
    }


  rooms.push(newRoom);
  console.log(rooms);
  io.to(socket.id).json.emit('room_created',{'key':newRoom.id});
}

function destroyRoom(roomID){
  rooms.forEach(function(item, i){
    if(item.id == roomID){
      rooms.splice(i,1);
    }
  });
}

function findRoom(roomID, socket){
  rooms.forEach(function(item){
    if(roomID == item.id && item.player2 == null){
      console.log('connected');
      item.player2 = socket.id;
      item.state = 'play';
      io.to(item.player1).json.emit('game_start',{'key':null});
      io.to(item.player2).json.emit('game_start',{'key':null});
      console.log(rooms);
      return 0;
    }else{
      console.log('ploho!');
    }
  });
}
//_______________________________________________
//game logic!

function turn(x, y, socket){
  var currentPlayer;
  rooms.forEach(function(item){
    if( ((item.player1 == socket.id && item.turn == 0) || (item.player2 == socket.id && item.turn == 1))
          && item.state == 'play' &&  item.map[x][y] == 0){

      if(item.turn == 0){
        item.map[x][y] = 1;
        item.turn = 1;
      }else{
        item.map[x][y] = 2;
        item.turn = 0;
      }

      io.to(item.player1).json.emit('updateMap',{'map':item.map});
      io.to(item.player2).json.emit('updateMap',{'map':item.map});

      //Тут провека на конец игры!
      if(tie(item.map)){
        stopGameMsg('tie', item.player1, item.player2);
      }else{
        if( winCheck(item.map, x, y) ){
          item.state = 'end';
          var winner = (item.turn == 1 ? 'player1' : 'player2');
          stopGameMsg({type:'win',who:winner}, item.player1, item.player2);
        }
      }
    }
  });
}

function stopGameMsg(msg,player1,player2){
  io.to(player1).json.emit('stop_game',{'msg':msg});
  io.to(player2).json.emit('stop_game',{'msg':msg});
}

function tie(map){
  for(var i = 0;i < map.length; i++){
    for(var j = 0 ;j < map[i].length; j++){
      if (map[i][j] == 0){
        return 0;
      }
    }
  }
  return 1;
}

function winCheck( map, x, y ){
  //check vertical

  if( map[x][y] == map[x][0] && map[x][y] == map[x][1] && map[x][y] == map[x][2]){
    return 1;
  }

  //check horizontal
  if(map[x][y] == map[0][y] && map[x][y] == map[1][y] && map[x][y] == map[2][y]){
    return 1;
  }

  //check diagonal
  if( (map[x][y] == map[0][0] && map[x][y] == map[1][1] && map[x][y] == map[2][2]) || (map[x][y] == map[2][0] && map[x][y] == map[1][1] && map[x][y] == map[0][2]) ){
    return 1;
  }
  console.log('not win!');
  return 0;
}

//_______________________________________________
io.on('connection', function(socket){

    console.log('a user connected');

    socket.on('login', function(msg){
      userLogin(msg.roomID,socket);
    });

    socket.on('click', function(msg){
      turn(msg.coords.x, msg.coords.y, socket);
      console.log(msg);
    });

    socket.on('disconnect', function(){
      console.log('a user disconnected');
      userLogout(socket);
    });
});
