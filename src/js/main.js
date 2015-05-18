var Painter = require('./painter');
var Universe = require('./universe');
var Handler = require('./handler');

var MyPainter = new Painter();
var MyUniverse = new Universe();
var MyHandler = new Handler(function(data){
	MyUniverse.toggleCell.call(MyUniverse,data.i,data.j)
	//MyUniverse.logU.call(MyUniverse);
	MyPainter.redrawCell.call(MyPainter,data.i,data.j,MyUniverse.leUniverse[data.i][data.j]);
},function(){
	MyUniverse.oneTurn.call(MyUniverse);
});
document.addEventListener('cellDeath',function(e){
	var data = e.detail;
	console.log(data);
	MyPainter.redrawCell.call(MyPainter,data.y,data.x,2);
},false);
console.log("mufasa");