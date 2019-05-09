var triviaQuestions = [{
  question: "Which is the third answer?",
  choices: ["first" , "second" , "third" , "fourth"],
  //images:  ["../images/batplaceholder.jpg"],
  validAnswer: 2,
  },
  {
  question: "Which is the second answer?",
  choices: ["first" , "second", "third", "fourth"],
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
var query = 0;
var queryAnswer = 0;

var pickedQuestions = [];

var pickQuestion = function(questionList) {
  var pick = Math.floor(Math.random() * questionList.length);
  if (!pickedQuestions.includes(pick)) {
    pickedQuestions.push(pick);
    console.log(pick , pickedQuestions)
    return questionList[pick];
  } else {
    console.log(pick, " was already picked")
    pickQuestion(questionList);
  }
}

var timer = function(time, interval = 1000) {
  var intervalID = setInterval(function() {
    if(time === 0) {
      $('#countdown').text('done!');
      clearInterval(intervalID);
    } else {
      time--;
      elapsedTime++;
      console.log(time , elapsedTime)
      $('#countdown').text(time);
    }
  } , interval);
}

var nextQuestion = function () {
  query = pickQuestion(triviaQuestions);
  console.log(query);
  queryAnswer = query.validAnswer;
  $('#question-pane').text(query.question);
  $.each(query.choices , function(choiceIndex , choiceContent) {
    var choice = $('<li></li>');
    console.log(choiceContent, choiceIndex);
    choice.text(choiceContent);
    choice.attr("answerNumber" , choiceIndex);
    // choice.on("click" , answerQuestion());
    $('#question-pane').append(choice);
  });
}

var answerQuestion = function() {  
  if (triviaQuestions.length === pickedQuestions.lenth) {
    //quiz over
    console.log("quiz over");
  }
  
}

$(document).ready(function() {
  nextQuestion();
  timer(answerTime);
})