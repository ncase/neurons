window.canvas = document.getElementById("canvas");
window.ctx = canvas.getContext("2d");

window.Experiment = {};

// Reset
Experiment.reset = function(){
	window.neurons = [];
	window.connections = [];
	window.sprites = [];
	window.flashes = [];
};

// Update
Experiment.update = function(){

	publish("/update");
	canvas.style.cursor = "default";

	// Update all the things
	_update(neurons);
	_update(connections);
	_update(sprites);
	_update(flashes);

	// Update Narrator
	Narrator.update();

};
var _update = function(array){
	for(var i=0;i<array.length;i++){
		var a = array[i];
		a.update();
		if(a.dead){
			array.splice(i,1);
			i--;
		}
	}
};

// Render
Experiment.render = function(){
	
	publish("/render");
	ctx.clearRect(0,0,canvas.width,canvas.height);
	
	// Render all the things
	_render(connections);
	_render(neurons);
	_render(flashes);

	ctx.drawImage(images.shade,0,0);
	_render(sprites);

};
var _render = function(array){
	for(var i=0;i<array.length;i++) array[i].draw(ctx);
};

// Request Animation Frame shim
window.requestAnimationFrame = (function(){
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function(callback){ window.setTimeout(callback, 1000/60); };
})();

// Stats
/*var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms
stats.domElement.id="DEBUG_STATS";
stats.domElement.style.position = 'absolute';
stats.domElement.style.right = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);*/

// Actually start rendering & update loop
Experiment.reset();
Experiment.redraw = false;
(function animloop(){
	requestAnimationFrame(animloop);
	if(Experiment.redraw){
		//stats.begin();
		Experiment.render();
		//stats.end();
		Experiment.redraw = false;
	}
})();
setInterval(function(){
	Experiment.update();
	Experiment.redraw = true;
},1000/30);