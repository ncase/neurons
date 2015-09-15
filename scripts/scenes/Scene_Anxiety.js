var ANXIETY_SERIALIZED = '{"neurons":[[209,-110],[749,-110],[385,180],[565,180],[209,270],[475,270],[749,270],[119,360],[299,360],[659,360],[839,360],[475,650]],"connections":[[0,4],[1,6],[11,5],[4,7],[5,2],[6,9]]}';

function Scene_Therapy(){

	var self = this;
	Scene_Anxiety_Base.call(self);

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
		if(timer==_whenToFire[0]*30) self.neurons[0].pulse({ strength:3 });
		if(timer==_whenToFire[1]*30) self.neurons[11].pulse({ strength:3 });
		if(timer==_whenToFire[2]*30) self.neurons[1].pulse({ strength:3 });
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
	}

	// The FEAR neurons
	self.neurons[4].icon = images.icon_social;
	self.neurons[5].icon = images.icon_failure;
	self.neurons[6].icon = images.icon_holes;

	// Update: Because connections come & go, gotta keep these constant:
	var _prevUpdate = self.update;
	self.update = function(){

		// Modify all connections: fitting the fat neurons
		for(var i=0;i<self.connections.length;i++){
			var c = self.connections[i];
			c.pulseRadius = 10;
			c.endDistance = 50;
		}
		// Previous Update
		_prevUpdate.call(self);

	};


}