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

var timeToAnswer = 30;

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

$(document).ready(function() {
  var query = pickQuestion(triviaQuestions);
  console.log(query);
  $('#question-pane').text(query.question);
  $.each(query.choices , function() {
    var choice = $('<p></p>');
    console.log(this);
    choice.text(this);
    $('#question-pane').append(choice);
  });
  var x = setInterval(function() {
    if(timeToAnswer === 0) {
      $('#countdown').text('done!');
      clearInterval(x);
    } else {
      timeToAnswer--;
      console.log(timeToAnswer)
      $('#countdown').text(timeToAnswer);
    }
  } , 1000);
})