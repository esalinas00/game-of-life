function Handler (cb,next) {

	var canvas = document.getElementById('game');
	canvas.addEventListener('click',function (e) {
		var i = Math.floor(e.offsetY/(20+1));
		var j = Math.floor(e.offsetX/(20+1));
		cb({i:i,j:j});
	},false);

	document.addEventListener('keydown',function(e){
		switch(e.which){
			case 39:
      		case 68:
		        //console.log("Right action");
		       	//code here
	        	console.log("NEXT TURN");
	        	next();
	        	break;
	        default:
	        	break;
		}
	},false);
}

module.exports = Handler;