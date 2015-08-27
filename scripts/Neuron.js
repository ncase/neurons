function Neuron(){
	
	var self = this;

	self.id = null;

	self.x = 0;
	self.y = 0;
	self.scale = 1;
	self.rotation = Math.random()*Math.PI*2;

	self.senders = [];
	self.receivers = [];

	self.startingStrength = 4;
	self.highlight = 0;

	self.textBubble = null;
	self.icon = null;

	var img_body = window.images.neuron_body;
	var img_highlight = window.images.neuron_highlight;

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
		}

		// Send message with signal
		if(self.id){
			publish("/neuron/"+self.id, [signal]);
		}

		// Highlight!
		self.highlight += (signal.strength+2)/4;
		if(self.highlight>1) self.highlight=1;

		// If there's still strength in the neuron,
		// pass it down immediately to all connectors.
		// (CLONE THE SIGNAL.)
		// And ADD SELF as sender.
		if(signal.strength>0){
			for(var i=0;i<self.senders.length;i++){
				var sender = self.senders[i];
				sender.pulse({
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
	
	self.update = function(){

		// Highlight!
		self.highlight *= 0.9;
		if(self.highlight<0.01){
			self.highlight = 0;
		}

	};

	self.draw = function(ctx){

		// save
		ctx.save();

		// translate
		ctx.translate(self.x,self.y);
		ctx.scale(self.scale,self.scale);
		ctx.rotate(self.rotation);

		// draw a spiky body
		ctx.drawImage(img_body,-50,-50);

		// highlight!
		ctx.globalAlpha = self.highlight;
		ctx.drawImage(img_highlight,-50,-50);
		ctx.globalAlpha = 1;

		// highlight circle!
		ctx.fillStyle = "rgba(255,255,255,"+self.highlight/2+")";
		ctx.beginPath();
		ctx.arc(0, 0, 80, 0, 2*Math.PI, false);
		ctx.fill();

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