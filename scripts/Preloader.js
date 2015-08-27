window.images = {};
function loadImages(imageConfigs){

	// When all's loaded, call the callback.
	var _assetsLeft = 0;
	var onAssetLoad = function(){
		_assetsLeft--;
		if(_assetsLeft==0){
			publish("/init");
		}
	}

	// Load images
	for(var i=0;i<imageConfigs.length;i++){
		var conf = imageConfigs[i];
		_assetsLeft++;
		var img = new Image();
		window.images[conf.id] = img;
		img.onload = onAssetLoad;
		img.src = conf.src;
	}

}