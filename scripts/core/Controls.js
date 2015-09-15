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

})();