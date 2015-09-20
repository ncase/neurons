function Sprite(config){

	var self = this;

	// Drawing Properties
	self.x = 0;
	self.y = 0;
	self.scale = 1;
	self.currentFrame = 0;

	// Spritesheet
	self.width = config.width || config.frameWidth;
	self.height = config.height || config.frameHeight;
	self.pivotX = (config.pivotX===undefined) ? 0.5 : config.pivotX;
	self.pivotY = (config.pivotY===undefined) ? 1 : config.pivotY;
	self.spritesheet = config.spritesheet;
	self.hover = config.hover;
	self.frameWidth = config.frameWidth;
	self.frameHeight = config.frameHeight;
	self.frameTotal = config.frameTotal;

	// Animation
	self.gotoSmoosh = 1;
	self.smoosh = 1;
	self.smooshVelocity = 0;
	self.smooshSpring = 0.4;
	self.smooshDampening = 0.64;
	self.bounce = 1;
	self.bounceVelocity = 0;
	self.bounceSpring = 0.4;
	self.bounceDampening = 0.64;
	self.sway = 0;
	self.swayVelocity = 0;
	self.swaySpring = 0.2;
	self.swayDampening = 0.81;
	self.visible = true;
	self.rotation = 0;
	self.alpha = 1;

	// Click Area
	self.clickable = true;
	self.clickRectangle = null;
	self.onClick = function(){};
	self.onHover = function(){};
	self.isMouseOver = function(){

		// Of course not, if not clickable
		if(!self.clickable) return false;
		if(!self.clickRectangle) return false;

		// If so, is it within that circle?
		var r = self.clickRectangle;
		var s = self;
		return (Mouse.x>s.x+r.x && Mouse.y>s.y+r.y && Mouse.x<s.x+r.x+r.width && Mouse.y<s.y+r.y+r.height);

	};
	self.listener = subscribe("/mouse/down",function(){
		if(self.onClick && self.isMouseOver()){// && !self.clickRecovering){
			self.onClick();
		}
	});

	self.kill = function(){
		unsubscribe(self.listener);
	};


	// Update
	var lastHovered = false;
	self.update = function(){

		// Mouse
		if(self.isMouseOver()){
			if(!lastHovered){
				lastHovered=true;
				self.onHover();
			}
			canvas.style.cursor = "pointer";
		}else{
			lastHovered = false;
		}

		// Animation
		self.bounce += self.bounceVelocity;
		self.bounceVelocity += (1-self.bounce) * self.bounceSpring;
		self.bounceVelocity *= self.bounceDampening;
		self.sway += self.swayVelocity;
		self.swayVelocity += (0-self.sway) * self.swaySpring;
		self.swayVelocity *= self.swayDampening;
		self.smoosh += self.smooshVelocity;
		self.smooshVelocity += (self.gotoSmoosh-self.smoosh) * self.smooshSpring;
		self.smooshVelocity *= self.smooshDampening;

	};

	// Draw
	self.draw = function(ctx){

		// Visible?
		if(!self.visible) return;
		
		ctx.save();
		
		// Translate
		ctx.translate(self.x,self.y);

		// Smoosh & Sway & Bounce
		ctx.scale(self.scale,self.scale);
		ctx.scale(self.smoosh,self.smoosh);
		ctx.scale(self.bounce,1/self.bounce);
		ctx.rotate(self.rotation+self.sway);

		// Alpha
		ctx.globalAlpha = self.alpha;

		// Draw spritesheets
		var width = Math.floor(self.spritesheet.width/self.frameWidth);
		var sx = (self.currentFrame%width)*self.frameWidth;
		var sy = Math.floor(self.currentFrame/width)*self.frameHeight;
		var sw = self.frameWidth;
		var sh = self.frameHeight;
		var dx = -self.width*self.pivotX;
		var dy = -self.height*self.pivotY;
		var dw = self.width;
		var dh = self.height;
		ctx.drawImage(self.spritesheet, sx,sy,sw,sh, dx,dy,dw,dh);
		
		ctx.restore();

	};

}