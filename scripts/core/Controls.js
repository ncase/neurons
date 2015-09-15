(function(){

//////////////////////
//// PLAY & PAUSE ////
//////////////////////

var play = document.getElementById("control_play");
play.onclick = function(){
	if(Interactive.PLAYING){
		Interactive.pause();
		play.setAttribute("playing","false");
	}else{
		Interactive.play();
		play.setAttribute("playing","true");
	}
};
subscribe("/mouse/down",function(){
	if(!Interactive.PLAYING){
		Interactive.play();
		play.setAttribute("playing","true");
	}
});

//////////////////////
/// VOLUME CONTROL ///
//////////////////////

var volumeIcon = document.getElementById("control_volume");
var volumeSlider = document.getElementById("control_volume_slider");

var _lastVolume = 1;
volumeIcon.onclick = function(){

	// Edge Case - muting when already muted
	if(!createjs.Sound.muted && createjs.Sound.volume==0){
		_lastVolume = 1;
		createjs.Sound.volume = volumeSlider.value = 1;
		_updateVolumeIcon();
		return;
	}

	// Otherwise, toggle between mute & last volume.
	createjs.Sound.muted = !createjs.Sound.muted;
	if(createjs.Sound.muted){
		_lastVolume = volumeSlider.value;
		volumeSlider.value = 0;
	}else{
		createjs.Sound.volume = volumeSlider.value = _lastVolume;
	}
	_updateVolumeIcon();

};

volumeSlider.oninput = function(){
	createjs.Sound.muted = false;
	createjs.Sound.volume = volumeSlider.value;
	_updateVolumeIcon();
};

var _updateVolumeIcon = function(){
	var state = 0;
	if(createjs.Sound.muted || createjs.Sound.volume==0){
		state = 0;
	}else{
		state = Math.ceil(createjs.Sound.volume*3);
	}
	state = 3-state;
	volumeIcon.style.backgroundPosition = (-state*47)+"px 0px";
};



//////////////////////
//// CAPTIONS, YO ////
//////////////////////

var captionsSelect = document.getElementById("control_captions_select");

// Populate List. Also, the default option.
var languageList = [{
	value: "",
	label: "None"
}];
for(var languageID in window.Captions){
	var language = Captions[languageID];
	languageList.push({
		value: languageID,
		label: language.label
	});
}
var html = "";
for(var i=0;i<languageList.length;i++){
	var language = languageList[i];
	html += '<option '+(language.value==CAPTION_LANGUAGE ? 'selected ' : '')+
					'value="'+language.value+'">'+
					language.label+
					'</option>';
	captionsSelect.innerHTML = html;
}

// When the language is changed...
captionsSelect.onchange = function(){
	CAPTION_LANGUAGE = captionsSelect.value;
};


})();