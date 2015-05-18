(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Painter = require('./painter');
var Universe = require('./universe');
var Handler = require('./handler');

var MyPainter = new Painter();
var MyUniverse = new Universe();
var MyHandler = new Handler(function(data){
	MyUniverse.toggleCell.call(MyUniverse,data.i,data.j)
	//MyUniverse.logU.call(MyUniverse);
	MyPainter.redrawCell.call(MyPainter,data.i,data.j,MyUniverse.leUniverse[data.i][data.j]);
});
console.log("mufasa");
},{"./handler":2,"./painter":3,"./universe":4}],2:[function(require,module,exports){
function Handler (cb) {

	var canvas = document.getElementById('game');
	canvas.addEventListener('click',function (e) {
		var i = Math.floor(e.offsetY/(20+1));
		var j = Math.floor(e.offsetX/(20+1));
		cb({i:i,j:j});
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
	0 : none,
	1 : alive,
	2 : dead,
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

module.exports = Universe;
},{}]},{},[1])


//# sourceMappingURL=bundle.js.map