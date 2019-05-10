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

var answerTime = 30;
var quizLength = triviaQuestions.length;

var pickedQuestions = [];
var queryAnswer = 0;
var query = 0;
var correct = 0;
var incorrect = 0;

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

// my solution here didn't work and I'm not sure why
// 
//  var pickQuestion = function() {
//    if (pickedQuestions.length === triviaQuestions.length) {
//      // game over
//      gameOver();
//    } else if (pickedQuestions.includes(pick)) {
//      console.log(pick, " was already picked")
//      pickQuestion();
//    } else {
//      console.log(pick);
//      pickedQuestions.push(pick);
//      console.log(pickedQuestions);
//      console.log(triviaQuestions[pick]);
//      return triviaQuestions[pick];
//    };

var intervalID;
var timer = function(time, interval = 1) {
  intervalID = setInterval(function() {
    if(time === 0) {
      $('#countdown').text('done!');
      clearInterval(intervalID);
      return outtaTime();
    } else {
      time--;
      // console.log(time , elapsedTime)
      $('#countdown').text(time);
    }
  } , interval * 1000);
}

var outtaTime = function() {
  console.log("time elapsed");
  nextQuestion();
}

var stopTheClock = function() {
  clearInterval(intervalID);
  clearTimeout();
}

var nextQuestion = function () {
  
  query = pickQuestion();
  if (query === false) {
    return;
  }
  queryAnswer = query.validAnswer;
  $('#question-pane').text(query.question);
  $.each(query.choices , function(choiceIndex , choiceContent) {
    console.log(choiceContent, choiceIndex);
    var choice = $('<li></li>');
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
    correct++;
    stopTheClock();
    nextQuestion();
  } else {
    //incorrect
    console.log("wrong answer");
    incorrect++;
    stopTheClock();
    nextQuestion();
  }
};

var gameOver = function() {
  console.log("game over");
  $('#status-pane').text("game over");
};

$(document).ready(function() {
  $('#start-button').click(nextQuestion());
})