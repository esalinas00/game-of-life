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