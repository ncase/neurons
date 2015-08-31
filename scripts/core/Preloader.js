window.images = {};

window.Preload = function(manifest){

	var images = manifest.images;
	var sounds = manifest.sounds;

	// When all's loaded, call the callback.
	var _assetsLeft = 0;
	var onAssetLoad = function(){
		_assetsLeft--;
		if(_assetsLeft==0){
			publish("/init");
		}
	}

	// Load images
	for(var i=0;i<images.length;i++){
		var conf = images[i];
		_assetsLeft++;
		var img = new Image();
		window.images[conf.id] = img;
		img.onload = onAssetLoad;
		img.src = conf.src;
	}

	// Load sounds
	for(var i=0;i<sounds.length;i++){
		var conf = sounds[i];
		_assetsLeft++;
		createjs.Sound.addEventListener("fileload", onAssetLoad);
		createjs.Sound.registerSound(conf);
	}

};