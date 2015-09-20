/********************

How it works:
- Audio track with markers on start & end
- Queueing the tracks & functions up.
- Logic for finite states.
- Also, controls Interactive, the Scene Manager.

Narrator.init({
	file: "what_it_was_in_SoundJS",
	markers:{
		"1": [start,end],
		"1.1": [start,end], // for impromptu insertions
		"2": [start,end],
		. . .
		"10": [start,end]
	}
});

Narrator.setStates({

	INTRO:{
		start:function(){},
		during:function(){},
	},

	...

});

********************/

window.Narrator = new (function(){

	var self = this;

	// Properties
	self.voices = {};
	self.states = {};
	self.currentState = null;
	self.currentPromise = null;
	self.soundInstances = [];
	self._GLOBAL_ = {}; // global vars for when I give up on life.

	// Configuration
	self.addNarration = function(voiceConfig){

		// Convert all timestamps to MILLISECONDS.
		var _helper = function(input){
			if(typeof input==="number"){
				return input*1000; // to milliseconds
			}
			if(typeof input==="string"){
				var time = input.split(":");
				var minutes = parseInt(time[0]);
				var seconds = parseFloat(time[1]);
				var time = minutes*60 + seconds;
				return time*1000; // to milliseconds
			}
			alert("I MESSED UP");
		};

		// For each marker
		for(var markerID in voiceConfig.markers){
			var interval = voiceConfig.markers[markerID];
			var voice = [voiceConfig.file, _helper(interval[0]), _helper(interval[1])];
			self.voices[markerID] = voice;
		}

	};
	self.addStates = function(statesConfig){

		// Add a placeholder start/during/kill, for simplicity
		for(var stateID in statesConfig){
			var state = statesConfig[stateID];
			state.start = state.start || function(){}; 
			state.during = state.during || function(){};
			state.kill = state.kill || function(){};
			self.states[stateID] = state;
		}

	};

	// CHAINING
	var _chain = function(callback){
		if(self.currentPromise){
			self.currentPromise = self.currentPromise.then(callback);
		}else{
			self.currentPromise = callback();
		}
	};
	self.do = function(func){
		_chain(function(){
			var p = new promise.Promise();
			func();
			p.done();
			return p;
		});
		return self;
	};

	// INTERRUPT TALKING
	self.interrupt = function(){

		// No more promises
		self.currentPromise = null;

		// Kill all VOICE sound instances
		for(var i=0;i<self.soundInstances.length;i++){
			var soundInstance = self.soundInstances[i];
			if(soundInstance._TYPE_=="voice"){
				soundInstance.stop();
				self.soundInstances.splice(i,1);
				i--;
			}
		}

		return self;

	};

	// STATES
	self.goto = function(stateName){
		return self.do(function(){
			if(self.currentState) self.currentState.kill(self.currentState);
			self.currentState = self.states[stateName];
			self.currentState.start(self.currentState);
		});
	};

	// SCENES
	self.scene = function(sceneName){
		return self.do(function(){
			Interactive.transitionTo(window["Scene_"+sceneName]);
		});
	};

	// MESSAGING
	self.message = function(message){
		return self.do(function(){
			publish(message);
		});
	};

	// PAUSE/PLAY ALL
	self.pause = function(){
		for(var i=0;i<self.soundInstances.length;i++){
			self.soundInstances[i].paused = true;
		}
	};
	self.play = function(){
		for(var i=0;i<self.soundInstances.length;i++){
			self.soundInstances[i].paused = false;
		}
	};

	// MUSIC
	self.music = function(musicID,options){
		return self.do(function(){
			var soundInstance = createjs.Sound.play(musicID,options);
			soundInstance._TYPE_ = "music";
			self.soundInstances.push(soundInstance);
			// TO DO: KILL OTHER MUSIC?!
		});
	};

	// WAIT
	self.wait = function(duration){
		_chain(function(){
			var p = new promise.Promise();
			setTimeout(function(){ p.done(); },duration*1000);
			return p;
		});
		return self;	
	};

	// UPDATE 
	self.captionsDOM = document.getElementById("captions");
	self.captionsText = document.querySelector("#captions > span");
	self.update = function(){

		// During!
		if(self.currentState){
			self.currentState.during(self.currentState);
		}

		// Currently chosen language.
		var chosenLanguageID = CAPTION_LANGUAGE;

		// If language is "", that means None.
		if(chosenLanguageID==""){
			self.hideCaption();
			return;
		}

		// Otherwise, find the currently playing voice clip.
		// If none, no captions.
		var markerID = null;
		for(var i=0;i<self.soundInstances.length;i++){
			var soundInstance = self.soundInstances[i];
			if(soundInstance._TYPE_=="voice"){
				markerID = soundInstance._MARKER_ID_;
				break;
			}
		}
		if(!markerID){
			self.hideCaption();
			return;
		}

		// But if there is, show that caption! (and if not, hiiiide it)
		var caption = Captions[chosenLanguageID].captions[markerID];
		if(caption && caption!=""){
			self.showCaption(caption);
		}else{
			self.hideCaption();
		}

	};
	self.showCaption = function(caption){
		self.captionsText.textContent = caption;
		self.captionsText.innerText = caption;
		self.captionsDOM.style.display = "block";
	};
	self.hideCaption = function(caption){
		self.captionsDOM.style.display = "none";
	};

	// TALKING
	self.talk = function(/*marker_1, marker_2, ... marker_N*/){

		for(var i=0;i<arguments.length;i++){

			(function(markerID){
				_chain(function(){
					
					var p = new promise.Promise();

					var marker = self.voices[markerID];
					var soundInstance = createjs.Sound.play(marker[0],{
						startTime: marker[1],
						duration: marker[2]-marker[1]
					});
					soundInstance._TYPE_ = "voice";
					soundInstance._MARKER_ID_ = markerID;
					self.soundInstances.push(soundInstance);

					soundInstance.on("complete", function(){
						var index = self.soundInstances.indexOf(soundInstance);
						if(index>=0) self.soundInstances.splice(index,1);
						p.done();
					});

					return p;

				});
			})(arguments[i]);

		}

		return self;

	};

})();