function Flash(neuron){

	var self = this;
	self.neuron = neuron;

	self.scale = 0;
	self.pulse = function(){
		self.timer = self.neuron.hebbSignalDuration*30;
		self.wobble = 0;
	};

	self.timer = -1;
	self.wobble = 0;
	self.update = function(){
		self.wobble += 1.5;
		var gotoScale = (self.timer>=0) ? 1 : 0;
		self.scale = self.scale*0.7 + gotoScale*0.3;
		if(self.timer>=0) self.timer--;
	};

	self.draw = function(ctx){

		if(self.scale<0.01) return;
		
		// Translate
		ctx.save();
		ctx.translate(self.neuron.nx, self.neuron.ny);

		// Scale
		var wobbledScale = self.scale * (1+Math.sin(self.wobble)*0.01);
		ctx.scale(wobbledScale,wobbledScale);
		var hebbScale = self.neuron.hebbianRadius/200;
		ctx.scale(hebbScale,hebbScale);

		// Draw flash
		ctx.globalAlpha = 0.7;
		ctx.drawImage(images.flash, -images.flash.width/2, -images.flash.height/2);
		ctx.restore();

	};

}