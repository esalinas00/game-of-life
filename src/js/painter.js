function Painter(){
  var canvas = document.getElementById('game'); 
  var gameLength = 20;
  var ctx;
  var blockSize = 20;
  var separation = 1;

   if(canvas.getContext){
  	ctx = canvas.getContext('2d');

  	ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,canvas.width,canvas.height);

  	for (var i=0;i<gameLength;i++){
    	for (var j=0;j<gameLength;j++){
        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.fillRect((blockSize+separation)*i,(blockSize+separation)*j,blockSize,blockSize);
    	}
  	}
  }
}

module.exports = Painter;
