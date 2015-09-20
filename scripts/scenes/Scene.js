function StoryScene(){

	var self = this;
	Scene.call(self);
	
	// Properties
	self.sprites = [];

	// Update
	var _prevUpdate = self.update;
	self.update = function(){

		// Camera
		_prevUpdate.call(self);

		// My Things
		for(var i=0;i<self.sprites.length;i++) self.sprites[i].update();

	};

	// Render
	var _prevRender = self.render;
	self.render = function(ctx){

		// Save
		ctx.save();
		_prevRender.call(self,ctx); // Camera

		// My Things
		for(var i=0;i<self.sprites.length;i++) self.sprites[i].draw(ctx);

		// Restore
		ctx.restore();

	};

}

function BrainScene(){

	var self = this;
	Scene.call(self);
	
	// Properties
	self.neurons = [];
	self.connections = [];
	self.flashes = [];
	self.sprites = [];

	// ADDING A SHADE
	self.shade = new Sprite({
		pivotX:0.5, pivotY:0.5,
		spritesheet: images.shade,
		frameWidth:960, frameHeight:540,
		frameTotal:1
	});
	//var _prevUpdate = self.shade.update;
	self.shade.update = function(){
		self.shade.x = self.cameraEased.x;
		self.shade.y = self.cameraEased.y;
		self.shade.scale = 1/self.cameraEased.zoom;
	};
	self.sprites.push(self.shade);

	// Update
	var _prevUpdate = self.update;
	self.update = function(){

		// Camera
		_prevUpdate.call(self);

		// My Things
		_update(self.neurons);
		_update(self.connections);
		_update(self.sprites);
		_update(self.flashes);

	};
	var _update = function(array){
		for(var i=0;i<array.length;i++){
			var a = array[i];
			a.update();
			if(a.dead){
				if(a.kill) a.kill();
				array.splice(i,1);
				i--;
			}
		}
	};

	// Render
	var _prevRender = self.render;
	self.render = function(ctx){

		// Save
		ctx.save();
		_prevRender.call(self,ctx); // Camera

		// My Things
		_render(self.connections,ctx);
		_render(self.neurons,ctx);
		_render(self.flashes,ctx);
		_render(self.sprites,ctx);

		// Restore
		ctx.restore();

	};
	var _render = function(array,ctx){
		for(var i=0;i<array.length;i++) array[i].draw(ctx);
	};

	// KILL: Neurons & sprites
	self.kill = function(){
		for(var i=0;i<self.neurons.length;i++) self.neurons[i].kill();
		for(var i=0;i<self.sprites.length;i++) self.sprites[i].kill();
	};

}

function Scene(){

	var self = this;
	
	// Properties
	self.camera = { x:0, y:0, zoom:1 };
	self.cameraVelocity = { x:0, y:0, zoom:0 };
	self.cameraEased = {
		x: self.camera.x,
		y: self.camera.y,
		zoom: self.camera.zoom
	};

	// Set Camera
	self.setCamera = function(x,y,zoom){
		self.camera.x = self.cameraEased.x = x;
		self.camera.y = self.cameraEased.y = y;
		self.camera.zoom = self.cameraEased.zoom = zoom;
	};

	// Update
	self.update = function(){
		self._updateProperty("x");
		self._updateProperty("y");
		self._updateProperty("zoom");
	};
	self.CAM_SPRING = 0.2;
	self.CAM_DAMPENING = 0.64;
	self._updateProperty = function(name){
		var cam = self.camera;
		var vel = self.cameraVelocity;
		var eased = self.cameraEased;
		eased[name] += vel[name];
		vel[name] += (cam[name]-eased[name]) * self.CAM_SPRING; // spring
		vel[name] *= self.CAM_DAMPENING; // dampening
	};

	// "Render" - just transforms matrix. Please ctx.save() before this.
	self.render = function(ctx){

		// Center camera
		ctx.translate(canvas.width/2, canvas.height/2);

		// Scale & Zoom
		ctx.scale(self.cameraEased.zoom, self.cameraEased.zoom);
		ctx.translate(-self.cameraEased.x, -self.cameraEased.y);

	};

}