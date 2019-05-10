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
var elapsedTime = 0;

var pickedQuestions = [];
var queryAnswer = 0;
var query = 0;

var pickQuestion = function() {
  if (pickedQuestions.length >= triviaQuestions.length) {
    //game over
    gameOver();
  } else {
    do {
      var pick = Math.floor(Math.random() * triviaQuestions.length);
      console.log(pick);
    }
    while (pickedQuestions.includes(pick)) {
    }
    pickedQuestions.push(pick);
    return triviaQuestions[pick];
  }


  // if (pickedQuestions.length === triviaQuestions.length) {
  //   // game over
  //   gameOver();
  // } else if (pickedQuestions.includes(pick)) {
  //   console.log(pick, " was already picked")
  //   pickQuestion();
  // } else {
  //   console.log(pick);
  //   pickedQuestions.push(pick);
  //   console.log(pickedQuestions);
  //   console.log(triviaQuestions[pick]);
  //   return triviaQuestions[pick];
  // }
}

var timer = function(time, interval = 1000) {
  var intervalID = setInterval(function() {
    if(time === 0) {
      $('#countdown').text('done!');
      clearInterval(intervalID);
    } else {
      time--;
      elapsedTime++;
      // console.log(time , elapsedTime)
      $('#countdown').text(time);
    }
  } , interval);
}

var nextQuestion = function () {
  query = pickQuestion();
  console.log("Query: " , query);
  queryAnswer = query.validAnswer;
  console.log("Answer: " , queryAnswer);
  $('#question-pane').text(query.question);
  
  $.each(query.choices , function(choiceIndex , choiceContent) {
    var choice = $('<li></li>');
    console.log(choiceContent, choiceIndex);
    choice.text(choiceContent);
    choice.attr('answerNumber' , choiceIndex);
    choice.click(answerQuestion);
    $('#question-pane').append(choice);
  });
};

var answerQuestion = function() {
  var answerIndex = parseInt($(this).attr('answerNumber'));
  console.log("clicked answer: " , answerIndex, queryAnswer);
  if (answerIndex === queryAnswer) {
    //correct
    console.log("right answer");
    nextQuestion();
  } else {
    //incorrect
    console.log("wrong answer");
    nextQuestion();
  }
};

var gameOver = function() {
  console.log("game over");
  $('#status-pane').text("game over");
};

$(document).ready(function() {
  $('#start-button').click(nextQuestion());
  timer(answerTime);
})