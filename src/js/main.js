var Painter = require('./painter');
var Universe = require('./universe');
var Handler = require('./handler');

var MyPainter = new Painter();
var MyUniverse = new Universe();
var MyHandler = new Handler(function(data){
	console.log(data);
	MyUniverse.toggleCell.call(MyUniverse,data.i,data.j)
	MyUniverse.logU.call(MyUniverse);
});
console.log("mufasa");

/**
var canvas = document.getElementById('game');
canvas.addEventListener('click',function (e) {
	var i = Math.floor(e.offsetY/(20+1));
	var j = Math.floor(e.offsetX/(20+1));
	console.log("y,x");
	console.log(i,j);
	MyUniverse.toggleCell(i,j);
	MyUniverse.logU();
},false);
**/