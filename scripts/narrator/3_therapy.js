Narrator.addNarration({
	file: "3_therapy",
	markers:{

		"ther0": ["0:00.0", "0:04.8"], // So now that you know how we learn & unlearn, let's revisit...
		"ther1": ["0:04.8", "0:06.0"], // ...this.

		"ther2": ["0:12.3", "0:15.5"], // I want you to re-train this brain.
		"ther3": ["0:15.5", "0:18.8"], // Rewire, reconnect each of these three things,
		"ther4": ["0:18.8", "0:22.7"], // from feeling fear, to feeling safe.

		"ther5": ["0:25.1", "0:29.0"], // See, rewiring yourself may cause anxiety in the short term...
		"ther6": ["0:30.1", "0:33.3"], // ...but it is SO worth it in the long term.

		"ther7": ["0:35.1", "0:36.5"], // One down, two more to go.
		"ther8": ["0:37.1", "0:38.8"], // Two down, one more to go.
		"ther9": ["0:40.1", "0:42.2"], // I. STILL. DON'T. LIKE. HOLES.

		"ther10": ["0:44.0", "0:45.6"], // And... you did it!

		"ther11": ["0:45.6", "0:48.7"], // What you just did is called 'exposure therapy'.
		"ther12": ["0:48.7", "0:52.0"], // It's one of the most evidence-backed therapies out there
		"ther13": ["0:52.0", "0:57.5"], // for treating specific phobias, PTSD, and other anxiety disorders.

		"outro0": ["0:59.0", "1:05.0"], // Again, in real life, rewiring yourself is not easy, it's not quick,
		"outro1": ["1:05.0", "1:07.0"], // but it can be done.
		"outro2": ["1:10.9", "1:13.5"], // I promise you -- I'm proof --
		"outro3": ["1:13.5", "1:15.5"], // It can be done.

	}
});

// Get rid of this, maybe? It's not immediately obvious how this is related to exposure therapy.
// Or, do a conciser recording: face your fears, but in a SAFE SPACE.
// Ugh I hate voice recording we gon' have to do it agaaaaaaaaaaaain.
// At first, "thing" then "fear". Expose self to "thing" then "safe".


Narrator.addStates({

	THERAPY:{
		start:function(state){
			Narrator.talk("ther0")
					.scene("Therapy")
					.goto("THERAPY_DO_IT");
		}
	},

	THERAPY_DO_IT:{
		start:function(state){
			Narrator.talk("ther1","ther2","ther3","ther4");

			state._listeners = {};
			state._numRewired = 0;

			// HOLES.
			state._listeners.holes = subscribe("/neuron/click",function(neuron){
				if(neuron.name=="holes"){
					unsubscribe(state._listeners.holes);
					Narrator.talk("ther9");
				}
			});

		},
		during:function(state){
			
			var scene = Interactive.scene;
			if(!scene.isRewired) return; // NOT THE RIGHT SCENE YET. TRANSITIONS.
			
			// How many are rewired?
			var rewired = 0;
			if(scene.isRewired("failure")) rewired++;
			if(scene.isRewired("social")) rewired++;
			if(scene.isRewired("holes")) rewired++;

			if(rewired>state._numRewired){
				state._numRewired++;
				if(state._numRewired==1){
					Narrator.talk("ther7");
				}
				if(state._numRewired==2){
					Narrator.talk("ther8");
				}
				if(state._numRewired==3){
					Narrator.goto("THERAPY_SUCCESS");
				}
			}

		},
		kill:function(state){
			for(var listener in state._listeners){
				unsubscribe(state._listeners[listener]);
			}
		}
	},

	THERAPY_SUCCESS:{
		start:function(){
			Narrator.message("/scene/celebrate")
					.talk("ther10","extra6","extra7","ther11","ther12","ther13","extra8")
					.goto("OUTRO");
		}
	},

	OUTRO:{
		start:function(){
			Narrator.scene("Outro")
					.talk("outro0","outro1","outro2")
					.scene("Blank")
					.talk("outro3")
					.wait(1.0)
					.goto("CREDITS");
		}
	}

});