//////////////////////////////////
/////// LOAD ASSETS & SUCH ///////
//////////////////////////////////

Preload({
	images:[
	
		// Neuron images
		{id:"neuron_grab", src:"assets/sprites/grabby.png"},
		{id:"neuron_body", src:"assets/sprites/body_dark.png"},
		{id:"neuron_hover", src:"assets/sprites/body_hover.png"},
		{id:"neuron_highlight", src:"assets/sprites/body_highlight.png"},
		{id:"flash", src:"assets/sprites/hebb_flash_2.png"},

		// Hebbian Instructions
		{id:"hebb_instructions", src:"assets/sprites/hebb_instructions.png"},

		// Shade
		{id:"shade", src:"assets/sprites/shade.png"}

	],
	sounds:[
		{id:"voice_intro", src:"assets/voices/intro.mp3"},
		{id:"sfx_spark", src:"assets/sfx/spark.mp3"},
		{id:"sfx_loop", src:"assets/sfx/loop.mp3"}
	]
});


////////////////////////////////////////////
// REAL-TIME VOICEOVER, JUST LIKE BASTION //
////////////////////////////////////////////

Narrator.init({
	file: "voice_intro",
	markers:{
		"1": [0.0, 1.7], // Hi it's Nicky Case
		"2": [2.0, 6.5], // This is my interactive animation
		"3": [6.5, 12.0], // To start, click a neuron
		"4": [12.26, 18.0], // OKAY FINE DON'T LISTEN TO ME
		"5": [18.4, 22.0], // That one was boring
		"6": [24.0, 25.0], // Yeah!
		"7": [26.0, 29.7], // Look how the signals propagate down
		"8": [30.2, 31.7], // Try clicking some more
		"9": [33.9, 38.0], // Okay you're clicking EVERYTHING
		"10": [41.0, 60.3], // Something beautiful...
		"11": ["1:02.1", "1:08.3"], // Let me remove all THIS
		"12": ["1:09.3", "1:10.8"], // and give you...
		"13": ["1:11.4", "1:16.0"], // This! Scientific rules
		"14": ["1:16.0", "1:34.4"], // Bye~
	}
});

Narrator.setStates({

	INTRO: {
	// 1 -> 2 -> CLICK
	// [interrupted with good -> InterruptedGood]
	// [interrupted with boring -> InterruptedBoring]
		start: function(){

			Narrator.talk("1","2").do(function(){
				unsubscribe(_interrupted);
			}).goto("CLICK");

			var _interrupted = subscribe("/neuron/click",function(neuron){
				if(neuron.senders.length==0){
					Narrator.stop().goto("INTERRUPT_BORING");
				}else{
					Narrator.stop().goto("INTERRUPT_GOOD");
				}
				unsubscribe(_interrupted);
			});

		}
	},

	CLICK: {
	// 3 -> Click
	// [boring neuron] -> ClickBoring (only ONCE, though.)
	// [good neuron] -> ClickGood
	// [clicking everything] -> ClickWild
		start: function(state){

			if(!state.instructionsGiven){
				Narrator.talk("3").do(function(){
					state.instructionsCompleted = true;
				});
			}

			state.timer = 45; // 1.5 seconds
			state.clickedNeurons = [];
			state.instructionsGiven = true;
			state.instructionsCompleted = state.instructionsCompleted || false;
			state.saidItsBoring = state.saidItsBoring || false;

			state._listener = subscribe("/neuron/click",function(neuron){

				if(state.saidItsBoring && neuron.senders.length==0){
					return; // ignore it
				}

				state.clickedNeurons.push(neuron);

			});

		},
		during: function(state){
			var clicked = state.clickedNeurons;
			if(clicked.length>0){
				state.timer--;

				// Now decide where to go from here
				if(state.timer<0 && state.instructionsCompleted){

					// Unsubscribe
					unsubscribe(state._listener);

					// Clicking wildly, probably.
					if(clicked.length>1){
						Narrator.stop().goto("CLICK_WILD");
						return;
					}else{

						// Was it a boring one?
						if(clicked[0].senders.length==0){
							state.saidItsBoring = true;
							Narrator.stop().goto("CLICK_BORING");
						}else{
							Narrator.stop().goto("CLICK_GOOD");
						}

					}
				}

			}
		}
	},

	CLICK_BORING: {
	// 5 -> Click
		start: function(){
			Narrator.talk("5").goto("CLICK");
		}
	},

	CLICK_GOOD: {
	// 6 -> 7 -> 8 -> ClickMore
		start: function(){
			Narrator.talk("6","7","8").goto("CLICK_MORE");
		}
	}, 

	CLICK_WILD: {
	// 9 -> 7 -> Ending
		start: function(){
			Narrator.talk("9","7").goto("ENDING");
		}
	}, 

	CLICK_MORE: {
	// [three more not-boring clicks] -> [wait half a second] -> Ending
		start: function(state){
			state.clickedNeurons = [];
			state._listener = subscribe("/neuron/click",function(neuron){
				if(neuron.senders.length>0){
					state.clickedNeurons.push(neuron);
					if(state.clickedNeurons.length>=3){

						// Unsubscribe
						unsubscribe(state._listener);

						// Ending!
						Narrator.wait(0.5).goto("ENDING");

					}
				}
			});
		}
	},

	INTERRUPT_GOOD: {
	// 4 -> 7 -> 8 -> ClickMore
		start: function(){
			Narrator.talk("4","7","8").goto("CLICK_MORE");
		}
	},

	INTERRUPT_BORING: {
	// 4 -> 8 -> ClickMore
		start: function(){
			Narrator.talk("4","8").goto("CLICK_MORE");
		}
	},

	ENDING: {
		start: function(){
			// 10 -> 11 -> [remove connections] -> 12 -> [show rules] -> 13 -> 14
			Narrator.talk("10","11")
				.do(function(){
					for(var i=0;i<connections.length;i++){
						connections[i].strength = 0;
					}
				})
				.talk("12")
				.do(function(){
					publish("event/instructions");
				})
				.talk("13","14");
		}
	},

});

//////////////////////////////////
// CREATE NEURONS & CONNECTIONS //
//////////////////////////////////

function CreateNeurons(){

	// Randomly yet uniformly distributed neurons
	var space = 120;
	for(var x=-space; x<canvas.width+space; x+=space){
		for(var y=-space; y<canvas.height+space; y+=space){
			
			var rx = x+(0.5+Math.random()*0.6-0.3)*space;
			var ry = y+(0.5+Math.random()*0.6-0.3)*space;
			addNeuron(rx,ry);

		}
	}

	// Random nearby connections
	var unconnected;
	var giveUp = 10000;
	while((unconnected=findLonelyNeuron()) && --giveUp>0){
		var partners = getRandomPartners(unconnected,space*1.75);
		for(var i=0;i<partners.length;i++){
			
			// One-way connections
			var connection = new Connection();
			// sorta guarantees every neuron will result in cool propagation
			if(i%2==0){
				connection.connect(unconnected,partners[i]);
			}else{
				connection.connect(partners[i],unconnected);
			}
			connections.push(connection);

			// Two-way connection - OPPOSITE!
			if(Math.random()<0.1){
				var connection = new Connection();
				if(i%2==0){
					connection.connect(partners[i],unconnected);
				}else{
					connection.connect(unconnected,partners[i]);
				}
				connections.push(connection);
			}

		}
	}

	// CRAPPY HELPER FUNCTIONS //

	function addNeuron(x,y){
		var neuron = new Neuron();
		neuron.x = x;
		neuron.y = y;
		neuron.scale = 0.5;
		neuron.clickable = true;
		neurons.push(neuron);
	}
	function findLonelyNeuron(){
		for(var i=0;i<neurons.length;i++){
			var neuron = neurons[i];
			if(neuron.senders.length+neuron.receivers.length==0){
				return neuron;
			}
		}
		return null;
	}
	function getRandomPartners(neuron,radius){
		var nearby = neurons.filter(function(n){
			if(n==neuron) return false;
			var dx = n.x - neuron.x;
			var dy = n.y - neuron.y;
			if(dx*dx+dy*dy<radius*radius){
				return Math.random()<0.8; //true;
			}else{
				return false;
			}
		});
		return nearby;
	}

}


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
	self.visible = false;
	self.x = -400;
	self.y = 0;
	self.gotoX = self.x;

	// Show
	subscribe("event/instructions",function(){
		self.visible = true;
		self.gotoX = 0;
	});

	// UPDATE
	var _prevUpdate = self.update;
	self.update = function(){
		self.x = self.x*0.7 + self.gotoX*0.3;
		_prevUpdate.call(self);
	};

}

////////////////
// INITIALIZE //
////////////////

subscribe("/init",function(){

	// Remove Preloader Message
	canvas.setAttribute("loading","no");

	// Reset Experiment
	Experiment.reset();

	// Play music loop
	createjs.Sound.play("sfx_loop",{loop:-1, volume:0.6});

	// Start Narration.
	Narrator.goto("INTRO");
	
	// Create Neurons
	CreateNeurons();

	// Hebbian Instruction
	sprites.push(new HebbInstruction());

});