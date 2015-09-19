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

			//////////////
			// MY FEARS //
			//////////////
			
			//////////////////////
			// HEBBIAN LEARNING //
			//////////////////////

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