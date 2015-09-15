(function(){

	window.canvas = document.getElementById("canvas");
	window.ctx = canvas.getContext("2d");

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
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.right = '0px';
	stats.domElement.style.top = '0px';
	document.body.appendChild(stats.domElement);*/

	// Actually start rendering & update loop
	var _redraw = false;
	(function animloop(){
		if(_redraw){
			//stats.begin();
			publish("/render");
			//stats.end();
			_redraw = false;
		}
		requestAnimationFrame(animloop);
	})();
	setInterval(function(){
		publish("/update");
		_redraw = true;
	},1000/30);

})();