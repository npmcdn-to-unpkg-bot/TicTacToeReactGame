function Game(){

  var canvas = document.getElementById('tutorial')
  var ctx = canvas.getContext('2d');

  //Game objects creation
  var render = new Render();
  var field = new Field(3,3);
  var mouse = new Mouse(canvas);

  //Start of game cycle
  gameStart = function(){
    var gameCycle = setInterval(function(){
      //Drawing
      render.drawField(ctx,field.getMap(),mouse.getMouseCoords())
      //console.log('frame');
    }, 16);
  }

  this.init = function(){
    gameStart();
  }

  socket.on('updateMap',function(msg){
    field.updateMap(msg.map);
  });


}
