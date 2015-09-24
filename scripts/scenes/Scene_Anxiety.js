var ANXIETY_SERIALIZED = '{"neurons":[[209,-110],[749,-110],[385,180],[565,180],[209,270],[475,270],[749,270],[119,360],[299,360],[659,360],[839,360],[475,650]],"connections":[[0,4],[1,6],[11,5],[4,7],[5,2],[6,9]]}';

function Scene_Therapy(){

	var self = this;
	Scene_Anxiety_Base.call(self);

	self.transitionOut = function(){
		self.camera.zoom = 0.2;
		return function(){return (self.cameraEased.zoom<0.2);}; // done when this is
	};

	// Scene Messages
	self.celebrate = false;
	var _listener1 = subscribe("/scene/celebrate",function(){
		unsubscribe(_listener1);
		self.celebrate = true;
	});

	// Update: Because connections come & go, gotta keep these constant:
	var timer = 0;
	var _prevUpdate = self.update;
	self.update = function(){

		// Celebratory pulse!
		if(self.celebrate){
			if(timer==0) self.neurons[0].pulse(null,true);
			if(timer==10) self.neurons[11].pulse(null,true);
			if(timer==20) self.neurons[1].pulse(null,true);
			timer = (timer+1) % 30;
		}

		// Previous Update
		_prevUpdate.call(self);

	};

}

function Scene_Anxiety(){

	var self = this;
	Scene_Anxiety_Base.call(self);

	// Update: Because connections come & go, gotta keep these constant:
	var timer = 0;
	var _prevUpdate = self.update;
	var _whenToFire = [4.0, 6.0, 8.0];
	self.update = function(){

		// Auto pulse, whatever
		if(timer==_whenToFire[0]*30) self.neurons[0].pulse(null,true);
		if(timer==_whenToFire[1]*30) self.neurons[11].pulse(null,true);
		if(timer==_whenToFire[2]*30) self.neurons[1].pulse(null,true);
		timer++;

		// Previous Update
		_prevUpdate.call(self);

	};

}

function Scene_Anxiety_Base(){

	var self = this;
	BrainScene.call(self);

	// Camera
	self.setCamera(480,270,1);
	
	// Scene Transitions
	self.transitionIn = function(){
		self.cameraEased.x = -1120;
	};
	self.transitionOut = function(){
		self.camera.x = -1120;
		return function(){return (self.cameraEased.x<-1120);}; // done when this is
	};

	// Whee
	// One that looks nice & uniform and no "boring" neurons
	Neuron.unserialize(self,ANXIETY_SERIALIZED);

	// Modify all connections: already done, and SLOWER.
	for(var i=0;i<self.connections.length;i++){
		var c = self.connections[i];
		c.strengthEased = 1;
		c.speed = 2.5;
	}

	// Modify all neurons: smaller hebb radius
	for(var i=0;i<self.neurons.length;i++){
		var n = self.neurons[i];
		n.scale = 0.7;
		n.hebbianRadius = 150;
	}

	// Some red & blue neurons
	var redNeurons = [2,7,9];
	for(var i=0;i<redNeurons.length;i++){
		var n = self.neurons[redNeurons[i]];
		n.body_image = images.neuron_body_red;
		n.connectionStrokeStyle = "#804444";
		n.highlightFill = "#CC4F4F";
		n.highlightRadius = 100;
		n.highlightFade = 0.93;
		n.highlightBaseAlpha = 0.8;
		n.icon = images.icon_anxious;
		n.name = "anxiety";
	}
	var blueNeurons = [3,8,10];
	for(var i=0;i<blueNeurons.length;i++){
		var n = self.neurons[blueNeurons[i]];
		n.body_image = images.neuron_body_blue;
		n.connectionStrokeStyle = "#78BCBC";
		n.highlightFill = "#A2FFFF";
		n.highlightRadius = 100;
		n.highlightFade = 0.93;
		n.highlightBaseAlpha = 0.8;
		n.icon = images.icon_calm;
		n.name = "calm";
	}

	// The FEAR neurons
	self.neurons[4].icon = images.icon_failure;
	self.neurons[4].name = "failure";
	self.neurons[5].icon = images.icon_people;
	self.neurons[5].name = "social";
	self.neurons[6].icon = images.icon_holes;
	self.neurons[6].name = "holes";

	// Hack - Helper Method: Is This Neuron Rewired?
	self.isRewired = function(neuronName){
		
		// Neuron
		var index;
		if(neuronName=="failure") index=4;
		if(neuronName=="social") index=5;
		if(neuronName=="holes") index=6;
		var neuron = self.neurons[index];

		// Is retrained if there's exactly ONE sender connection...
		if(neuron.senders.length!=1) return false;

		// ...and it's sending to a CALM
		if(neuron.senders[0].to.name!="calm") return false;
		return true;

	};

	// Update: Because connections come & go, gotta keep these constant:
	var _prevUpdate = self.update;
	self.update = function(){

		// Modify all connections: fitting the fat neurons and SLOWER.
		for(var i=0;i<self.connections.length;i++){
			var c = self.connections[i];
			c.pulseRadius = 10;
			c.endDistance = 50;
			c.speed = 2.5;
		}

		// Previous Update
		_prevUpdate.call(self);

	};


}