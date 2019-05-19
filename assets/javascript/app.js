var triviaQuestions = [{
  question: "This supercomputer was built by hyper-intelligent beings who exist in our dimension as ordinary white mice.",
  choices: ["Deep Thought" , "Profound Notion" , "The Big Brain" ,  "This machine was not named"],
  imageLink: "assets/images/deep-thought.png",
  validAnswer: 0,
},
{
  question: "This military system, WOPR from the movie WarGames, went by what human name?",
  choices: ["Jerry" , "Joshua" , "Frank" , "Hal"],
  imageLink: "assets/images/WOPR.jpg",
  validAnswer: 1,
},
{
  question: "This famous computer on a Space Odyssey can't do that. But he's sorry about it.",
  choices: ["SAL 9000" , "T.E.N.C.H. 889B" , "HAL 9000" , "MU-TH-UR 6000"],
  imageLink: "assets/images/HAL.jpg",
  validAnswer: 2,
},
{
  question: "In the movie Alien, this computer finally reveals the true purpose behind the Nostromo's mission",
  choices: ["UNCLE" , "Mother" , "Computo" , "Guardian"],
  imageLink: "assets/images/mother.jpg",
  validAnswer: 1,
},
{
  question: "After this robot celebrity's first appearence in Forbidden Planet, he susequently guest-starred in several American television shows including The Twilight Zone, The Man from U.N.C.L.E. and Columbo.",
  choices: ["Mr. Robot" , "Robot B-9" , "Robby the Robot" , "Mr. Roboto"],
  imageLink: "assets/images/robby.jpg",
  validAnswer: 2,
},
{
  question: "The Maschinenmensch of Fritz Lang's Metropolis also shared this name with her human doppleganger.",
  choices: ["Brenda" , "Eve" , "Viki" , "Maria"],
  imageLink: "assets/images/maria.jpg",
  validAnswer: 3,
},
{
  question: "This alien robot came to help save us from ourselves in the classic movie The Day the Earth Stood Still.",
  choices: ["Klaatu" , "The Robot" , "Gort" , "Brainiac"],
  imageLink: "assets/images/Gort.jpg",
  validAnswer: 2,
},];

var answerTime = 10;
var restTime = 1.5;
var quizLength = triviaQuestions.length;

var pickedQuestions = [];
var query = 0;
var queryAnswer = 0;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var quizzing = true;
var betweenQ = true;

var pickQuestion = function() {
  if (pickedQuestions.length >= quizLength) {
    //game over
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
  console.log("timer started");
  time++;
  intervalID = setInterval(function() {
    if(time === 0) {
      $('#countdown').text('');
      clearInterval(intervalID);
      outtaTime();
    } else {
      time--;
      // console.log(time);
      $('#countdown').text(time);
    }
  } , interval * 1000);
}

var outtaTime = function() {
  console.log("time elapsed");
  revealAnswers();
  betweenQ = true;
  unanswered++;
  setTimeout(nextQuestion , restTime * 1000);
}

var stopTheClock = function() {
  clearInterval(intervalID);
  clearTimeout();
}

var nextQuestion = function () {
  betweenQ = false;
  $('#start-button').hide();
  $('#status-pane').text("Time Remaining:");
  $('#question-pane').empty();
  $('#picture-pane').empty();
  $('#choices-pane').empty();
  query = pickQuestion();
  if (query === false) {
    // game over
    gameOver();
    return;
  }
  queryAnswer = query.validAnswer;
  // Get question
  $('#question-pane').text(query.question);
  // Get picture clue
  var queryPicture = $('<img>');
  queryPicture.attr('src' , query.imageLink);
  $('#picture-pane').append(queryPicture);
  // Get choices
  $.each(query.choices , function(choiceIndex , choiceContent) {
    var choice = $('<li type="A"></li>');
    choice.text(choiceContent);
    choice.attr('answerNumber' , choiceIndex);
    choice.click(answerQuestion);
    $('#choices-pane').append(choice);
  });
  console.log("Answer: " , queryAnswer);
  // Start the timer
  timer(answerTime);
};

var answerQuestion = function() {
  var answerIndex = parseInt($(this).attr('answerNumber'));
  console.log("clicked answer: " , answerIndex, queryAnswer);
  if (quizzing === false || betweenQ === true) {
    return;
  } else if (answerIndex === queryAnswer) {
    //correct
    betweenQ = true;
    console.log("right answer");
    $('#status-pane').text("Correct!");
    $('#countdown').text("");
    stopTheClock();
    correct++;
    setTimeout(nextQuestion , restTime * 1000);
  } else {
    //incorrect
    betweenQ = true;
    console.log("wrong answer");
    $('#status-pane').text("Incorrect!")
    stopTheClock();
    revealAnswers();
    incorrect++;
    setTimeout(nextQuestion , restTime * 1000);
  }
};

var revealAnswers = function() {
  $('#countdown').text(query.choices[queryAnswer]);
}

var gameOver = function() {
  console.log("game over");
  quizzing = false;
  $('#start-button')
    .text("New Game")
    .show();
  $('#status-pane').text("Complete!");
  $('#countdown')
    .append($('<p/>')
      .text(correct + " correct"))
    .append($('<p/>')
      .text(incorrect + " incorrect"))
    .append($('<p/>')
      .text(unanswered + " unanswered"));
  return;
};

var newgame = function() {
  console.log("new game");
  quizzing = true;
  correct = 0;
  incorrect = 0;
  unanswered = 0;
  pickedQuestions = [];
  console.log(quizzing , pickedQuestions);
  $('#countdown').empty();
  $('#status-pane').text("Press Go! to begin quiz");
  $('#start-button').text('Go!');
}

$(document).ready(function() {
  newgame();
  $('#start-button').click(function () {
    if (quizzing === false) {
      console.log("click new game");
      newgame();  
    } else {
      console.log("click next question")
      nextQuestion();
    }
  });
})