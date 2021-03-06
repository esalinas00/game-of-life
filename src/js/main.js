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
	MyPainter.redrawCell.call(MyPainter,data.y,data.x,data.state);
	//MyUniverse.logU.call(MyUniverse);
},false);
console.log("mufasa");