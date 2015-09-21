Narrator.addNarration({
	file: "2_antihebb",
	markers:{
		
		"anti0": ["0:00.0", "0:04.0"], // Anyway, if that's how we learn, here's how we un-learn.
		
		"anti1": ["0:06.2", "0:08.0"], // ANTI-HEBBIAN LEARNING
		"anti2": ["0:10.4", "0:13.5"], // Neurons that fire out of sync, lose their link.
		
		"anti3": ["0:15.1", "0:17.4"], // Another rule of thumb neuroscientists have!

		"anti4": ["0:20.5", "0:25.0"], // So - if you already have a connection from one neuron to another,
		"anti5": ["0:25.0", "0:29.0"], // and you fire the first neuron WITHOUT firing the second neuron,
		"anti6": ["0:29.0", "0:31.0"], // the connection weakens.
		"anti7": ["0:31.5", "0:32.8"], // Again, try it out!

		"anti8": ["0:35.2", "0:37.4"], // That neuron didn't have any connections.
		"anti9": ["0:37.4", "0:39.1"], // You need to find one that's connected.
		"anti10": ["0:40.1", "0:45.0"], // Ah, so that neuron only has connections going TO it, but not FROM it.
		"anti11": ["0:45.0", "0:48.0"], // You need to find one that has connections FROM it.

		"anti12": ["0:50.0", "0:51.0"], // Now wait for it...
		"anti13": ["0:52.0", "0:54.0"], // And look! The connection's weaker.
		"anti14": ["0:54.0", "0:57.8"], // Do that again, and this time, the connection will be totally killed.

		"anti15": ["1:00.0", "1:04.5"], // And this unlearning rule is why, if you have a fear of dogs,
		"anti16": ["1:04.5", "1:07.5"], // and you're exposed to friendly dogs over and over again,
		"anti17": ["1:07.5", "1:09.2"], // you might unlearn that fear.
		"anti18": ["1:09.2", "1:14.0"], // "Dog" neuron gets fired, WITHOUT the "pain" neuron getting fired,
		"anti19": ["1:14.0", "1:16.8"], // and therefore - the connection weakens.

	}
});

Narrator.addStates({
	
	ANTIHEBB: {
		start:function(state){
			Narrator.talk("anti0")
					.message("/scene/addAntiHebb")
					.talk("anti1","anti3","anti4","anti5","anti6")
					.goto("ANTIHEBB_TRY_1");
		}
	},

	// 
	ANTIHEBB_TRY_1:{
		start:function(state){

			Narrator.talk("anti7");

			state._saidError1 = false;
			state._saidError2 = false;

			state._listener = subscribe("/neuron/click",function(neuron){

				// No connections
				if(neuron.senders.length==0 && neuron.receivers.length==0){
					if(!state._saidError1){
						state._saidError1 = true;
						Narrator.talk("anti8","anti9");
					}
					return;
				}

				// Connected TO but not FROM
				if(neuron.senders.length==0 && neuron.receivers.length>0){
					if(!state._saidError2){
						state._saidError2 = true;
						Narrator.talk("anti10","anti11");
					}
					return;
				}

				// WAIT FOR IT
				unsubscribe(state._listener);
				Narrator.goto("ANTIHEBB_WAIT");
				Narrator._GLOBAL_.antiHebbNeuron = neuron;

			});

		},
		kill:function(state){
			unsubscribe(state._listener);
		}
	},

	ANTIHEBB_WAIT:{
		start:function(state){
			Narrator.talk("anti12");
			state._listener = subscribe("/neuron/weakenHebb",function(){
				unsubscribe(state._listener);
				Narrator.talk("anti13").goto("ANTIHEBB_WAIT_2");
			});
		}
	},

	// Just a decider state
	ANTIHEBB_WAIT_2:{
		start:function(state){
			if(Narrator._GLOBAL_.antiHebbNeuron.senders.length>0){
				Narrator.goto("ANTIHEBB_TRY_2");
			}else{
				Narrator.goto("ANTIHEBB_EXPLAIN");
			}
		}
	},

	// Just wait til that neuron has no more senders
	ANTIHEBB_TRY_2:{
		start:function(state){
			state._STAHP = false;
			Narrator.talk("anti14");
		},
		during:function(state){
			if(!state._STAHP && Narrator._GLOBAL_.antiHebbNeuron.senders.length==0){
				state._STAHP = true;
				Narrator.goto("ANTIHEBB_EXPLAIN");
			}
		}
	},

	ANTIHEBB_EXPLAIN:{
		start:function(state){
			Narrator.talk("anti15","anti16","anti17","anti18","anti19").goto("THERAPY");
		}
	}

});
