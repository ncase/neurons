window.canvas = document.getElementById("canvas");
window.ctx = canvas.getContext("2d");

window.Experiment = {};

// Update
Experiment.update = function(){

	publish("/update");
	canvas.style.cursor = "default";

	// Neurons, Connections, and Sprites
	for(var i=0;i<neurons.length;i++) neurons[i].update();
	for(var i=0;i<connections.length;i++) connections[i].update();
	for(var i=0;i<sprites.length;i++) sprites[i].update();

};

// Render
Experiment.render = function(){
	
	publish("/render");
	ctx.clearRect(0,0,canvas.width,canvas.height);
	
	// Neurons, Connections, and Sprites
	for(var i=0;i<connections.length;i++) connections[i].draw(ctx);
	for(var i=0;i<neurons.length;i++) neurons[i].draw(ctx);
	for(var i=0;i<sprites.length;i++) sprites[i].draw(ctx);

};

// Reset
Experiment.reset = function(){
	window.neurons = [];
	window.connections = [];
	window.sprites = [];
};

// Request Animation Frame shim
window.requestAnimationFrame = (function(){
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function(callback){ window.setTimeout(callback, 1000/60); };
})();

// Stats
var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms
stats.domElement.id="DEBUG_STATS";
stats.domElement.style.position = 'absolute';
stats.domElement.style.right = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);

// Actually start rendering & update loop
Experiment.reset();
Experiment.redraw = true;
(function animloop(){
	requestAnimationFrame(animloop);
	if(Experiment.redraw){
		stats.begin();
		Experiment.render();
		stats.end();
		Experiment.redraw = false;
	}
})();
setInterval(function(){
	Experiment.update();
	Experiment.redraw = true;
},1000/30);