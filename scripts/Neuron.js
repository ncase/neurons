function Neuron(){
	
	var self = this;

	self.id = null;

	self.x = 0;
	self.y = 0;
	self.nx = 0;
	self.ny = 0;
	self.scale = 1;
	self.rotation = Math.random()*Math.PI*2;

	self.senders = [];
	self.receivers = [];

	self.startingStrength = 4;
	self.highlight = 0;
	self.hebbian = 0;

	self.textBubble = null;
	self.icon = null;

	var img_body = window.images.neuron_body;
	var img_highlight = window.images.neuron_highlight;
	self.grabbySprite = new Sprite({
		pivotX:0.5, pivotY:0.5,
		spritesheet: images.neuron_grab,
		frameWidth:150, frameHeight:150,
		frameTotal:8
	});

	self.strengthenedConnections = [];
	self.strengthenHebb = function(){

		// Hebbian highlight!
		self.hebbian = 1;

		// Find NOT-THIS-ONE neurons with hebbians, strengthen the connection from them to this.
		// There MUST be a connection initialized before.
		for(var i=0;i<neurons.length;i++){
			var neuron = neurons[i];
			if(neuron.hebbian>0){

				// Good! This neuron is accepting hebbian connections.
				// Find a connection FROM that TO this.
				for(var j=0;j<connections.length;j++){
					var connection = connections[j];
					if(connection.from==neuron && connection.to==self){
						connection.strengthen();
						neuron.strengthenedConnections.push(connection);
					}
				}

			}
		}

	};

	self.weakenHebb = function(){

		// Get all sender connections that AREN'T the ones we just strengthened
		var weakenThese = self.senders.filter(function(sender){
			for(var i=0;i<self.strengthenedConnections.length;i++){
				if(sender==self.strengthenedConnections[i]){
					return false;
				}
			}
			return true;
		});

		// Weaken them all
		for(var i=0;i<weakenThese.length;i++){
			weakenThese[i].weaken();
		}

		// Reset Strengthened Connections
		self.strengthenedConnections = [];

	};

	self.pulse = function(signal){

		// It should lose strength in the neuron
		// If there's no passed-on signal, create a brand new one.
		if(signal){
			signal.strength--;
		}else{
			signal = {
				startingStrength: self.startingStrength,
				strength: self.startingStrength,
				from: self.id
			};
			self.strengthenHebb();
		}

		// Send message with signal
		if(self.id){
			publish("/neuron/"+self.id, [signal]);
		}

		// Smoosh
		self.smooshVelocity += 0.05*(signal.strength+1);

		// Highlight!
		self.highlight = 1;

		// If there's still strength in the neuron,
		// pass it down immediately to all connectors.
		// (CLONE THE SIGNAL.)
		// And ADD SELF as sender.
		if(signal.strength>0){
			for(var i=0;i<self.senders.length;i++){
				var sender = self.senders[i];
				sender.pulse({
					startingStrength: self.startingStrength,
					strength: signal.strength,
					from: self.id
				});
			}
		}

		// Create some words, if there's any.
		if(self.textBubble){
			
			var tb = new TextBubble();
			tb.x = self.x;
			tb.y = self.y;
			
			var conf = self.textBubble;
			if(conf){
				if(conf.messages && signal.from){
					conf.message = conf.messages[signal.from];
				}
				tb.configure(conf);
			}
			window.words.push(tb);

		}

	}
	
	self.hebbSignalDuration = 2; // 2 seconds, sorta
	self.update = function(){

		// Highlight!
		self.highlight *= 0.8;
		if(self.highlight<0.01){
			self.highlight = 0;
		}

		// Hebbian update
		if(self.hebbian>0){
			self.hebbian -= 1/(30*self.hebbSignalDuration);
			if(self.hebbian<0){
				self.weakenHebb();
			}
		}else{
			self.hebbian = 0;
		}

		// Animation
		self.smoosh += self.smooshVelocity;
		self.smooshVelocity += (1-self.smoosh) * self.smooshSpring;
		self.smooshVelocity *= self.smooshDampening;

		// Neuron's Wobbly Position
		self.wobble += self.wobbleVelocity*0.05;
		var scale = self.scale*self.smoosh;
		self.nx = self.x + Math.cos(self.wobble)*self.wobbleRadius*scale*20;
		self.ny = self.y + Math.sin(self.wobble)*self.wobbleRadius*scale*20;

		// Mouse
		if(self.isMouseOver()){
			canvas.style.cursor = "pointer";
		}

	};

	// CLICK & HOVER
	self.isMouseOver = function(){

		// If so, is it within that circle?
		var dx = Mouse.x-self.x;
		var dy = Mouse.y-self.y;
		var r = 60*self.scale;
		return (dx*dx+dy*dy<r*r);

	};
	subscribe("/mouse/down",function(){
		if(self.isMouseOver()){// && !self.clickRecovering){
			self.pulse();
		}
	});


	// Animation
	self.smoosh = 1;
	self.smooshVelocity = 0;
	self.smooshSpring = 0.4;
	self.smooshDampening = 0.64;
	self.wobble = Math.random()*Math.PI*2;
	self.wobbleRadius = Math.random();
	self.wobbleVelocity = Math.random()*2-1;

	self.draw = function(ctx){

		// save
		ctx.save();

		// translate
		ctx.translate(self.nx,self.ny);

		// transform
		var scale = self.scale*self.smoosh;
		ctx.scale(scale,scale);
		ctx.rotate(self.rotation);

		// hebbian grabbiness
		if(self.hebbian>0){

			/**
			ctx.save();
			ctx.fillStyle = "#fff";
			ctx.globalAlpha = 0.5*self.hebbian;
			ctx.beginPath();
			var ripple = Math.sin(self.hebbian*30);
			ctx.arc(0, 0, 80+ripple*10, 0, 2*Math.PI, false);
			ctx.fill();
			ctx.restore();
			**/

			var grabScale;
			if(self.hebbian>0.9){
				grabScale = 1-((self.hebbian-0.9)/0.1); // 0 to 1
			}else if(self.hebbian>0.1){
				grabScale = 1; // 1 to 1
			}else{
				grabScale = self.hebbian/0.1; // 1 to 0
			}
			self.grabbySprite.scale = grabScale;
			self.grabbySprite.draw(ctx);
			self.grabbySprite.currentFrame = (self.grabbySprite.currentFrame+1)%self.grabbySprite.frameTotal;
			//ctx.drawImage(img_grabby,-65,-65);
			
		}

		// draw a spiky body
		ctx.drawImage(img_body,-50,-50);

		// highlight!
		ctx.globalAlpha = self.highlight;
		ctx.drawImage(img_highlight,-50,-50);
		ctx.globalAlpha = 1;

		// highlight circle!
		if(self.highlight>=0.01){
			ctx.fillStyle = "rgba(255,255,255,"+self.highlight/2+")";
			ctx.beginPath();
			ctx.arc(0, 0, 60, 0, 2*Math.PI, false);
			ctx.fill();
		}

		// icon
		if(self.icon){
			ctx.rotate(-self.rotation);
			ctx.globalAlpha = 0.5;
			ctx.drawImage(self.icon,-30,-30,60,60);
		}

		// restore
		ctx.restore();

	};

};