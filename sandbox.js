//////////////////////////////////
// CREATE NEURONS & CONNECTIONS //
//////////////////////////////////

function addNeuron(id){
	var neuron = new Neuron();
	Neuron[id] = neuron;
	neuron.id = id;
	neuron.x = 100+760*Math.random();
	neuron.y = 50+450*Math.random();
	neuron.scale = 0.75;
	neuron.icon = images["icon_"+id];
	neuron.clickable = true;
	neuron.hebbSignalDuration = 3.5;
	neurons.push(neuron);
}

function connectNeurons(from,to,curve){
	var connection = new Connection();
	
	connection.speed = 10;
	connection.lineWidth = 5;
	connection.pulseRadius = 10;
	connection.endDistance = 50;
	connection.strokeStyle = "#D8D8D8";
	connection.curve = 100;

	connection.connect(from,to);
	connections.push(connection);

	return connection;
}

function createBrain(ox,oy){
	ox = ox || 0;
	oy = oy || 0;

	// NEURONS
	addNeuron("social1", 475+ox, 130+oy);
	addNeuron("social2", 580+ox, 130+oy);
	addNeuron("social3", 685+ox, 130+oy);
	addNeuron("interaction", 580+ox, 250+oy);
	addNeuron("anxiety", 580+ox, 385+oy);

	// CONNECTIONS
	for(var i=0;i<neurons.length-1;i++){
		for(var j=i+1;j<neurons.length;j++){
			var from = neurons[i];
			var to = neurons[j];
			var connection = connectNeurons(from,to);
			connection.strength = 0.5;
			var connection = connectNeurons(to,from);
			connection.strength = 0.5;
		}
	}

}

loadImages([
	
	{id:"neuron_grab", src:"assets/sprites/grabby.png"},
	{id:"neuron_body", src:"assets/sprites/body_lighter.png"},
	{id:"neuron_highlight", src:"assets/sprites/body_highlight.png"}

]);

function reset(){

	// BLOOP
	window.neurons = [];
	window.connections = [];
	window.sprites = [];
	window.words = [];
	window.wires = [];

	createBrain(0,-10);

};

subscribe("/init",reset);