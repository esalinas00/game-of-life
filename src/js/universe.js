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