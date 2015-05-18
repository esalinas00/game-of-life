function Painter(){
	var canvas = document.getElementById('game'); 
	this.gameLength = 20;
	this.ctx;
	this.blockSize = 20;
	this.separation = 1;
	this.colorMappings = ['#fff','#2196f3','#bdbdbd'];
	
	if(canvas.getContext){
  	this.ctx = canvas.getContext('2d');

  	this.ctx.beginPath();
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0,0,canvas.width,canvas.height);

  	for (var i=0;i<this.gameLength;i++){
    	for (var j=0;j<this.gameLength;j++){
        this.ctx.beginPath();
        this.ctx.fillStyle = "#fff";
        this.ctx.fillRect((this.blockSize+this.separation)*i,(this.blockSize+this.separation)*j,this.blockSize,this.blockSize);
    	}
  	}
  }
}

Painter.prototype.redrawCell = function(y,x,state) {	
	//console.log(arguments);
	this.ctx.beginPath();
	this.ctx.fillStyle = this.colorMappings[state];
	
	if(state === 2){
		console.log("arguments: ",arguments);
		/**console.log("something gotta die!!");
		//this.ctx.fillRect(0,0,400,400);
		console.log("fillStyle ", this.ctx.fillStyle);
		console.log("blockSize ", this.blockSize);
		console.log("separation ", this.separation);
		**/
	}


	this.ctx.fillRect((this.blockSize+this.separation)*x,(this.blockSize+this.separation)*y,this.blockSize,this.blockSize);
	
	

	}

module.exports = Painter;
