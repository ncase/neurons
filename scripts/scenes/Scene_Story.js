function Scene_Intro(){

	var self = this;
	StoryScene.call(self);

	// Camera
	self.setCamera(480, 270, 1);

	// Nicky Sprite
	self.sprites.push(new CrapBackground());

	// Scene Transitions
	self.transitionOut = function(){
		self.camera.zoom = 6;
		return function(){return (self.cameraEased.zoom>4);}; // done when this is
	};

	////////////////////
	// SPRITE CLASSES //
	////////////////////

	function CrapBackground(){

		var self = this;
		Sprite.call(self,{
			pivotX:0, pivotY:0,
			spritesheet: images.crapBG,
			frameWidth:960, frameHeight:540,
			frameTotal:1
		});

	}

}

function Scene_Outro(){

	var self = this;
	StoryScene.call(self);

	// Camera
	self.setCamera(480, 270, 1);

	// Nicky Sprite
	self.sprites.push(new CrapBackground());

	// Scene Transitions
	self.transitionIn = function(){
		self.cameraEased.zoom = 6;
	};

	////////////////////
	// SPRITE CLASSES //
	////////////////////

	function CrapBackground(){

		var self = this;
		Sprite.call(self,{
			pivotX:0, pivotY:0,
			spritesheet: images.crapBG,
			frameWidth:960, frameHeight:540,
			frameTotal:1
		});

	}

}

function Scene_Blank(){
	var self = this;
	StoryScene.call(self);
}