function Handler (cb) {

	var canvas = document.getElementById('game');
	canvas.addEventListener('click',function (e) {
		var i = Math.floor(e.offsetY/(20+1));
		var j = Math.floor(e.offsetX/(20+1));
		console.log("y,x");
		console.log(i,j);
		//MyUniverse.toggleCell(i,j);
		//MyUniverse.logU();
		cb({i:i,j:j});
	},false);

console.log("Handler constructor");
}

module.exports = Handler;