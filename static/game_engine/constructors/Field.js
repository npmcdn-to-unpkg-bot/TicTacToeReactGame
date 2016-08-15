//map constructor
function Field(width,height){

  var map = [];

  function mapInit(){

    for(var i = 0;i < width; i++){
      map[i] = [];
      for(var j = 0 ;j < height; j++){
        map[i][j] = 0;
      }
    }
    console.log(map);
    return map;
  }

  this.updateMap = function(newMap){
    map = newMap;
  }
  this.setCell = function( type, x, y ){
    map[x][y] = type;
  };
  this.map = mapInit();
  this.getMap = function(){
    return map;
  }

}
