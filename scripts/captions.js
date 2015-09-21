/*///////////////////////////////////////

GUIDE TO ADDING TRANSLATED CAPTIONS:

1) Copy & paste the entire "en" section, as a starting template.

2) Change "en" to whatever your target language's two-letter code is. (e.g. "zh" for Chinese)
   Change "English" to whatever your target language's native name is. (e.g. "中文" for Chinese)

   Refer to this: https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes

3) Translate each line of English to your target language.
   
   For example:
   "intro0": "So, I always used to get anxiety.",
   becomes
   "intro0": "所以，我总是用得到的焦虑。",

   Note: ONLY translate the stuff on the right side of the ":".
   Also, don't forget to give yourself translator credit at the end! :D

4) Send me a push request on Github, and wait for me to get off my lazy bum,
   and upload your translation.

5) Yay! Now you can share your translation by adding ?lang=[two_letter_code] to the URL, like so:
   http://ncase.me/######?lang=zh

   PARTY HARD

///////////////////////////////////////*/

window.CAPTION_LANGUAGE = "en"; // Due to random accidents of history, English is the default.

window.Captions = {

	// English
	"en": {
		label: "English",
		captions: {

			//////////////////
			// INTRODUCTION //
			//////////////////

			"intro0": "So, I always used to get anxiety.",
			"intro1": "Then I would get anxiety ABOUT getting anxiety.",
			"intro2": "It was anxiety all the way down.",
			"intro3": "",

			/////////////////
			// PROPAGATION //
			/////////////////

			"prop0": "Hi, I'm Nicky Case,",
			"prop1": "and this is an interactive explanation about neurons.",
			"prop2": "Yup! You can actually interact with this,",
			"prop3": "♬ so why don't you try that thing ♬",
			"prop4": "and click on a neuron, and see what happens?",

			"prop5": "Ex-CUSE me, I was talking!... I'm just kidding.",

			"prop6": "Okay, wow, you're really into this, clicking EVERYTHING,",
			"prop7": "COOL. GOT IT. AWESOME.",

			"prop8": "Yeah!",
			"prop8.5": "Watch how the signals propagate down,",
			"prop9": "from neuron to neuron to neuron.",
			"prop10": "Try clicking some more.",

			"prop11": "Of course, this is a simplified model,",
			"prop12": "but that's roughly how neurons work.",
			"prop13": "One thought fires the next, and so on,",
			"prop14": "but... in the ANXIOUS brain...",

			"extra1": "Kind of mesmerizing, isn't it?",
			"extra2": "Anyway...",

			//////////////
			// MY FEARS //
			//////////////

			"fear0": "THIS is what happens.",
			"fear1": "Innocent thoughts connect to anxious thoughts.",
			"fear2": "Personally, I used to be so afraid of being seen as a failure,",
			"fear3": "of being close to people,",
			"fear4": "and of...",
			"fear5": "holes.",
			"fear6": "Coz... I don't know why, but tightly clustered holes",
			"fear7": "just kinda creep me out, y'know? I dunno.",
			
			//////////////////////
			// HEBBIAN LEARNING //
			//////////////////////

			"hebb0": "[SOUNDS]",
			"hebb1": "Anyway... how do we learn these fears in the first place?",
			"hebb2": "Well, to explain that, let me get rid of all this...",
			"hebb3": "and give you...",
			"hebb4": "this!",

			"hebb5": "Hebbian Learning.",
			"hebb6": "“Neurons that fire together, wire together.”",

			"hebb7": "This is a rule of thumb that neuroscientists use to describe how",
			"hebb8": "neurons make new connections.",
			"hebb9": "Basically, if you fire one neuron, then fire another neuron,",
			"hebb10": "the first neuron will connect TO the second neuron.",
			"hebb11": "Try it out for yourself!",

			"hebb12": "Too slow! You didn't click fast enough. Try again?",
			"hebb13": "Not close enough. Try a different pair of neurons.",

			"hebb14": "And that's how we learn!",
			"hebb15": "Of course, we don't learn that quickly in real life,",
			"hebb16": "I sped this simulation up, eh, but still.",
			"hebb17": "Now play around, make a few more connections,",
			"hebb18": "maybe make a chain or something.",

			"hebb19": "This learning rule is why, if you were bitten by a dog as a kid,",
			"hebb20": "you might develop a fear of dogs!",
			"hebb21": "Because your 'dog' neuron fired, then your 'pain' neuron fired.",
			"hebb22": "And thus, 'dog' connected to 'pain'.",

			///////////////////////////
			// ANTI-HEBBIAN LEARNING //
			///////////////////////////

			"anti0": "Anyway, if that's how we learn, here's how we un-learn.",
			
			"anti1": "Anti-Hebbian Learning!",
			"anti2": "“Neurons that fire out of sync, lose their link.”",
			
			"anti3": "Another rule of thumb neuroscientists have!",

			"anti4": "So - if you already have a connection from one neuron to another,",
			"anti5": "and you fire the first neuron WITHOUT firing the second neuron,",
			"anti6": "the connection weakens.",
			"anti7": "Again, try it out.",

			"anti8": "That neuron didn't have any connections.",
			"anti9": "You need to find one that's connected.",
			"anti10": "Ah, so that neuron only has connections going TO it, but not FROM it.",
			"anti11": "You need to find one that has connections FROM it.",

			"anti12": "Now wait for it...",
			"anti13": "And look! The connection's weaker.",
			"anti14": "Do that again, and this time, the connection will be totally killed.",

			"anti15": "And this unlearning rule is why, if you have a fear of dogs,",
			"anti16": "and you're exposed to friendly dogs over and over again,",
			"anti17": "you might unlearn that fear.",
			"anti18": "'Dog' neuron gets fired, WITHOUT the 'pain' neuron getting fired,",
			"anti19": "and therefore - the connection weakens.",

			/////////////
			// THERAPY //
			/////////////

			"ther0": "So now that you know how we learn & unlearn, let's revisit...",
			"ther1": "...this.",

			"ther2": "I want you to re-train this brain.",
			"ther3": "Rewire, reconnect each of these three things,",
			"ther4": "from feeling fear, to feeling safe.",

			"ther5": "See, rewiring yourself may cause anxiety in the short term...",
			"ther6": "...but it is SO worth it in the long term.",

			"ther7": "One down, two more to go.",
			"ther8": "Two down, one more to go.",
			"ther9": "i. still. don't. like. holes.",

			"ther10": "And... you did it!",

			"ther11": "What you just did is called 'exposure therapy'.",
			"ther12": "It's one of the most evidence-backed therapies out there",
			"ther13": "for treating specific phobias, PTSD, and other anxiety disorders.",

			///////////
			// OUTRO //
			///////////

			"outro0": "Again, in real life, rewiring yourself is not easy, it's not quick,",
			"outro1": "but it can be done.",
			"outro2": "I promise you -- I'm proof --",
			"outro3": "It can be done.",

			/////////////
			// CREDITS //
			/////////////

			"cred0": "Hey, huge thanks to all my Patreon supporters, because without them,",
			"cred1": "I wouldn't be able to make these weird interactive things,",
			"cred2": "and I'd probably be forced to get a real job.",
			"cred3": "So if you'd like to help me keep making stuff like this,",
			"cred4": "and be credited in the next thing I make,",
			"cred5": "check out my Patreon!",

			"cred6": "The music you're listening to was made by the wonderful Phyrnna,",
			"cred7": "who I've collaborated with before on two projects that I failed to finish.",

			"cred8": "For another interactive explanation, check out Parable of the Polygons!",
			"cred9": "It was a collaboration I did with Vi Hart -- yes, *that* Vi Hart! :D --",
			"cred10": "about systemic bias and diversity.",

			"cred11": "And remember, this interactive explanation was just an introduction.",
			"cred12": "So if you wanna learn more, *definitely* check out the further reading",
			"cred13": "in the description below. ",

			"cred14": "Orrrrr you could just play with the sandbox on the left",
			"cred15": "because it's pretty fun.",

			"cred16": "Either way, thank you so, so much for watching.",
			"cred17": "",
			"cred18": "um, playing?... watching?",
			"cred19": "",
			"cred20": "plotching.",
			"cred21": "Thank you so much for plotching.",

			//////////////////
			// EXTRA SHTUFF //
			//////////////////

			"blah": "blah blah blah blah blah blah blah",
			"captions": "[English captions by Nicky Case. Wanna help translate this? Details below!]"
			
		}
	},

	// Derp - Just here to test captions.
	// Oh my god, do NOT push this to production.
	/*"derp": {
		label: "Derp",
		captions: {
			
			"intro0": "殠 濞濢 垥娀庣 樛槷殦,",
			"intro1": "ووووووويتّفق قُدُماً باستحداث",
			"intro2": "herp derp herpy derp",

		}
	}*/

};