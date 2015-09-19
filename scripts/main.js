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
		
		// Voices
		{id:"0_intro", src:"assets/voices/0_intro.mp3"},
		{id:"1_hebb", src:"assets/voices/1_hebb.mp3"},
		{id:"2_antihebb", src:"assets/voices/2_antihebb.mp3"},
		{id:"3_therapy", src:"assets/voices/3_therapy.mp3"},
		{id:"4_credits", src:"assets/voices/4_credits.mp3"},


		// Sounds & Shtuff
		{id:"sfx_spark", src:"assets/sfx/spark.mp3"},
		{id:"sfx_loop", src:"assets/sfx/Hebb.mp3"},
		{id:"sfx_blah", src:"assets/sfx/blah.mp3"}

	]
});

////////////////
// INITIALIZE //
////////////////

Narrator.addNarration({
	file: "sfx_blah",
	markers:{
		"blah":["0:00.0","0:04.2"]
	}
});

subscribe("/init",function(){

	// Remove Preloader Message
	canvas.setAttribute("loading","no");

	// Initialize Shtuff
	Interactive.init();
	
	//Narrator.goto("INTRO");

	Narrator.music("sfx_loop",{volume:0.05,loop:-1})
			.scene("Anxiety")
			.talk("blah")
			.goto("HEBBIAN");

});