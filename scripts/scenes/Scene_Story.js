function Scene_Intro(){

	var self = this;
	StoryScene.call(self);

	// Camera
	self.setCamera(480, 270-60, 1);

	// Nicky Sprite
	self.sprites.push(new Background());

	// Scene Transitions
	self.transitionOut = function(){
		self.camera.zoom = 6;
		return function(){return (self.cameraEased.zoom>4);}; // done when this is
	};

	// Update
	var _prevUpdate = self.update;
	self.update = function(){
		self.camera.y += 0.25;
		_prevUpdate.call(self);
	};

	////////////////////
	// SPRITE CLASSES //
	////////////////////

	function Background(){

		var self = this;
		Sprite.call(self,{
			pivotX:0.5, pivotY:0.5,
			spritesheet: images.introBG,
			frameWidth:1920, frameHeight:1200,
			frameTotal:1
		});

		self.x = 480;
		self.y = 240;
		self.scale = 0.5;

	}

}

function Scene_Outro(){

	var self = this;
	StoryScene.call(self);

	// Camera
	self.setCamera(480, 270, 1);

	// Nicky Sprite
	self.sprites.push(new Background());

	// Scene Transitions
	self.transitionIn = function(){
		self.cameraEased.zoom = 6;
	};

	// Update
	var _prevUpdate = self.update;
	self.update = function(){
		self.camera.y -= 0.18;
		_prevUpdate.call(self);
	};
	self._updateProperty = function(name){
		var cam = self.camera;
		var eased = self.cameraEased;
		eased[name] = eased[name]*0.5 + cam[name]*0.5;
	};

	////////////////////
	// SPRITE CLASSES //
	////////////////////

	function Background(){

		var self = this;
		Sprite.call(self,{
			pivotX:0.5, pivotY:0.5,
			spritesheet: images.outroBG,
			frameWidth:1920, frameHeight:1200,
			frameTotal:1
		});

		self.x = 480;
		self.y = 240;
		self.scale = 0.5;

	}

}

function Scene_Blank(){
	var self = this;
	StoryScene.call(self);
}