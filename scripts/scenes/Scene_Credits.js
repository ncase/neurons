function Scene_Credits(){

	var self = this;
	BrainScene.call(self);

	// Camera
	self.setCamera(680, 355, 0.8);
	
	// HEART SHAPED NEURONS
	Neuron.unserialize(self,'{"neurons":[[-92,-72],[-24,75],[-57,199],[-77,304],[-76,405],[-65,538],[-81,696],[45,-72],[56,84],[27,205],[35,321],[91,433],[32,521],[89,659],[208,-35],[153,57],[186,214],[202,289],[174,384],[149,558],[193,675],[266,-90],[273,85],[276,158],[300,324],[288,424],[330,573],[284,687],[452,-28],[431,87],[412,206],[452,287],[387,387],[395,539],[401,628],[518,-80],[570,65],[542,146],[558,318],[522,407],[513,527],[505,637],[661,-83],[656,54],[678,213],[654,294],[660,430],[676,541],[648,669],[780,-81],[752,64],[808,201],[799,330],[746,420],[808,522],[779,657],[892,-81],[889,682],[-291,-76],[-308,94],[-303,201],[-292,325],[-254,387],[-284,565],[-282,635]],"connections":[[33,25],[25,33],[25,17],[17,25],[17,23],[23,17],[23,30],[30,23],[30,31],[31,30],[31,37],[37,31],[37,44],[44,37],[44,45],[45,44],[45,39],[39,45],[39,33],[33,39]]}');

	// THX
	self.thx = new Sprite({
		pivotX:0.5, pivotY:0.5,
		spritesheet: images.thx,
		frameWidth:300, frameHeight:400,
		frameTotal:6
	});
	self.sprites.push(self.thx);
	self.thx.timer = 0;
	self.thx.visible = false;
	self.thx.x = 1050;
	self.thx.y = 320;
	self.thx.scale = (1/self.cameraEased.zoom);

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

		// THANKS
		self.thx.timer++;
		//self.thx.visible = (self.thx.timer<40);
		if(self.thx.timer>=70){
			self.thx.timer = 0;
			if(!self.thx.visible){
				self.thx.visible = true;
			}else{
				if(self.thx.currentFrame<self.thx.frameTotal-1){
					self.thx.currentFrame++;
				}else{
					self.thx.gotoSmoosh = 0;
				}
			}
		}

		// Previous Update
		_prevUpdate.call(self);

		// DED
		if(self.thx.smoosh<0.09){
			self.thx.dead = true;
		}

	};

	// Scene Messages
	var _listener1 = subscribe("/scene/nicky",function(){
		unsubscribe(_listener1);
		self.addCredits(0).url = "https://www.patreon.com/ncase";
	});
	var _listener2 = subscribe("/scene/phyrnna",function(){
		unsubscribe(_listener2);
		self.addCredits(1).url = "https://phyrnna.bandcamp.com/";
	});
	var _listener3 = subscribe("/scene/potp",function(){
		unsubscribe(_listener3);
		self.addCredits(2).url = "http://ncase.me/polygons";
	});

	/////////////
	// CREDITS //
	/////////////

	self.addCredits = function(index){
		var credit = new Credits();
		credit.initCurrentFrame = index*2;
		credit.currentFrame = index*2;
		credit.y = 150+index*150;
		credit.initY = credit.y;
		credit.scale = (1/self.cameraEased.zoom);
		self.sprites.push(credit);
		return credit;
	};

	function Credits(){

		var self = this;
		Sprite.call(self,{
			pivotX:0.5, pivotY:0.5,
			spritesheet: images.credits,
			frameWidth:300, frameHeight:100,
			frameTotal:3
		});

		self.x = 1650-120;
		self.gotoX = 1180-120;

		self.clickRectangle = {x:-200,y:-50,width:400,height:100};
		self.onClick = function(){
			
			// STAHP
			Narrator.pause();
			Interactive.pause();
			publish("/pause");

			// New window!
			var win = window.open(self.url, '_blank');
			win.focus();

		};
		self.onHover = function(){
			// sound?
		};

		// UPDATE
		var _prevUpdate = self.update;
		self.update = function(){

			var isMouseOver = self.isMouseOver();
			
			var offsetX = isMouseOver ? -10 : 0;
			self.x = self.x*0.7 + (self.gotoX+offsetX)*0.3;

			self.currentFrame = self.initCurrentFrame + (isMouseOver ? 1 : 0);

			_prevUpdate.call(self);

		};

	}

}
