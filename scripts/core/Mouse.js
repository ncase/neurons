(function(exports){

	// Singleton
	var Mouse = {
		x: 0, y: 0,
		realX: 0, realY: 0,
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

	canvas.addEventListener("click",function(event){
	    Mouse.pressed = true;
	    onMouseMove(event);
	    publish("/mouse/click"); // ALSO a click, why not.
	    publish("/mouse/down");
	},false);

	canvas.addEventListener("mouseup",function(event){
	    Mouse.pressed = false;
	    publish("/mouse/up");
	},false);

	canvas.addEventListener("mousemove",onMouseMove = function(e){

		// Real X & Y
		if(e.offsetX){
			Mouse.realX = e.offsetX;
			Mouse.realY = e.offsetY;
		}else if(e.layerX) {
			Mouse.realX = e.layerX;
			Mouse.realY = e.layerY;
		}

		// Adjusted for the camera
		if(window.Interactive && Interactive.scene && Interactive.scene.cameraEased){
			var cam = Interactive.scene.cameraEased;
			Mouse.x = (Mouse.realX - canvas.width/2)/cam.zoom + cam.x;
			Mouse.y = (Mouse.realY - canvas.height/2)/cam.zoom + cam.y;
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