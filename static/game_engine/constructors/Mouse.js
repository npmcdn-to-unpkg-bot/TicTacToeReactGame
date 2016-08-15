function Mouse(canvas){

  var mCoord = {x:null,y:null};

  getMouseCoords = function(e){
     mCoord.x = e.pageX - canvas.offsetLeft;
     mCoord.y = e.pageY - canvas.offsetTop;
  }
  mouseClick = function(){
    socket.json.emit('click',{coords : {x : Math.ceil( mCoord.x / 100 ) - 1,  y : Math.ceil(mCoord.y / 100 ) - 1 } } );
  }

  canvas.onmousemove = function(e){
    getMouseCoords(e);

  }

  canvas.onclick = function(e){
    mouseClick();
  }

  this.getMouseCoords = function(){
    return mCoord;
  }

}
