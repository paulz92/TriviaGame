// pseudocode
// 1) user clicks the start button to begin the game
// 2) game begins, a question is selected and displayed on the
//    DOM, the answer choices for that question are displayed,
//    and a timer set to 20 seconds begins to countdown
// 3) user will click on an answer choice
// 4) if answer is incorrect OR if timer hits 0, timer stops,
//    question/answers disappear, the word "nope" is displayed,
//    (displays "out of time" if timer reaches 0 seconds), then 
//    the correct answer is displayed, and an image/gif of answer 
//    appears. this page is displayed for 4 seconds, then 
//    loads the next question/answer choices & resets timer
// 5) if answer is correct, timer stops, question/answers 
//    disappear, the word "correct" is displayed, and an image
//    or gif of the correct answer is displayed. this page is 
//    displayed for 4 seconds, then loads the next question/answer
//    choices & resets timer
// 6) once all questions have been presented/answered, 
//    display "all done, here's how you did", and display the 
//    stats to the user. stats include: #incorrect answers,
//    # correct answers, #unanswered. also include a 'start over?'
//    option that if user clicks, the game resets to the first
//    question. when start over is clicked, the website does not
//    reload - we just reset the game back to beginning
// ===============================================================
