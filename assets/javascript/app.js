// hide the answer choices until page load and next round begins
$(".answer-choices").hide();
// wait for doc to load
$(document).ready(function() {
	// nothing runs until start button is clicked
	$("#start-button").on("click", function () {
		// object oriented
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
			// stats start at 0
			totalCorrect: 0,
			totalIncorrect: 0,
			totalUnanswered: 0,
			// initializing round, timer, and interval id
			round: "",
			timeLeft: "",
			intervalId: "",
			// method to run timer
			runTimer: function() {
				// 10 secs to answer q
				this.timeLeft = 10;
				// writing initial time remaining to DOM
				$("#timer").html("<h3>Time Remaining: " + this.timeLeft + "</h3>");
				// interval will be decremented every second from the decrement function
				this.intervalId = setInterval(this.decrement, 1000);
			},
			// method to decrement timer/write new time to DOM every second
			decrement: function() {
				// decrease time left by 1 and writes new time left to DOM
				triviaGame.timeLeft--;
				$("#timer").html("<h3>Time Remaining: " + triviaGame.timeLeft +
					"</h3>");
				// if user runs out of time, run unanswered method
				if (triviaGame.timeLeft === 0) {
					triviaGame.unanswered();			
				};
			},
			// method stops the timer
			stopTimer: function() {
				clearInterval(triviaGame.intervalId);
			},
			// clears q and a's
			emptyQandA: function() {
				$("#question").empty();
				$(".answer-choices").empty().hide();
			},
			// clears gif and correct answer
			emptyMediaAndAnswer: function() {
				$("#images").empty();
				$("#correct-answer").empty();	
			},
			// next round/begin game method
			nextRound: function() {
				// un-hide the answer choices from beginning of JS
				$(".answer-choices").show();
				// if there's still more questions, then...
				if (triviaGame.round < triviaGame.questions.length) {
					// increase round by 1
					triviaGame.round++;
					// run timer, clear results, media, correct answer, write q
					triviaGame.runTimer();
					triviaGame.emptyMediaAndAnswer();
					$("#result").empty();
					$("#question").html("<h3>" + 
						triviaGame.questions[triviaGame.round - 1] + "</h3>");
					// write a's to their respective id as defined in the html
					// give each of them a data-text attribute equal to their value
					for (var i = 0; i < triviaGame.answerChoices[triviaGame.round - 1].length; i++) {
						$("#" + i).html(triviaGame.answerChoices[triviaGame.round -1][i]);
						$("#" + i).attr("data-text", triviaGame.answerChoices[triviaGame.round -1][i]);
					};
				  // if all questions have been displayed, show the stats		
				} else {
					triviaGame.showStats();
				}		
			},
			// correctly guessed method
			correctGuess: function() {
				// timer stops, empty q/a, tell user they're correct, display image
				triviaGame.stopTimer();
				triviaGame.emptyQandA();
				$("#result").html("<h3>Correct!</h3>");
				triviaGame.displayImage();	
				// increase total correct by 1
				triviaGame.totalCorrect++;
				// hold page for 5 seconds, start next round
				setTimeout(triviaGame.nextRound, 5500);
			},
			//incorrect guessed method
			incorrectGuess: function() {
				// timer stops, empty q/a, tell user they're wrong, show answer, display image
				triviaGame.stopTimer();
				triviaGame.emptyQandA();
				$("#result").html("<h3>Nope!</h3>");
				$("#correct-answer").html("<h4>The correct answer was: " 
					+ triviaGame.correctAnswers[triviaGame.round - 1]) + "</h4>";
				triviaGame.displayImage();	
				// increase total incorrect by 1
				triviaGame.totalIncorrect++;
				// hold page for 5 seconds, start next round
				setTimeout(triviaGame.nextRound, 5500);
			},
			// unanswered method
			unanswered: function() {
				// timer stops, empty q/a, tell user time's up, show answer, display image
				triviaGame.stopTimer();
				triviaGame.emptyQandA();
				$("#result").html("<h3>Time's Up!</h3>");
				$("#correct-answer").html("<h4>The correct answer was: " 
					+ triviaGame.correctAnswers[triviaGame.round - 1]) + "</h4>";
				triviaGame.displayImage();
				// increase # unanswered by 1
				triviaGame.totalUnanswered++;
				// hold page for 5 seconds, then move to next round
				setTimeout(triviaGame.nextRound, 5500);		
			},
			// method to diplay image
			displayImage: function() {
				// creating local var to hold the jquery image selector
				var gif = $("<img>");
				// adding class .gif so that it can be sized by css
				gif.addClass("gif");
				// adding the src tag with relative file path to img tag
				gif.attr("src", triviaGame.media[triviaGame.round - 1]);
				// appending the gif to the image div
				$("#images").append(gif);
			},
			// method to write stats at game end
			showStats: function() {
				// clear media, correct answer, q, and a's
				triviaGame.emptyQandA();	
				triviaGame.emptyMediaAndAnswer();
				// overwrite result with All done, here's how you did:
				$("#result").html("<h3>All done, here's how you did:</h3>");
				// write stats
				$("#stats").append("<h4>Total Correct: " + triviaGame.totalCorrect + "</h4>");
				$("#stats").append("<h4>Total Incorrect: " + triviaGame.totalIncorrect + "</h4>");
				$("#stats").append("<h4>Total Unanswered: " + triviaGame.totalUnanswered + "</h4>");
				// create text asking user if they want to play again
				$("#restart-button").html("<h2>Start Over?</h2>")
			},
			// restart game method triggers when start over div is clicked
			restartGame: function() {
				// resets all properties to 0
				triviaGame.round = 0;
				triviaGame.totalCorrect = 0;
				triviaGame.totalIncorrect = 0;
				triviaGame.totalUnanswered = 0;
				// clears prior stats and start over button from screen
				$("#stats").empty();
				$("#restart-button").empty();
				// begins next round at round of 1
				triviaGame.nextRound();
			}
		};

		// clears start button once clicked
		$("#start-button").remove();
		// sets beginning round to 0 once start button clicked
		triviaGame.round = 0;
		// displays the first q/a once start button clicked
		triviaGame.nextRound();

		// when the answer choice is clicked...
		$(".answer-choices").on("click", function() {
			// check to see if data-text attribute matches the correct answer for the round 
			if (($(this).attr("data-text")) === triviaGame.correctAnswers[triviaGame.round - 1]) {
				// if so, run correct guess function
				triviaGame.correctGuess();
		      // if not...
			} else if (($(this).attr("data-text")) !== triviaGame.correctAnswers[triviaGame.round - 1]) {
				// run incorrect guess function
				triviaGame.incorrectGuess();
			}
		});

		// on click event for restarting game once finished
		$("#restart-button").on("click", function() {
			triviaGame.restartGame();
		});
	});
});