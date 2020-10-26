Repository:
	Student: Samuel Jac.
	Repo name: JacuCSE4050


This README file will be used to log changes I have made to this Repo for every report, in addition to each email.

Report 1 Progress: Figured out how to ssh into github and created this remote repository.
	- Watched Lecture 1a and 1b videos on last year's 405 course GitHub
	- Watched Git's 4 reference videos here: https://git-scm.com/videos
	- Installed git onto my windows machine and created a local repository
	- Followed ssh tutorials on how to remotly connect to Github through the terminal
		https://kbroman.org/github_tutorial/pages/first_time.html
		https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh
	- Created reposity on GitHub and pushed this README.txt file onto it.

	- Read over html documentation and a "getting started guide" to begin playing with html
		https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started
	- Uploaded an image of a cat for use in my first html test
	- Created a file: HTML_Experiments/first-html-test.html
		-shows usage of a generic html file set-up, usage of heading and text manipulation elements, and a image based link to a youtube page.

-------------------------------------------------------------------------------------------------------------------------------

Report 2 Progress: Created a couple of css examples and a basic javascript example and uploaded to github.
	-Read some more html documents on the MDM website about text formatting and the basic sctructure of a website
		https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals
		https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure
	-Read through two guides around CSS and looked over some example code in their provided examples.
		https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/Getting_started
		https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_is_structured
	-Created 4 new files:
		folder CSS_Experiments: "my-first-css-test.html"  and "style1.css"
					"website-example.html"    and "test-site-style.css"

		my-first-css-test.html and style1.css shows first basic use of css on an html page, changing the background color and text color, and creating a box surrounding text.
		website-example.html and website-example.html shows a very basic skeleton of a website, including first use of a navigation bar element and a footer element.
		*NOTE: html and css files should be in the same directory to find eachother

	-Read through two beginner guides on JavaScript and applying them to an html page:
		https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript
		https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/A_first_splash
	-Created 3 new files:
		folder JavaScript_Experiments:	first-javascript-test.html
						generic-style.css
						test1-script.js

		generic-style.css will be the css file I continue to use moving forward, and will I will expand it as nessesary as I continue making further into Web Development.
		first-javascript-test.html and test1-script.js work together to make a first basic JavaScript test, asking for the user's name and will then print it out onto the page underneath.
		*NOTE: html, css, and javascrtipy files should be in the same directory to find eachother
	-pushed everything onto my github repo.
--------------------------------------------------------------------------------------------------------------------------------
Report 3 Progress: Continued reading about Javascript, and how it can be used to interact with html.
		   ((As well as learned a little more about structuring html to work with JavaScript))
	-Read the javascript.info to get a feeling for how clsoe javascript is to other languages such as c++, C#, or Java.
		https://javascript.info/
	-After reading a little more about JavaScript, I then followed a tutorial on the guides I've used previously to learn the basics of html, css, and JavaScript
		https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/A_first_splash
	
	-From the tutorial, I re-wrote and split all the code into three files in my JavaScript_Experiments folder:
		-the-guessing-game.html
		-guessing-game-script.js
		-generic-guessing-game.css

	-After re-writing, commenting, and running the html game, I began to restructure the game for additional changes I wanted to make:
		-I had the game print out what the number was to the player, apon losing the game.
		-I polished the formatting of the previous guess list, having it put commas after each attempted guess.
		-Added ability for player to specify range of numbers generated, as well as how many turns they should be allowed to have
			-For the ranges, player cannot select a lower range higher than max range, and player cannot select a max range smaller than lower range
--------------------------------------------------------------------------------------------------------------------------------
Report 4 Progress: Playing with JSON and Firebase Hosting  (Possibly began work on Webapp1)
	-Read the javascript.info to read about how to use JSON.stringify() and JSON.parse()
		https://javascript.info/
	-Created two new files in my JavaScript_Experiments folder:
		-json-example.html
		-json-testing.js
		-a runnable version of this expeirment can be found here: https://jacu-cse4050-firebase.firebaseapp.com/JavaScript_Experiments/json-example.html
		

	-Watched and followed the first three videos of a tutorial on firebase hosting and how to desploy my first website
		-https://www.youtube.com/watch?v=mmmaeHBCTOw&list=PL4cUxeGkcC9he0kHAyiyr3dDO2xw0NWoP&ab_channel=TheNetNinja
	-Created project on firebase, installed node.js and firebase tools onto computer, and initialized my first firebase project.
	-Based on website-example.html in my css experiment, I created the following new index files:
		-index.html in my 			root-Folder
		-copy of my generic-style.css into my 	root folder
		-css-index.html in my 			CSS_Experiments Folder
		-copied my generic-style.css into my 	CSS_Experiments Folder
		-javascript-index.html in my 		JavaScript_Experiments folder
		-copied my generic-style.css into my 	JavaScript_Experiments Folder

	-On each html page, new and old, I extensivly added new navigation bars and added my firebase header chunk to include all firebase .js SDK packages.
		-Essentially, the firebase hosting is now a working showcase of all the work I have so far done in the course, and I will utilize the hosted page as a third form of report to show the working examples.  Files will continue to be pushed to git repository

	-pushed all new file changes to my github, and deployed all work and files onto my firebase website.
---------------------------------------------------------------------------------------------------------------------------------
Report 4 Progress: Firebase Auth and Cloud Firestore  (Possibly began work on Webapp1)
	-followed two tutorial playlists indepth, both can be found here:
		https://www.youtube.com/watch?v=4d-gIPGzmK4&list=PL4cUxeGkcC9itfjle0ji1xOZ2cjRGY_WB&ab_channel=TheNetNinja
		https://www.youtube.com/watch?v=aN1LnNq4z54&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ&ab_channel=TheNetNinja
	-Created three new files in my new Firebase_Experiments folder:
		-leave-a-message.html
		-generic-messages.css
		-messenger.js
	-Read more guides on html and javascript in order to add a little bit more functionality to my chat application.
	-This is a basic online chat application, where people can leave messages for one another.  Functionality for deleting sent messages have not been added yet.
	
	-uploaded new files to github and deployed to my firebase project