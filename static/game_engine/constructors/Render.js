function Render(){

  function drawX(ctx, x, y) {

    x = x * 100 + 50;
    y = y * 100 + 50;
    ctx.beginPath();

    ctx.moveTo(x - 20, y - 20);
    ctx.lineTo(x + 20, y + 20);
    ctx.stroke();

    ctx.moveTo(x + 20, y - 20);
    ctx.lineTo(x - 20, y + 20);
    ctx.stroke();
  }

  function drawCircle(ctx, x, y){
    ctx.beginPath();
    ctx.arc(x * 100 +50, y * 100 + 50, 25, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#AAAAAA';
    ctx.stroke();
  }

  //drawing map and objects
  this.drawField = function(ctx,map,mCoord){
    var objWidth = 99;
    var objHeight = 99;

    map.forEach(function(item,i,arr){
      item.forEach(function(item2,j,arr2){

        //console.log(Math.ceil(mCoord.x / 100) + 'i');
        if(Math.ceil(mCoord.x / 100) == i+1 && Math.ceil(mCoord.y / 100) == j+1){
          ctx.fillStyle="#FF0000";
        }else{
          ctx.fillStyle="#FFF000";
        }
        ctx.fillRect(i * (objWidth + 1), j * (objHeight + 1), objWidth, objHeight);


        if( item2 == 1 ){
          drawX(ctx, i, j);
        }else if( item2 == 2 ){
          drawCircle(ctx, i, j);
        }

      });
    });
  }

}
