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

			"hebb0": "[sounds]",
			"hebb1": "Anyway... how do we learn these fears in the first place?",
			"hebb2": "Well, to explain that, let me get rid of all *this*...",
			"hebb3": "and give you...",
			"hebb4": "*this*!",

			"hebb5": "Hebbian Learning.",
			"hebb6": "“Neurons that fire together, wire together.”",

			"hebb7": "This is a rule of thumb that neuroscientists use to describe",
			"hebb8": "how neurons make new connections",
			"hebb9": "Basically, if you fire one neuron, then fire another neuron,",
			"hebb10": "the first neuron will connect TO the second neuron.",
			"hebb11": "Try it out for yourself!",

			"hebb12": "Too slow! You didn't click fast enough. Try again?",
			"hebb13": "Not close enough. Try a different pair of neurons.",

			"hebb14": "And that's how we learn!",
			"hebb15": "Of course, we don't learn that quickly in real life,",
			"hebb16": "I sped the simulation up, eh, but still.",
			"hebb17": "Now play around, make a few more connections,",
			"hebb18": "maybe make a chain or something.",

			"hebb19": "This learning rule is why, if you were bitten by a dog as a kid,",
			"hebb20": "you might develop a fear of dogs!",
			"hebb21": "Because your 'dog' neuron fired, then your 'pain' neuron fired.",
			"hebb22": "And thus, 'dog' connected to 'pain'.",

			///////////////////////////
			// ANTI-HEBBIAN LEARNING //
			///////////////////////////

			//////////////
			// MY FEARS //
			//////////////

			/////////////
			// THERAPY //
			/////////////

			/////////////
			// CREDITS //
			/////////////

			// at the very end, and STAY there...
			// [English captions by Nicky Case. Wanna help translate this? Details below!]
			
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