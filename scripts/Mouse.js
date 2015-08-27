(function(exports){

	// Singleton
	var Mouse = {
		x: 0,
		y: 0,
		pressed: false
	};
	exports.Mouse = Mouse;
	
	// Event Handling
	var canvas = window.clickme || document.getElementById("canvas");
	var onMouseMove,onTouchMove;
	
	canvas.addEventListener("mousedown",function(event){
	    Mouse.pressed = true;
	    onMouseMove(event);
	    publish("/mouse/down");
	},false);

	canvas.addEventListener("mouseup",function(event){
	    Mouse.pressed = false;
	    publish("/mouse/up");
	},false);

	canvas.addEventListener("mousemove",onMouseMove = function(e){

		if(e.offsetX) {
			Mouse.x = e.offsetX;
			Mouse.y = e.offsetY;
		}else if(e.layerX) {
			Mouse.x = e.layerX;
			Mouse.y = e.layerY;
		}

		publish("/mouse/move");

	},false);

	/*
	canvas.addEventListener("touchstart",function(event){
	    Mouse.pressed = true;
	    onTouchMove(event);
	    publish("/mouse/down");
	},false);

	canvas.addEventListener("touchend",function(event){
	    Mouse.pressed = false;
	    publish("/mouse/up");
	},false);

	canvas.addEventListener("touchmove",onTouchMove = function(event){
		Mouse.x = event.changedTouches[0].clientX;
		Mouse.y = event.changedTouches[0].clientY;
		publish("/mouse/move");
	},false);
	*/

})(window);