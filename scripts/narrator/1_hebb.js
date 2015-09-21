Narrator.addNarration({
	file: "1_hebb",
	markers:{
		
		"hebb0": ["0:00.0", "0:01.2"], // [wuss sounds]
		"hebb1": ["0:01.2", "0:04.5"], // Anyway... how do we learn these fears in the first place?
		"hebb2": ["0:06.0", "0:09.0"], // Well, to explain that, let me get rid of all *this*...
		"hebb3": ["0:09.0", "0:10.5"], // and give you...
		"hebb4": ["0:10.5", "0:11.5"], // *this*!

		"hebb5": ["0:13.0", "0:14.8"], // Hebbian Learning.
		"hebb6": ["0:16.0", "0:19.0"], // “Neurons that fire together, wire together.”

		"hebb7": ["0:20.0", "0:22.7"], // This is a rule of thumb neuroscientists use to describe
		"hebb8": ["0:22.7", "0:24.6"], // how neurons make new connections
		"hebb9": ["0:24.6", "0:28.0"], // Basically, if you fire one neuron, then fire another neuron,
		"hebb10": ["0:28.0", "0:30.7"], // the first neuron will connect TO the second neuron.
		"hebb11": ["0:30.7", "0:31.8"], // Try it out for yourself!

		"hebb12": ["0:34.0", "0:37.0"], // Too slow! You didn't click fast enough. Try again?
		"hebb13": ["0:40.0", "0:42.5"], // Not close enough. Try a different pair of neurons.

		"hebb14": ["0:45.0", "0:46.9"], // And that's how we learn!
		"hebb15": ["0:46.9", "0:49.1"], // Of course, we don't learn that quickly in real life,
		"hebb16": ["0:49.1", "0:52.3"], // I sped the simulation up, eh, but still.
		"hebb17": ["0:52.3", "0:54.3"], // Now play around, make a few more connections,
		"hebb18": ["0:54.3", "0:56.0"], // maybe make a chain or something.

		"hebb19": ["1:00.0", "1:03.9"], // This learning rule is why, if you were bitten by a dog as a kid,
		"hebb20": ["1:03.9", "1:05.5"], // you might develop a fear of dogs!
		"hebb21": ["1:05.5", "1:09.9"], // Because your "dog" neuron fired, then your "pain" neuron fired.
		"hebb22": ["1:09.9", "1:12.5"] // And thus, "dog" connected to "pain".

	}
});

Narrator.addStates({

	HEBBIAN:{
		start:function(state){
			Narrator.scene("Hebbian")
					.talk("hebb0","hebb1","hebb2")
					.message("/scene/removeConnections")
					.talk("hebb3")
					.message("/scene/addHebb")
					.talk("hebb4","hebb5","hebb7","hebb8","hebb9","hebb10")
					.goto("HEBBIAN_TRY_1");
		}
	},

	HEBBIAN_TRY_1:{
		start:function(state){

			var neurons = Interactive.scene.neurons;
			var connections = Interactive.scene.connections;

			Narrator.talk("hebb11");
			state._numConnections = connections.length;
			state._STAHP = false;
			
			// Too slow
			state._listener1 = subscribe("/neuron/weakenHebb",function(){
				if(state._STAHP) return;
				unsubscribe(state._listener1);
				Narrator.talk("hebb12");
			});

			// Not close enough - two hebbian flashes but NOT close enough
			state._listener2 = subscribe("/neuron/click",function(){
				if(state._STAHP) return;

				// Get first two hebby neurons
				var hebby = [];
				for(var i=0;i<neurons.length;i++){
					if(neurons[i].hebbian>0) hebby.push(neurons[i]);
				}

				// Are there at least two?
				if(hebby.length<2) return;

				// If so, are they close enough?
				var dx = hebby[0].x-hebby[1].x;
				var dy = hebby[0].y-hebby[1].y;
				var radius = hebby[0].hebbianRadius;
				if(dx*dx+dy*dy<radius*radius) return;

				// If not, WHOOPS
				unsubscribe(state._listener1); // also I don't wanna deal with this.
				unsubscribe(state._listener2);
				Narrator.talk("hebb13");

			});

		},
		during:function(state){

			if(state._STAHP) return;

			var connections = Interactive.scene.connections;

			if(connections.length > state._numConnections){
				state._STAHP = true;
				Narrator.goto("HEBBIAN_EXPLAIN_1");
			}else{
				// So it can adapt to DECREASES, somehow.
				state._numConnections = connections.length;
			}

		},
		kill:function(state){
			if(state._listener1) unsubscribe(state._listener1);
			if(state._listener2) unsubscribe(state._listener2);
		}
	},

	HEBBIAN_EXPLAIN_1:{
		start:function(state){
			Narrator.wait(0.5).talk("hebb14","hebb15","hebb16").goto("HEBBIAN_TRY_2");
		}
	},

	HEBBIAN_TRY_2:{
		start:function(state){
			state._STAHP = false;
			Narrator.talk("hebb17","hebb18");
			state._numConnections = Interactive.scene.connections.length;
		},
		during:function(state){
			if(!state._STAHP && Interactive.scene.connections.length>state._numConnections+3){ // make three more
				state._STAHP = true;
				Narrator.goto("HEBBIAN_EXPLAIN_2");
			}
		}
	},

	HEBBIAN_EXPLAIN_2:{
		start:function(state){
			Narrator.wait(1.0).talk("hebb19","hebb20","hebb21","hebb22").goto("ANTIHEBB");
		}
	}

});