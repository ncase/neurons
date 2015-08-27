function CurvyConnection(){
	
	var self = this;

	self.from = null;
	self.to = null;

	self.speed = 3;
	self.curve = -100; // looks like a straight line by default

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
		self.calculateCurveCircle();
	};
	
	self.curveArc = null;
	self.calculateCurveCircle = function(){


		// 1) Find midpoint
		var mx = (self.from.x+self.to.x)/2;
		var my = (self.from.y+self.to.y)/2;
		
		// 2) Get perpendicular unit vector to the left (dy,-dx)
		var dx = self.from.x-self.to.x;
		var dy = self.from.y-self.to.y;
		var distance = Math.sqrt(dx*dx+dy*dy);
		var ux = dy/distance;
		var uy = -dx/distance;
		
		// 3) Multiply by curve distance
		var curve = Math.abs(self.curve);
		var flip = (self.curve<0) ? true : false;
		ux *= curve;
		uy *= curve;

		// 4) Get circle center
		var cx = mx + ux;
		var cy = my + uy;

		// 5) Calculate circle radius
		dx = self.from.x-cx;
		dy = self.from.y-cy;
		var cr = Math.sqrt(dx*dx+dy*dy);

		// 6) Calculate curve angle: atan(halfdistance/curve), times two
		var ca = Math.atan2(distance/2,curve) * 2;
		
		// 7) Store & return circle (relative to left-right orientation)
		self.curveArc = {
			x: distance/2,
			y: curve,
			flip: flip,
			angle: ca,
			radius: cr
		};
		return self.curveArc;

	};

	self.update = function(){

		// Full distance of connection is simply Angle * Radius
		// It's the arclength.
		var distance = self.curveArc.angle * self.curveArc.radius;

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

		var arc = self.curveArc;

		// save
		ctx.save();

		// translate & rotate so it's from LEFT TO RIGHT
		var from = self.from;
		var to = self.to;
		var dx = from.x-to.x;
		var dy = from.y-to.y;
		var distance = Math.sqrt(dx*dx+dy*dy);
		var angle = Math.atan2(dy,dx);
		ctx.translate(from.x,from.y);
		ctx.rotate(angle+Math.PI);

		// ending arclength
		var endAngle = self.endDistance/arc.radius;

		// draw a line
		ctx.strokeStyle = self.strokeStyle;
		ctx.lineWidth = self.lineWidth;
		ctx.lineCap = 'butt';
		ctx.beginPath();
		if(arc.flip){
			ctx.arc(arc.x, -arc.y, arc.radius, Math.PI/2-arc.angle/2+endAngle, Math.PI/2+arc.angle/2, false);
		}else{
			ctx.arc(arc.x, arc.y, arc.radius, -Math.PI/2-arc.angle/2, -Math.PI/2+arc.angle/2-endAngle, false);
		}
		ctx.stroke();

		// draw synapse
		var arclength = arc.angle * arc.radius;
		var synapseAngle = (((arclength-self.endDistance)/arclength)-0.5)*arc.angle;
		var sx = arc.x + Math.cos(Math.PI/2-synapseAngle)*arc.radius;
		var sy = -arc.y + Math.sin(Math.PI/2-synapseAngle)*arc.radius;
		if(!arc.flip){
			sy *= -1;
		}
		// SO MUCH TRIAL AND ERROR.
		// I DON'T ACTUALLY KNOW WHY THIS WORKS
		// BUT IT DOES
		// YUP, THAT SURE IS GOOD CODING PRACTICE.
		// THAT SURRRRRE IS
		if(arc.flip){
			var a = synapseAngle+Math.PI/4;
			ctx.beginPath();
			ctx.moveTo(sx,sy);
			var r = self.pulseRadius*1.4;
			ctx.lineTo(sx+Math.sin(a)*r, sy+Math.cos(a)*r);
			ctx.moveTo(sx,sy);
			ctx.lineTo(sx+Math.cos(a)*r, sy-Math.sin(a)*r);
			ctx.stroke();
		}else{
			var a = synapseAngle+Math.PI/4;
			ctx.beginPath();
			ctx.moveTo(sx,sy);
			var r = self.pulseRadius*1.4;
			ctx.lineTo(sx+Math.cos(a)*r, sy+Math.sin(a)*r);
			ctx.moveTo(sx,sy);
			ctx.lineTo(sx+Math.sin(a)*r, sy-Math.cos(a)*r);
			ctx.stroke();
		}

		// draw all pulses
		for(var i=0;i<self.pulses.length;i++){
			
			var pulse = self.pulses[i];
			var alpha = Math.round(100*pulse.strength/4)/100;

			var arclength = arc.angle * arc.radius;
			var pulseAngle = ((pulse.distance/arclength)-0.5)*arc.angle;
			
			var px = arc.x + Math.cos(Math.PI/2-pulseAngle)*arc.radius;
			var py = -arc.y + Math.sin(Math.PI/2-pulseAngle)*arc.radius;
			if(!arc.flip){
				py *= -1;
			}

			ctx.fillStyle = "rgba(255,255,255,"+alpha+")";
			ctx.beginPath();
			ctx.arc(px, py, self.pulseRadius, 0, 2*Math.PI, false);
			ctx.fill();

		}

		// restore
		ctx.restore();

	};

};