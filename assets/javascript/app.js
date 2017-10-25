// pseudocode
// 1) user clicks the start button to begin the game - DONE
// 2) game begins, a question is selected and displayed on the
//    DOM, the answer choices for that question are displayed,
//    and a timer set to 20 seconds begins to countdown - DONE
// 3) user will click on an answer choice - DONE
// 4) if answer is incorrect OR if timer hits 0, timer stops,
//    question/answers disappear, the word "nope" is displayed,
//    (displays "out of time" if timer reaches 0 seconds), then 
//    the correct answer is displayed, and an image/gif of answer 
//    appears. this page is displayed for 4 seconds, then 
//    loads the next question/answer choices & resets timer - DONE
// 5) if answer is correct, timer stops, question/answers 
//    disappear, the word "correct" is displayed, and an image
//    or gif of the correct answer is displayed. this page is 
//    displayed for 4 seconds, then loads the next question/answer
//    choices & resets timer - DONE
// 6) once all questions have been presented/answered, 
//    display "all done, here's how you did", and display the 
//    stats to the user. stats include: #incorrect answers,
//    # correct answers, #unanswered. also include a 'start over?'
//    option that if user clicks, the game resets to the first
//    question. when start over is clicked, the website does not
//    reload - we just reset the game back to beginning
// ===============================================================

// wait for doc to load
$("#start-button").on("click", function () {

	var triviaGame = {
		// array of questions
		questions: [
			"Lambeau Field is the home field of which National Football League team?", 
			"Who's nickname is Dr. J?", 
			"What is the most common pitch thrown by pitchers in baseball?",
			"Which of these teams is not one of the original six NHL teams?",
			"What is the term for shooting three strokes under par on a hole in golf?",
			"Which tennis player has won the most men's Grand Slam titles?",
			"Which nation has won the most soccer world cups?",
			"Who is the only athlete to ever play in a Super Bowl and a World Series?",
			"Which NHL goaltender possesses the all-time wins record?",
			"Who has the most blocked shots in NBA history?"
		],
		// array of answer choices. each index in this array is an array of 4 choices
		answerChoices: [
			["New York Jets", "Green Bay Packers", "San Francisco 49ers", "Miami Dolphins"],
			["Julius Erving", "Kareem Abdul-Jabbar", "Michael Jordan", "LeBron James"],
			["Curveball", "Slider", "Change-Up", "Fastball"],
			["Montreal Canadiens", "Detroit Red Wings", "Winnipeg Jets", "New York Rangers"],
			["Eagle", "Albatross", "Birdie", "Lucky"],
			["Pete Sampras", "Roger Federer", "Novak Djokovic", "Andre Agassi"],
			["Italy", "Argentina", "Germany", "Brazil"],
			["Deion Sanders", "Bo Jackson", "Brian Jordan", "Drew Henson"],
			["Terry Sawchuk", "Ed Belfour", "Martin Brodeur", "Patrick Roy"],
			["Dikembe Mutombo", "Bill Russell", "Shaquille O'Neal", "Hakeem Olajuwon"]
		],
		// array of correct answers
		correctAnswers: [
			"Green Bay Packers", "Julius Erving", "Fastball", "Winnipeg Jets", "Albatross",
			"Roger Federer", "Brazil", "Deion Sanders", "Martin Brodeur", "Hakeem Olajuwon"
		],
		// array of gifs
		media: [
			"assets/images/packers.gif", "assets/images/drj.gif", "assets/images/fastball.gif",
			"assets/images/slapshot.gif", "assets/images/happygilmore.gif",
			"assets/images/federer.gif", "assets/images/brazil.gif", "assets/images/sanders.gif",
			"assets/images/brodeur.gif", "assets/images/olajuwon.gif",
		],
		// empty round counter
		round: "",
		// next 3 are stats
		totalCorrect: 0,
		totalIncorrect: 0,
		totalUnanswered: 0,
		// initializing timer
		timeLeft: "",
		// initializing interval id
		intervalId: "",
		// shorthand creating properties for jquery
		elements: {
			writeTimer: $("#timer"),
			writeQuestion: $("#question"),
			writeAnswers: $("#answer-choices"),
			writeResult: $("#result"),
			writeCorrectAnswer: $("#correct-answer"),
			writeMedia: $("#images"),
			funnyGif: $("<img>"),
			writeStats: $("#stats"),
			writeStartOver: $("#restart-button"),
			clearStartButton: $("#start-button"),
		},
		// function to run timer
		runTimer: function() {
			// 10 secs to answer q
			this.timeLeft = 2;
			// writing initial time remaining to DOM
			this.elements.writeTimer.html("<h3>Time Remaining: " + this.timeLeft + "</h3>");
			// interval will be decremented every second from the decrement function
			this.intervalId = setInterval(this.decrement, 1000);
		},
		// funtion to decrement timer/write new time to DOM every second
		// if statement includes logic as to what happens if timer runs to 0
		decrement: function() {
			// decrease time left by 1
			triviaGame.timeLeft--;
			// every time decreased, write new timeleft to DOM
			triviaGame.elements.writeTimer.html("<h3>Time Remaining: " + triviaGame.timeLeft +
				"</h3>");
			// if user runs out of time
			if (triviaGame.timeLeft === 0) {
				// stop timer
				triviaGame.stopTimer();
				// clear the q and as divs
				triviaGame.elements.writeAnswers.empty();
				triviaGame.elements.writeQuestion.empty();
				// write time's up
				triviaGame.elements.writeResult.html("<h3>Time's Up!</h3>");
				// write correct answer
				triviaGame.elements.writeCorrectAnswer.html("<h4>The correct answer was: " 
					+ triviaGame.correctAnswers[triviaGame.round - 1]) + "</h4>";
				// display the associated image
				triviaGame.displayImage();
				// increase # unanswered by 1
				triviaGame.totalUnanswered++;
				// hold page for 5 seconds, then move to next round
				setTimeout(triviaGame.nextRound, 1000);					
			};
		},
		// function that stops the timer once it hits 0
		stopTimer: function() {
			clearInterval(triviaGame.intervalId);
		},
		// writes the question and answer from the current round to the DOM
		nextRound: function() {
			// if there's still more questions, then...
			if (triviaGame.round < triviaGame.questions.length) {
				// increase round by 1
				triviaGame.round++;
				// clear results, media, correct answer
				triviaGame.elements.writeResult.empty();
				triviaGame.elements.writeMedia.empty();
				triviaGame.elements.writeCorrectAnswer.empty();	
				// start timer
				triviaGame.runTimer();
				// write q
				triviaGame.elements.writeQuestion.html("<h3>" + 
					triviaGame.questions[triviaGame.round - 1] + "</h3>");
				// write a's, each receiving an h2 tag, an id which matches the value, and
				// appending each to the div
				for (var i = 0; i < triviaGame.answerChoices[triviaGame.round - 1].length; i++) {
					triviaGame.elements.writeAnswers.append("<h2 id='" 
						+ triviaGame.answerChoices[triviaGame.round - 1][i] + "'>" 
						+ triviaGame.answerChoices[triviaGame.round - 1][i] + "</h2>");
				};
			  // if all questions have been displayed, show the stats		
			} else {
				triviaGame.showStats();
			}		
		},
		// correctly guessed function
		correctGuess: function() {
			// timer stops
			triviaGame.stopTimer();
			// empty q and a's
			triviaGame.elements.writeAnswers.empty();
			triviaGame.elements.writeQuestion.empty();
			// tell user they're correct
			triviaGame.elements.writeResult.html("<h3>Correct!</h3>");
			// display associated image
			triviaGame.displayImage();	
			// increase total correct by 1
			triviaGame.totalCorrect++;
			// hold page for 5 seconds, start next round
			setTimeout(triviaGame.nextRound, 5000);
		},
		//incorrect guessed function
		incorrectGuess: function() {
			// timer stops
			triviaGame.stopTimer();
			// empty q and a's
			triviaGame.elements.writeAnswers.empty();
			triviaGame.elements.writeQuestion.empty();
			// tell user they're wrong
			triviaGame.elements.writeResult.html("<h3>Nope!</h3>");
			// show user correct answer
			triviaGame.elements.writeCorrectAnswer.html("<h4>The correct answer was: " 
				+ triviaGame.correctAnswers[triviaGame.round - 1]) + "</h4>";
			// display associated image
			triviaGame.displayImage();	
			// increase total incorrect by 1
			triviaGame.totalIncorrect++;
			// hold page for 5 seconds, start next round
			setTimeout(triviaGame.nextRound, 5000);
		},
		// function to diplay image
		displayImage: function() {
			// adding class .gif to the gif so that it can be sized by css
			triviaGame.elements.funnyGif.addClass("gif");
			// adding the src tag with relative file path to img tag
			triviaGame.elements.funnyGif.attr("src", triviaGame.media[triviaGame.round - 1]);
			// appending the gif to the image div
			triviaGame.elements.writeMedia.append(triviaGame.elements.funnyGif);
		},
		showStats: function() {
			// clear media, correct answer		
			triviaGame.elements.writeMedia.empty();
			triviaGame.elements.writeCorrectAnswer.empty();
			// overwrite result with All done, here's how you did:
			triviaGame.elements.writeResult.html("<h3>All done, here's how you did:</h3>");
			// write stats
			triviaGame.elements.writeStats.append("<h4>Total Correct: " 
				+ triviaGame.totalCorrect + "</h4>");
			triviaGame.elements.writeStats.append("<h4>Total Incorrect: " 
				+ triviaGame.totalIncorrect + "</h4>");
			triviaGame.elements.writeStats.append("<h4>Total Unanswered: " 
				+ triviaGame.totalUnanswered + "</h4>");
			// create text asking user if they want to play again
			triviaGame.elements.writeStartOver.html("<h2 id='start-over'>Start Over?</h2>")
		},
		restartGame: function() {
			triviaGame.round = 0;
			triviaGame.totalCorrect = 0;
			triviaGame.totalIncorrect = 0;
			triviaGame.totalUnanswered = 0;
			triviaGame.nextRound();
		}
	};

	// clears start button once clicked
	triviaGame.elements.clearStartButton.remove();
	// sets beginning round to 0 once start button clicked
	triviaGame.round = 0;
	// displays the first q/a once start button clicked
	triviaGame.nextRound();

	// when the h2 is clicked (only h2's in game are answer choices)
////// BUG HERE!!!!!////================================================
	// the on click only registers for the first question. all subsequent questions do
	// not register any clicks occurring.
	// However, I know the logic works because if you just let the timer run to 0 each time,
	// the game progresses as it should with the questions cycling through and 
	// unanswered var increasing each time. since timer hitting 0 is not associated with any
	// on click, this is how I narrowed down the bug to here. confirmed with the commented out
	// alert as well
	$("h2").on("click", function() {
		// check to see if the h2 id matches the correct answer for the round 
		if (($(this).attr("id")) === triviaGame.correctAnswers[triviaGame.round - 1]) {
			// if so, run correct guess function
			triviaGame.correctGuess();
	      // if not...
		} else if (($(this).attr("id")) !== triviaGame.correctAnswers[triviaGame.round - 1]) {
			// run incorrect guess function
			triviaGame.incorrectGuess();
		}
		// alert("you clicked something");
	});

	// also Bug, doesn't do anything
	$("#start-over").on("click", function() {
		triviaGame.restartGame();
	});

	// testing/debugging
	for (var i = 0; i < triviaGame.questions.length; i ++) {
		console.log("Q: " + triviaGame.questions[i]);
		console.log("Choices: " + triviaGame.answerChoices[i]);
		console.log("Answer: " + triviaGame.correctAnswers[i]);
		console.log("==============================================================");
	};

});