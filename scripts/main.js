//////////////////////////////////
/////// LOAD ASSETS & SUCH ///////
//////////////////////////////////

Preload({
	images:[
	
		// Neuron images
		{id:"neuron_body", src:"assets/sprites/body_dark.png"},
		{id:"neuron_body_red", src:"assets/sprites/body_red.png"},
		{id:"neuron_body_blue", src:"assets/sprites/body_blue.png"},
		{id:"neuron_hover", src:"assets/sprites/body_hover.png"},
		{id:"neuron_highlight", src:"assets/sprites/body_highlight.png"},
		{id:"flash", src:"assets/sprites/hebb_flash.png"},

		// Icons
		{id:"icon_anxious", src:"assets/sprites/icon_anxious.png"},
		{id:"icon_calm", src:"assets/sprites/icon_calm.png"},
		{id:"icon_social", src:"assets/sprites/icon_social.png"},
		{id:"icon_failure", src:"assets/sprites/icon_failure.png"},
		{id:"icon_holes", src:"assets/sprites/icon_holes.png"},		

		// Placeholder Crap
		{id:"hebb_instructions", src:"assets/images/hebb_instructions.png"},
		{id:"crapBG", src:"assets/images/nicky.png"},
		{id:"credits", src:"assets/images/credits.png"},

		// Shade
		{id:"shade", src:"assets/sprites/shade.png"}

	],
	sounds:[
		
		{id:"0_intro", src:"assets/voices/0_intro.mp3"},

		{id:"sfx_spark", src:"assets/sfx/spark.mp3"},
		{id:"sfx_loop", src:"assets/sfx/Hebbian.mp3"},
		{id:"sfx_blah", src:"assets/sfx/blah.mp3"}

	]
});

////////////////////////////////////////////
// REAL-TIME VOICEOVER, JUST LIKE BASTION //
////////////////////////////////////////////

/*
Narrator.init({
	file: "voice",
	markers:{
		
		"intro0": [0.4, 11.5], // Intro. What was going on...
		"intro1": [11.5, 12.8], // ...in my brain.
		
		"prop0": [13.6, 18.0], // This is my interactive animation
		"prop1": [18.4, 25.0], // Click on neuron, see what happens
		"prop2": [26.3, 32.0], // Yeah! Click some more.
		"prop3": [33.4, 43.0], // That's how it works, but in the anxious brain...
		
		"anxi0": [43.0, 48.4], // THIS is what happens.
		"anxi1": [50.2, "1:04.5"], // For example, my three fears
		"anxi2": ["1:04.5", "1:07.0"], // Ack, ugh!

		"hebb0": ["1:07.5", "1:14.2"], // How do we make these connections? Let me remove all THIS
		"hebb1": ["1:14.6", "1:16.7"], // And give you this
		"hebb2": ["1:19.0", "1:25.3"], // HEBBIAN LEARNING
		"hebb3": ["1:30.4", "1:39.4"], // Try it for yourself
		"hebb4": ["1:43.2", "1:46.7"], // Didn't click fast enough
		"hebb5": ["1:54.1", "2:00.0"], // Didn't click close enough
		"hebb6": ["2:05.0", "2:09.9"], // Cool, you did it! Make a chain or something

		"anti0": ["2:15.4", "2:21.3"], // How we unlearn, this other rule
		"anti1": ["2:27.5", "2:35.0"], // ANTI-HEBBIAN LEARNING
		"anti2": ["2:38.7", "2:43.8"], // Try it out
		"anti3": ["2:47.3", "2:50.7"], // No connections to OR from it
		"anti4": ["2:53.8", "2:58.8"], // No connections FROM it
		"anti5": ["3:03.1", "3:04.1"], // Now wait for it
		"anti6": ["3:07.1", "3:12.9"], // Bam! Do it again, connection will be killed

		"ther0": ["3:16.1", "3:20.8"], // Now that you know how to learn/unlearn, let's revisit...
		"ther1": ["3:20.8", "3:21.8"] // THIS

	}
});

Narrator.setStates({

	INTRO:{
		start:function(){
			//Narrator.scene("Intro").talk("intro0")
			Narrator.scene("Propagation")
					.music("sfx_loop",{volume:0.05,loop:-1})
					.talk("intro1","prop0","prop1")
					.goto("PROP_CLICK");
		}
	},

	PROP_CLICK:{
		start:function(state){
			state._listener = subscribe("/neuron/click",function(neuron){
				unsubscribe(state._listener);
				Narrator.talk("prop2").goto("PROP_CLICK_MORE");
			});
		}
	},

	PROP_CLICK_MORE:{
		start:function(state){
			state.toClickLeft = 3;
			state._listener = subscribe("/neuron/click",function(neuron){

				state.toClickLeft--;
				if(state.toClickLeft>0) return;

				unsubscribe(state._listener);
				Narrator.talk("prop3").goto("ANXIETY");

			});
		}
	},

	ANXIETY:{
		start:function(){
			Narrator.scene("Anxiety").talk("anxi0","anxi1")
					.scene("Hebbian").talk("anxi2")
					.goto("HEBBIAN")
		}
	},

	HEBBIAN:{
		start:function(){
			Narrator.talk("hebb0")
					.message("/scene/removeConnections")
					.talk("hebb1")
					.message("/scene/addInstructions").
					do(function(){
						alert("END OF PROTOTYPE SO FAR");
					});
					.talk("hebb2","hebb3")
					.goto("HEBBIAN_CLICK");
		}
	},

	THERAPY:{
		start:function(){
			Narrator.scene("Therapy");
		}
	}

});*/

////////////////
// INITIALIZE //
////////////////

subscribe("/init",function(){

	// Remove Preloader Message
	canvas.setAttribute("loading","no");

	// Initialize Shtuff
	Interactive.init();
	Narrator.goto("INTRO");

});