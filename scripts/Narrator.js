/********************

How it works:
- Audio track with markers on start & end
- Queueing the tracks & functions up.
- Logic for finite states.

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

Narrator.addState("Intro",{
	start:function(){
	},
	during:function(){
	},
});

********************/

window.Narrator = new (function(){

	var self = this;

	self.init = function(){
	};

	self.addStates = function(){
	};

})();