var NEURONS_SERIALIZED = '{"neurons":[[-92,-72],[-24,75],[-57,199],[-77,304],[-76,405],[-65,538],[-81,696],[45,-72],[56,84],[27,205],[35,321],[91,433],[32,521],[89,659],[208,-35],[153,57],[186,214],[152,269],[174,384],[149,558],[193,675],[266,-90],[273,85],[276,158],[300,324],[288,424],[330,573],[284,687],[452,-28],[431,87],[412,206],[452,287],[387,387],[395,539],[401,628],[518,-80],[570,65],[542,146],[558,318],[522,447],[513,527],[505,637],[661,-83],[656,54],[678,213],[654,294],[660,430],[676,541],[648,669],[780,-81],[752,64],[808,201],[799,330],[746,420],[808,522],[779,657],[892,-81],[881,75],[874,171],[907,319],[883,455],[920,514],[889,682],[1009,-76],[992,94],[997,201],[1008,325],[1046,387],[1016,565],[1018,635]],"connections":[[0,1],[1,0],[2,3],[8,2],[2,9],[10,2],[4,3],[10,4],[4,11],[11,4],[5,6],[12,5],[7,1],[8,7],[7,14],[15,7],[13,6],[12,13],[13,20],[16,9],[15,16],[16,18],[22,16],[16,22],[16,23],[24,16],[17,9],[9,17],[10,17],[17,18],[24,17],[19,11],[12,19],[19,13],[18,19],[19,20],[21,14],[22,21],[25,18],[24,25],[25,26],[33,25],[25,33],[27,20],[28,35],[36,28],[29,22],[22,29],[23,29],[29,23],[29,28],[31,24],[31,37],[38,31],[31,39],[34,26],[27,34],[34,33],[40,34],[34,41],[42,35],[36,42],[42,43],[49,42],[44,37],[38,44],[44,43],[45,44],[44,50],[50,44],[52,44],[46,38],[40,46],[46,45],[47,46],[46,52],[53,46],[46,53],[46,54],[54,46],[48,47],[55,48],[51,44],[44,51],[50,51],[51,52],[52,51],[57,51],[51,57],[51,58],[59,51],[56,57],[63,56],[60,53],[54,60],[60,59],[59,60],[66,60],[60,67],[68,60],[61,54],[54,61],[62,61],[61,67],[68,61],[61,69],[64,57],[58,64],[64,63],[65,64],[32,39],[37,30],[8,15],[37,36],[36,43],[25,32],[30,24],[30,23],[39,46],[43,36]]}';

function Scene_Hebbian(){

	var self = this;
	BrainScene.call(self);

	// Camera
	self.setCamera(480, 270, 1);
	
	// Whee! One that looks nice & uniform and no "boring" neurons
	Neuron.unserialize(self,NEURONS_SERIALIZED);

	// Modify all connections: already done
	for(var i=0;i<self.connections.length;i++){
		var c = self.connections[i];
		c.strengthEased = 1;
	}

	// Scene Messages
	var _listener1 = subscribe("/scene/removeConnections",function(){
		unsubscribe(_listener1);
		for(var i=0;i<self.connections.length;i++){
			self.connections[i].strength = 0;
		}
	});
	var _listener2 = subscribe("/scene/addInstructions",function(){
		unsubscribe(_listener2);
		self.sprites.push(new HebbInstruction());
	});

	// Scene Transitions
	self.transitionIn = function(){
		self.cameraEased.x = 1600;
	};
	self.transitionOut = function(){
		self.camera.x = 1600;
		return function(){return (self.cameraEased.x>1600);}; // done when this is
	};

	//////////////////////////////////
	// SPRITES AND ANIMATIONS STUFF //
	//////////////////////////////////

	function HebbInstruction(){

		var self = this;
		Sprite.call(self,{
			pivotX:0, pivotY:0,
			spritesheet: images.hebb_instructions,
			frameWidth:400, frameHeight:300,
			frameTotal:1
		});

		// Start Off
		self.x = -400;
		self.y = 0;
		self.gotoX = 0;
		
		// UPDATE
		var _prevUpdate = self.update;
		self.update = function(){
			self.x = self.x*0.7 + self.gotoX*0.3;
			_prevUpdate.call(self);
		};

	}

}

function Scene_Propagation(){

	var self = this;
	BrainScene.call(self);

	// Camera
	self.setCamera(480, 270, 1);
	
	// Whee! One that looks nice & uniform and no "boring" neurons
	Neuron.unserialize(self,NEURONS_SERIALIZED);

	// Scene Transitions
	self.transitionIn = function(){
		self.cameraEased.zoom = 0.2;
	};
	self.transitionOut = function(){
		NEURONS_SERIALIZED = Neuron.serialize();
		self.camera.x = 1600;
		return function(){return (self.cameraEased.x>1600);}; // done when this is
	};

}