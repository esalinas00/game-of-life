(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Painter = require('./painter');
var Universe = require('./universe');
var Handler = require('./handler');

var MyPainter = new Painter();
var MyUniverse = new Universe();
var MyHandler = new Handler(function(data){
	MyUniverse.toggleCell.call(MyUniverse,data.i,data.j);
	MyPainter.redrawCell.call(MyPainter,data.i,data.j,MyUniverse.leUniverse[data.i][data.j]);
},function(){
	MyUniverse.oneTurn.call(MyUniverse);
});
document.addEventListener('cellChange',function(e){
	var data = e.detail;
	MyPainter.redrawCell.call(MyPainter,data.y,data.x,data.state);
},false);
console.log("mufasa");
},{"./handler":2,"./painter":3,"./universe":4}],2:[function(require,module,exports){
function Handler (cb,next) {
	var self = this;
	this.intId;
	var paused = true;
	var canvas = document.getElementById('game');
	var startBtn = document.getElementById('start-btn');
	var pauseBtn = document.getElementById('pause-btn');
	canvas.addEventListener('click',function (e) {
		var i = Math.floor(e.offsetY/(20+1));
		var j = Math.floor(e.offsetX/(20+1));
		cb({i:i,j:j});
	},false);

	
	startBtn.addEventListener('click',function(){
		if(paused){
    		console.log("GAME RESUMED");
    		self.intId = setInterval(next,350);
    		paused = false;
	    }
	},false);

	pauseBtn.addEventListener('click',function(){
		console.log("PAUSE");
		clearInterval(self.intId);
		paused = true;
	},false);
}

module.exports = Handler;
},{}],3:[function(require,module,exports){
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
	this.ctx.fillRect((this.blockSize+this.separation)*x,(this.blockSize+this.separation)*y,this.blockSize,this.blockSize);

	}

module.exports = Painter;

},{}],4:[function(require,module,exports){
function Universe(){
	this.width = 20;
	this.leUniverse = [];
	/** Cell states
	0 : dead,
	1 : alive
	**/
	function init() {
		var i = 0, j = 0;
		for(; i < this.width; i+=1 ){
			this.leUniverse.push([]);
			for(j = 0; j < this.width; j+=1 ){
				this.leUniverse[i][j] = 0;
			}
		}
	}	
	init.call(this);
}

Universe.prototype.logU = function() {
	var i = 0, j, toLog = "";
		for(; i < this.width; i+=1 ){
			for(j = 0; j < this.width; j+=1 ){
				toLog += this.leUniverse[i][j] +" ";
			}
		toLog += "\n";
		}
	console.log(toLog);
};


Universe.prototype.toggleCell = function(y,x) {
	var cell = this.leUniverse[y][x];
	if( cell === 1){
		this.leUniverse[y][x] = 0;
	} else {
		this.leUniverse[y][x] = 1;
	}
};

Universe.prototype.oneTurn = function(){
	var i = 0, j;
	var event, newState;
	var board = this.leUniverse;
	var neighbors;
	var cellsToChange = [];
	for(; i < this.width; i+=1 ){
		for(j = 0; j < this.width; j+=1 ){
			neighbors = 0;
			//validations for death
			var i2 = i-1, limitI = i+1;
			var j2,limitJ;
			//needs to be alive to die :v
			for(;i2<=limitI;i2+=1){
				j2 = j-1, limitJ = j + 1;
				for(;j2<=limitJ;j2+=1){
					try {
						if(board[i2][j2] === 1){
							neighbors +=1;
						}
					} catch (e) {
						//Type error exception thow when accesing an unexisting array property
						//example: board[-1][-1]
					}
				}
			}

			if(board[i][j] === 1){	
				//substract himself
				neighbors-=1;
				//if there're less than 2 neighbors, cell dies cause underpopulation
				//if there're more than 3 neighbors, cell dies cause overpopulation
				if(neighbors < 2 || neighbors > 3){
					cellsToChange.push({i:i,j:j,newState:0});
				}
			}else{
				if(neighbors === 3){
					cellsToChange.push({i:i,j:j,newState:1});
				}
			}
		}
	}
	
	cellsToChange.forEach(function(cell,index,array){
		this.toggleCell(cell.i,cell.j);
		event = new CustomEvent('cellChange', { 'detail': {y:cell.i,x:cell.j,state:cell.newState} });
		document.dispatchEvent(event);
	},this);
};

module.exports = Universe;
},{}]},{},[1])


//# sourceMappingURL=bundle.js.map