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

		// Hebbian Instructions
		//{id:"hebb_instructions", src:"assets/sprites/hebb_instructions.png"},

		// Crap Background
		{id:"crapBG", src:"assets/images/nicky.png"},

		// Shade
		{id:"shade", src:"assets/sprites/shade.png"}

	],
	sounds:[
		//{id:"voice_intro", src:"assets/voices/intro.mp3"},
		//{id:"sfx_spark", src:"assets/sfx/spark.mp3"},
		//{id:"sfx_loop", src:"assets/sfx/loop.mp3"}
	]
});

////////////////
// INITIALIZE //
////////////////

window.Interactive = {
	scene: null,
	init: function(){
		subscribe("/update",Interactive.update);
		subscribe("/render",Interactive.render);
	},
	goto: function(SceneClass){
		Interactive.scene = new SceneClass();
	},
	update: function(){
		canvas.style.cursor = "default";
		Interactive.scene.update();
	},
	render: function(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		Interactive.scene.render(ctx);
	}
};

subscribe("/init",function(){

	// Remove Preloader Message
	canvas.setAttribute("loading","no");

	// Scene!
	Interactive.init();
	Interactive.goto(Scene_Anxiety);

});