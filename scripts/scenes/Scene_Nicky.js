function Scene_Nicky(){

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