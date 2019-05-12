var triviaQuestions = [{
  question: "Which is the third answer?",
  choices: ["first" , "second" , "third" , "fourth"],
  //images:  ["../images/batplaceholder.jpg"],
  validAnswer: 2,
  },
  {
  question: "Which is the second answer?",
  choices: ["first" , "second" , "third" , "fourth"],
  //images: ["../images/batplaceholder.jpg"],
  validAnswer: 1,
  },
  {
  question: "Which is the first answer?",
  choices: ["first" , "second" , "third" , "fourth"],
  //images: ["../images/batplaceholder.jpg"],
  validAnswer: 0,
  },
  {
  question: "Which is the fourth answer?",
  choices: ["first" , "second" , "third" , "fourth"],
  //images: ["../images/batplaceholder.jpg"],
  validAnswer: 3,
}];

var answerTime = 11;
var quizLength = triviaQuestions.length;

var pickedQuestions = [];
var queryAnswer = 0;
var query = 0;
var correct = 0;
var incorrect = 0;
var quizzing = true;

var pickQuestion = function() {
  if (pickedQuestions.length >= quizLength) {
    //game over
    gameOver();
    return false;
  } else {
    do {
      var pick = Math.floor(Math.random() * triviaQuestions.length);
    }
    while (pickedQuestions.includes(pick));
    console.log(pick);
    pickedQuestions.push(pick);
    return triviaQuestions[pick];
  }
};

var intervalID;
var timer = function(time, interval = 1) {
  intervalID = setInterval(function() {
    if(time === 0) {
      $('#countdown').text('');
      clearInterval(intervalID);
      outtaTime();
    } else {
      time--;
      // console.log(time , elapsedTime)
      $('#countdown').text(time);
    }
  } , interval * 1000);
}

var outtaTime = function() {
  console.log("time elapsed");
  revealAnswers();
  setTimeout(nextQuestion , 1250);
}

var stopTheClock = function() {
  clearInterval(intervalID);
  clearTimeout();
}

var nextQuestion = function () {
  $('#status-pane').text("Time Remaining:")
  query = pickQuestion();
  if (query === false) {
    quizzing = false;
    console.log(quizzing)
    return;
  }
  queryAnswer = query.validAnswer;
  $('#question-pane').text(query.question);
  $.each(query.choices , function(choiceIndex , choiceContent) {
    console.log(choiceContent, choiceIndex);
    var choice = $('<li type="A"></li>');
    choice.text(choiceContent);
    choice.attr('answerNumber' , choiceIndex);
    choice.click(answerQuestion);
    $('#question-pane').append(choice);
  });
  console.log("Question: " , query.question);
  console.log("Answer: " , queryAnswer);
  timer(answerTime);
};

var answerQuestion = function() {
  var answerIndex = parseInt($(this).attr('answerNumber'));
  console.log("clicked answer: " , answerIndex, queryAnswer);
  if (answerIndex === queryAnswer) {
    //correct
    console.log("right answer");
    $('#status-pane').text("Correct!");
    $('#countdown').text("");
    stopTheClock();
    correct++;
    setTimeout(nextQuestion , 1250);
  } else {
    //incorrect
    console.log("wrong answer");
    $('#status-pane').text("Incorrect!")
    stopTheClock();
    revealAnswers();
    incorrect++;
    setTimeout(nextQuestion , 1250);
  }
};

var revealAnswers = function() {
  $('#countdown').text(query.choices[queryAnswer]);
}

var gameOver = function() {
  console.log("game over");
  $('#status-pane').text("Complete! - Press Go! to try again");
  $('#countdown').text("You scored " + correct + " out of " + quizLength);
};

var newgame = function() {
  console.log("new game");
  quizzing = true;
  correct = 0;
  pickedQuestions = [];
  console.log(quizzing , pickedQuestions);
  $('#status-pane').text("Press Go! to begin quiz")
}

$(document).ready(function() {
  newgame();
  $('#start-button').click(function () {
    if (quizzing === false) {
      console.log("click new game");
      newgame();  
    }
    console.log("click next question")
    nextQuestion();
  });
})