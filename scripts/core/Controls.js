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

})();