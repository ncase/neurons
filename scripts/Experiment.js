window.neurons = [];
window.connections = [];
window.sprites = [];
window.words = [];
window.wires = [];

window.canvas = document.getElementById("canvas");
window.ctx = canvas.getContext("2d");

// Update
function update(){

	publish("/update");
	canvas.style.cursor = "default";

	// Neurons, Connections, and Sprites stay constant.
	for(var i=0;i<neurons.length;i++) neurons[i].update();
	for(var i=0;i<connections.length;i++) connections[i].update();
	for(var i=0;i<sprites.length;i++) sprites[i].update();

	// Words & Wires can disappear
	for(var i=0;i<words.length;i++){
		var w = words[i];
		w.update();
		if(w.dead){
			words.splice(i,1);
			i--;
		}
	}
	for(var i=0;i<wires.length;i++){
		var w = wires[i];
		w.update();
		if(w.dead){
			wires.splice(i,1);
			i--;
		}
	}

}

// Render
function render(){
	
	publish("/render");

	ctx.clearRect(0,0,canvas.width,canvas.height);
	
	for(var i=0;i<wires.length;i++) wires[i].draw(ctx);
	for(var i=0;i<connections.length;i++) connections[i].draw(ctx);
	for(var i=0;i<neurons.length;i++) neurons[i].draw(ctx);
	for(var i=0;i<sprites.length;i++) sprites[i].draw(ctx);
	for(var i=0;i<words.length;i++) words[i].draw(ctx);

}

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
window.redrawCanvas = true;
(function animloop(){
	requestAnimationFrame(animloop);
	if(window.redrawCanvas){
		stats.begin();
		render();
		stats.end();
		window.redrawCanvas = false;
	}
})();
setInterval(function(){
	update();
	window.redrawCanvas = true;
},1000/30);