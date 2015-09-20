function Scene_Credits(){

	var self = this;
	BrainScene.call(self);

	// Camera
	self.setCamera(745, 355, 0.7);
	
	// HEART SHAPED NEURONS
	Neuron.unserialize(self,'{"neurons":[[-92,-72],[-24,75],[-57,199],[-77,304],[-76,405],[-65,538],[-81,696],[45,-72],[56,84],[27,205],[35,321],[91,433],[32,521],[89,659],[208,-35],[153,57],[186,214],[202,289],[174,384],[149,558],[193,675],[266,-90],[273,85],[276,158],[300,324],[288,424],[330,573],[284,687],[452,-28],[431,87],[412,206],[452,287],[387,387],[395,539],[401,628],[518,-80],[570,65],[542,146],[558,318],[522,407],[513,527],[505,637],[661,-83],[656,54],[678,213],[654,294],[660,430],[676,541],[648,669],[780,-81],[752,64],[808,201],[799,330],[746,420],[808,522],[779,657],[892,-81],[881,75],[874,171],[907,319],[883,455],[920,514],[889,682],[-291,-76],[-308,94],[-303,201],[-292,325],[-254,387],[-284,565],[-282,635]],"connections":[[33,25],[25,33],[25,17],[17,25],[17,23],[23,17],[23,30],[30,23],[30,31],[31,30],[31,37],[37,31],[37,44],[44,37],[44,45],[45,44],[45,39],[39,45],[39,33],[33,39]]}');

	// Credits
	//self.credits = new Credits();
	self.credits = new CreditsCrap();
	self.sprites.push(self.credits);

	// UNDO THE CAMERA TRANSFORM...	
	self.credits.x = 1430; // totally arbitrary guess
	self.credits.y = 1000; // totally arbitrary guess
	self.credits.x = 1400; // totally arbitrary guess
	self.credits.y = -40; // totally arbitrary guess
	self.credits.scale = 1/self.camera.zoom;

	// Update: after a while, swipe to a Crap Scene
	var heartNeurons = [33, 25, 17, 23, 30, 31, 37, 44, 45, 39];
	var timer = -15;
	var _prevUpdate = self.update;
	self.update = function(){

		// Make neurons pulse
		timer++;
		if(timer>=0 && timer%3==0){
			var index = timer/3;
			if(index<heartNeurons.length){
				self.neurons[heartNeurons[index]].pulse({strength:5});
			}
		}

		// Credits scroll up
		//self.credits.y -= 6;

		// Previous Update
		_prevUpdate.call(self);

	};

	/////////////
	// CREDITS //
	/////////////

	function CreditsCrap(){

		var self = this;
		Sprite.call(self,{
			pivotX:1, pivotY:0,
			spritesheet: images.credits_crap,
			frameWidth:300, frameHeight:540,
			frameTotal:1
		});

	}

	function Credits(){

		var self = this;
		Sprite.call(self,{
			pivotX:1, pivotY:0,
			spritesheet: images.credits,
			frameWidth:320, frameHeight:1000,
			frameTotal:1
		});

	}

}
