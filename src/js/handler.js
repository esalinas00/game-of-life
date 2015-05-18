function Handler (cb,next) {
	var self = this;
	this.intId;
	var paused = true;
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

	        	//next
	        	console.log(self.intId," self.intId");
	        	if(paused){
	        		console.log("GAME RESUMED");
	        		self.intId = setInterval(next,350);
	        		paused = false;
	        	}
	        	break;
			case 37:
			case 65:
				//console.log("Left action");
				//code here
				console.log("PAUSE");
				clearInterval(self.intId);
				paused = true;
				break;
	        default:
	        	break;
		}
	},false);
}

module.exports = Handler;