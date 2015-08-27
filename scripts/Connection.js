function Connection(){
	
	var self = this;

	self.from = null;
	self.to = null;

	self.speed = 3;

	self.pulses = [];
	self.pulse = function(signal){
		signal.distance = 0; // reset distance!
		self.pulses.push(signal);
	};

	self.connect = function(from,to){
		self.from = from;
		self.to = to;
		from.senders.push(self);
		to.receivers.push(self);
	};
	
	self.update = function(){

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
	self.lineWidth = 2;
	self.pulseRadius = 5;
	self.endDistance = 25;

	self.draw = function(ctx){

		// save
		ctx.save();

		// translate & rotate so it's from LEFT TO RIGHT
		var from = self.from;
		var to = self.to;
		var dx = from.x-to.x;
		var dy = from.y-to.y;
		var distance = Math.sqrt(dx*dx+dy*dy);// - 2*radius;
		var angle = Math.atan2(dy,dx);
		ctx.translate(from.x,from.y);
		ctx.rotate(angle+Math.PI);

		// draw a line
		ctx.strokeStyle = self.strokeStyle;
		ctx.lineWidth = self.lineWidth;
		ctx.lineCap = 'butt';
		ctx.beginPath();
		ctx.moveTo(0,0);
		var endX = distance-self.endDistance;
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