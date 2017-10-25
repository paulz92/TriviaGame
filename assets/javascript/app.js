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
		// needed for cycling through arrays correctly
		round: "",
		// next 3 are stats
		totalCorrect: 0,
		totalIncorrect: 0,
		totalUnanswered: 0,
		// starting timer for how many seconds left to guess
		timeLeft: "",
		// equating this to 0 for now
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
			this.timeLeft = 10;
			this.elements.writeTimer.html("<h3>Time Remaining: " + this.timeLeft + "</h3>");
			this.intervalId = setInterval(this.decrement, 1000);
		},
		// funtion to decrement timer/write new time to DOM every second
		// if statement includes logic as to what happens if timer runs to 0
		decrement: function() {
			triviaGame.timeLeft--;
			triviaGame.elements.writeTimer.html("<h3>Time Remaining: " + triviaGame.timeLeft +
				"</h3>");
			if (triviaGame.timeLeft === 0) {
				triviaGame.stopTimer();
				triviaGame.elements.writeAnswers.empty();
				triviaGame.elements.writeQuestion.empty();
				triviaGame.elements.writeResult.html("<h3>Time's Up!</h3>");
				triviaGame.elements.writeCorrectAnswer.html("<h4>The correct answer was: " 
					+ triviaGame.correctAnswers[triviaGame.round - 1]) + "</h4>";
				triviaGame.displayImage();
				triviaGame.totalUnanswered++;
				setTimeout(triviaGame.nextRound, 5000);			
			};
		},
		// function that stops the timer once it hits 0
		stopTimer: function() {
			clearInterval(triviaGame.intervalId);
		},
		// writes the question and answer from the current round to the DOM
		nextRound: function() {
			triviaGame.round++;
			triviaGame.elements.writeResult.empty();
			triviaGame.elements.writeMedia.empty();
			triviaGame.elements.writeCorrectAnswer.empty();	
			triviaGame.runTimer();
			triviaGame.elements.writeQuestion.html("<h3>" + 
				triviaGame.questions[triviaGame.round - 1] + "</h3>");
			for (var i = 0; i < triviaGame.answerChoices[triviaGame.round - 1].length; i++) {
				triviaGame.elements.writeAnswers.append("<h2 id='" 
					+ triviaGame.answerChoices[triviaGame.round - 1][i] + "'>" 
					+ triviaGame.answerChoices[triviaGame.round - 1][i] + "</h2>");
			};
		},
		correctGuess: function() {
			triviaGame.stopTimer();
			triviaGame.elements.writeAnswers.empty();
			triviaGame.elements.writeQuestion.empty();
			triviaGame.elements.writeResult.html("<h3>Correct!</h3>");
			triviaGame.displayImage();	
			triviaGame.totalCorrect++;
			setTimeout(triviaGame.nextRound, 5000);
		},
		incorrectGuess: function() {
			triviaGame.stopTimer();
			triviaGame.elements.writeAnswers.empty();
			triviaGame.elements.writeQuestion.empty();
			triviaGame.elements.writeResult.html("<h3>Nope!</h3>");
			triviaGame.elements.writeCorrectAnswer.html("<h4>The correct answer was: " 
				+ triviaGame.correctAnswers[triviaGame.round - 1]) + "</h4>";
			triviaGame.displayImage();	
			triviaGame.totalIncorrect++;
			setTimeout(triviaGame.nextRound, 5000);
		},
		displayImage: function() {
			triviaGame.elements.funnyGif.addClass("gif");
			triviaGame.elements.funnyGif.attr("src", triviaGame.media[triviaGame.round - 1]);
			triviaGame.elements.writeMedia.append(triviaGame.elements.funnyGif);
		},
		gameOver: function() {

		},
		resetGame: function() {

		},
	};

	// clears start button once clicked
	triviaGame.elements.clearStartButton.remove();
	// sets beginning round to 0 once start button clicked
	triviaGame.round = 0;
	// displays the first q/a once start button clicked
	triviaGame.nextRound();


	$("h2").on("click", function() {
		if (($(this).attr("id")) === triviaGame.correctAnswers[triviaGame.round - 1]) {
			triviaGame.correctGuess();
		} else if (($(this).attr("id")) !== triviaGame.correctAnswers[triviaGame.round - 1]) {
			triviaGame.incorrectGuess();
		}
		// alert("you clicked something");
		
	});

	// testing/debugging
	for (var i = 0; i < triviaGame.questions.length; i ++) {
		console.log("Q: " + triviaGame.questions[i]);
		console.log("Choices: " + triviaGame.answerChoices[i]);
		console.log("Answer: " + triviaGame.correctAnswers[i]);
		console.log("==============================================================");
	};

});