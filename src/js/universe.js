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

Universe.prototype.oneTurn = function(){
	var i = 0, j;
	var board = this.leUniverse;
	//console.log(board[-1][-1]);
	var neighbors;
	for(; i < this.width; i+=1 ){
		for(j = 0; j < this.width; j+=1 ){
			neighbors = 0;
			//validations for death
			var i2 = i-1, limitI = i+1;
			var j2,limitJ;
			//needs to be alive to die :v
			if(board[i][j] === 1){
			console.log(i,j, " is ALIVE");				
				for(;i2<=limitI;i2+=1){
					//console.log(i2," i2");
					j2 = j-1, limitJ = j + 1;
					for(;j2<=limitJ;j2+=1){
						//console.log(j2," j2");
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
				//substract himself
				neighbors-=1;
				console.log(i,j," Has ",neighbors," neighbors");
			}
		}
	}
};

module.exports = Universe;