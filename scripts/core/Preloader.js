window.images = {};

window.Preload = function(manifest){

	var images = manifest.images;
	var sounds = manifest.sounds;

	// When all's loaded, call the callback.
	var _assetsTotal = images.length + sounds.length;
	var _assetsLeft = 0;
	var onAssetLoad = function(){
		_assetsLeft--;

		// Percent loaded
		var ratio = (_assetsTotal-_assetsLeft)/_assetsTotal;
		publish("/load",[ratio]);

		// DUN LOADING
		if(_assetsLeft==0){
			setTimeout(function(){
				publish("/init");
			},500);
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