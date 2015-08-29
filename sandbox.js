//////////////////////////////////
/////// LOAD ASSETS & SUCH ///////
//////////////////////////////////

Preload({
	images:[
	
		// Neuron images
		{id:"neuron_grab", src:"assets/sprites/grabby.png"},
		//{id:"neuron_body", src:"assets/sprites/body_lighter.png"},
		{id:"neuron_body", src:"assets/sprites/body_dark.png"},
		{id:"neuron_hover", src:"assets/sprites/body_hover.png"},
		{id:"neuron_highlight", src:"assets/sprites/body_highlight.png"},
		{id:"flash", src:"assets/sprites/hebb_flash_2.png"},

		// Shade
		{id:"shade", src:"assets/sprites/shade.png"}

	],
	sounds:[
		{id:"voice_intro", src:"assets/voices/intro.mp3"}
	]
});

//////////////////////////////////
// CREATE NEURONS & CONNECTIONS //
//////////////////////////////////

function addNeuron(x,y){
	var neuron = new Neuron();
	neuron.x = x;
	neuron.y = y;
	neuron.scale = 0.5;
	neuron.clickable = true;
	neurons.push(neuron);
}

subscribe("/init",function(){

	// Reset Experiment
	Experiment.reset();
	
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

});