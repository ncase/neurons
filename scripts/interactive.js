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
		//{id:"voice_intro", src:"assets/voices/intro.mp3"},
		//{id:"sfx_spark", src:"assets/sfx/spark.mp3"},
		//{id:"sfx_loop", src:"assets/sfx/loop.mp3"}
	]
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
			Neuron.add(rx,ry);

		}
	}

	// Random nearby connections
	var unconnected;
	var giveUp = 10000;
	while((unconnected=findLonelyNeuron()) && --giveUp>0){
		var partners = getRandomPartners(unconnected,space*1.5);
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
	//Narrator.goto("INTRO");
	
	// Create Neurons
	//CreateNeurons();
	UnserializeNeurons('{"neurons":[[-92,-72],[-24,75],[-57,199],[-77,304],[-76,405],[-65,538],[-81,696],[45,-72],[56,84],[27,205],[35,321],[91,433],[32,521],[89,659],[208,-35],[153,57],[186,214],[152,269],[174,384],[149,558],[193,675],[266,-90],[273,85],[276,158],[300,324],[288,424],[330,573],[284,687],[452,-28],[431,87],[412,206],[452,287],[387,387],[395,539],[401,628],[518,-80],[570,65],[542,146],[558,318],[522,447],[513,527],[505,637],[661,-83],[656,54],[678,213],[654,294],[660,430],[676,541],[648,669],[780,-81],[752,64],[808,201],[799,330],[746,420],[808,522],[779,657],[892,-81],[881,75],[874,171],[907,319],[883,455],[920,514],[889,682],[1009,-76],[992,94],[997,201],[1008,325],[1046,387],[1016,565],[1018,635]],"connections":[[0,1],[1,0],[2,3],[8,2],[2,9],[10,2],[4,3],[10,4],[4,11],[11,4],[5,6],[12,5],[7,1],[8,7],[7,14],[15,7],[13,6],[12,13],[13,20],[16,9],[15,16],[16,18],[22,16],[16,22],[16,23],[24,16],[17,9],[9,17],[10,17],[17,18],[24,17],[19,11],[12,19],[19,13],[18,19],[19,20],[21,14],[22,21],[25,18],[24,25],[25,26],[33,25],[25,33],[27,20],[28,35],[36,28],[29,22],[22,29],[23,29],[29,23],[29,28],[31,24],[31,37],[38,31],[31,39],[34,26],[27,34],[34,33],[40,34],[34,41],[42,35],[36,42],[42,43],[49,42],[44,37],[38,44],[44,43],[45,44],[44,50],[50,44],[52,44],[46,38],[40,46],[46,45],[47,46],[46,52],[53,46],[46,53],[46,54],[54,46],[48,47],[55,48],[51,44],[44,51],[50,51],[51,52],[52,51],[57,51],[51,57],[51,58],[59,51],[56,57],[63,56],[60,53],[54,60],[60,59],[59,60],[66,60],[60,67],[68,60],[61,54],[54,61],[62,61],[61,67],[68,61],[61,69],[64,57],[58,64],[64,63],[65,64],[32,39],[37,30],[8,15],[37,36],[36,43],[25,32],[30,24],[30,23]]}');

	// Hebbian Instruction
	//sprites.push(new HebbInstruction());

});

/////////////////////////////////////
// SERIALIZE & UNSERIALIZE NEURONS //
/////////////////////////////////////

function SerializeNeurons(){

	// Prepare output
	var output = {
		neurons:[], // [x,y], [x,y], [x,y]...
		connections:[] // [from,to], [from,to], [from,to]...
	};

	// Get positions of all neurons
	for(var i=0;i<neurons.length;i++){
		var neuron = neurons[i];
		output.neurons.push([Math.round(neuron.x),Math.round(neuron.y)]);
	}

	// Get all connections, and the IDs of the neurons they're connected to.
	for(var i=0;i<connections.length;i++){
		var connection = connections[i];
		output.connections.push([connection.from.id, connection.to.id]);
	}

	// Return the string.
	return JSON.stringify(output);

}

function UnserializeNeurons(string){

	// Prepare input
	var input = JSON.parse(string);

	// Create neurons
	for(var i=0;i<input.neurons.length;i++){
		var neuron = input.neurons[i];
		Neuron.add(neuron[0], neuron[1]);
	}

	// Create connections
	for(var i=0;i<input.connections.length;i++){
		var connection = input.connections[i];
		Connection.add(neurons[connection[0]], neurons[connection[1]]);
	}

}