function Connection(){
	
	var self = this;

	// Connection properties
	self.from = null;
	self.to = null;
	self.speed = 3;

	// Strength
	self.strength = 1;
	self.strengthEased = 0;

	// Pulses
	self.pulses = [];
	self.pulse = function(signal){

		// Only send down the signal if the strength is actually good!
		if(self.isConnected()){
			signal.distance = 0; // reset signal's distance!
			self.pulses.push(signal);
		}

	};

	// Connect
	self.connect = function(from,to){
		self.from = from;
		self.to = to;
		from.senders.push(self);
		to.receivers.push(self);
	};

	// Strengthen - Increase by 50%
	self.strengthen = function(){
		self.strength += 0.5;
		if(self.strength>1) self.strength=1;

	};

	// Weaken - Decrease by 20%
	self.weaken = function(){
		self.strength -= 0.20;
		if(self.strength<0.25) self.strength=0;
	};

	// Am I Connected? Threshold: 2/3
	self.isConnected = function(){
		return(self.strength>=0.66);
	};

	// UPDATE
	self.update = function(){

		// Pythagorean Distance
		var dx = self.from.x-self.to.x;
		var dy = self.from.y-self.to.y;
		var distance = Math.sqrt(dx*dx+dy*dy);

		// Have all signals go down the wire
		// at a constant "actual length" rate
		for(var i=0;i<self.pulses.length;i++){
			var pulse = self.pulses[i];
			pulse.distance += self.speed;

			// Oh, you've reached the end?
			if(pulse.distance>=distance){
				
				// Tell the TO neuron to pulse
				self.to.pulse(pulse);

				// Remove this pulse from the wire
				self.pulses.splice(i,1);
				i--;

			}
		}

	};

	self.strokeStyle = "#BFBFBF";
	self.strokeStyleFaded = "#A9A9A9";
	self.lineWidth = 3;
	self.easedLineWidth = self.lineWidth;
	self.pulseRadius = 8;
	self.endDistance = 35;

	self.draw = function(ctx){

		// save
		ctx.save();

		// translate & rotate so it's from LEFT TO RIGHT
		var from = self.from;
		var to = self.to;
		var dx = from.nx-to.nx;
		var dy = from.ny-to.ny;
		var distance = Math.sqrt(dx*dx+dy*dy);
		var angle = Math.atan2(dy,dx);
		ctx.translate(from.nx,from.ny);
		ctx.rotate(angle+Math.PI);

		// draw a line
		ctx.strokeStyle = self.strokeStyle;
		ctx.lineWidth = self.lineWidth;
		ctx.lineCap = 'butt';
		ctx.beginPath();
		ctx.moveTo(0,0);
		var endX = (distance*self.strength)-self.endDistance;
		ctx.lineTo(endX,0);
		ctx.lineTo(endX+self.pulseRadius,-self.pulseRadius);
		ctx.moveTo(endX,0);
		ctx.lineTo(endX+self.pulseRadius,self.pulseRadius);
		ctx.stroke();

		// draw all pulses
		for(var i=0;i<self.pulses.length;i++){
			var pulse = self.pulses[i];
			var alpha = Math.round(100*pulse.strength/4)/100;
			ctx.fillStyle = "rgba(255,255,255,"+alpha+")";
			ctx.beginPath();
			ctx.arc(pulse.distance, 0, self.pulseRadius, 0, 2*Math.PI, false);
			ctx.fill();
		}

		// restore
		ctx.restore();

	};

};