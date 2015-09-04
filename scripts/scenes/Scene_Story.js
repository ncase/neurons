function Scene_Intro(){

	var self = this;
	StoryScene.call(self);

	// Camera
	self.setCamera(480, 270, 1);

	// Nicky Sprite
	self.sprites.push(new CrapBackground());
	
	// Update: after a while, swipe to a Crap Scene
	var timer = 60;
	var _prevUpdate = self.update;
	self.update = function(){

		// Swipe on over?
		if(timer--<0){
			self.camera.zoom = 6;
			if(self.cameraEased.zoom>4){
				Interactive.goto(Scene_Neurons);
				var cam = Interactive.scene.cameraEased;
				return;
			}
		}

		// Previous Update
		_prevUpdate.call(self);

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