Narrator.addNarration({
	file: "4_credits",
	markers:{

		"cred0": ["0:00.0", "0:04.3"], // Hey, huge thanks to all my Patreon supporters, because without them,
		"cred1": ["0:04.3", "0:07.0"], // I wouldn't be able to make these weird interactive things,
		"cred2": ["0:07.0", "0:09.7"], // and I'd probably be forced to get a real job.
		"cred3": ["0:09.7", "0:12.1"], // So if you'd like to help me keep making stuff like this,
		"cred4": ["0:12.1", "0:14.3"], // and be credited in the next thing I make,
		"cred5": ["0:14.3", "0:15.5"], // check out my Patreon!

		"cred6": ["0:17.0", "0:20.0"], // The music you're listening to was made by the wonderful Phyrnna,
		"cred7": ["0:20.0", "0:23.6"], // who I've collaborated with before on two projects I failed to finish.

		"cred8": ["0:25.0", "0:28.7"], // For another interactive explanation, check out Parable of the Polygons!
		"cred9": ["0:28.7", "0:31.7"], // It was a collaboration I did with Vi Hart -- yes, *that* Vi Hart! :D --
		"cred10": ["0:31.7", "0:34.1"], // about systemic bias and diversity.

		"cred11": ["0:35.0", "0:39.4"], // And remember, this interactive explanation was just an introduction.
		"cred12": ["0:39.4", "0:42.7"], // So if you wanna learn more, *definitely* check out the further reading
		"cred13": ["0:42.7", "0:43.8"], // in the description below. 

		"cred14": ["0:44.0", "0:46.5"], // Ooooooorrrrrrrr you could just play with the sandbox on the left
		"cred15": ["0:46.5", "0:47.4"], // because it's pretty fun.

		"cred16": ["0:50.0", "0:53.5"], // Either way, thank you so so much for watching.
		"cred17": ["0:53.5", "0:54.2"], // 
		"cred18": ["0:54.2", "0:55.7"], // um, playing?... watching?
		"cred19": ["0:55.7", "0:56.5"], // 
		"cred20": ["0:56.5", "0:57.3"], // plotching.
		"cred21": ["0:57.3", "0:59.2"], // Thank you so so much for plotching.

		"breath": ["0:55.7", "0:56.1"], // 0.4 SECOND BREATH

	}
});

Narrator.addStates({

	CREDITS:{
		start:function(){
			//Narrator.music("sfx_loop",{volume:0.05,loop:-1})
			Narrator.scene("Credits")
					.talk("cred0","cred1","cred2")
					.message("/scene/nicky")
					.talk("cred3","cred4","cred5")
					.message("/scene/phyrnna")
					.talk("cred6","cred7")
					.message("/scene/potp")
					.talk("cred8","cred9","cred10","cred11","cred12","cred13")
					.talk("cred14","cred15","cred16","cred17","cred18","cred19")
					.talk("cred20","cred21");
		}
	}

});