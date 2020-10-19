//once button is clicked quiz questions appear and timer starts
var timerEl = document.getElementById('timer');
var startBtn = document.getElementById('start');
var introEl = document.getElementById("intro");
var quizContainer = document.getElementById("quiz");
var questionTitle = document.getElementById("question");
var answersEl = document.getElementById("answers");
var statusEl = document.getElementById("status");
var resetButton = document.getElementById("resetButton");

//setup the timer
var timer;
function countdown() {
    timer = setInterval(function () {
        if (timeLeft >= 1) {
            timerEl.textContent = timeLeft;
            timeLeft = timeLeft - 1;
        }

        if (timeLeft === 0) {
            timerEl.textContent = "";
        }
    }, 1000);
}

var penalty = 5;
var timeLeft = 60;

var quiz = [
    {
        question: "In The Silence of the Lambs, which city is Dr. Lecter imprisoned in?",
        answers: ["Portland", "New York","Baltimore", "philadelphia"],
        correct: 2,
    },
    
    {
        question: "In the 1981 movie The Shining, which hotel did Jack and family look after?",
        answers: ["The Westin", "The Grand Budapest Hotel", "The Roosevelt Hotel", "The Overlook Hotel"],
        correct: 3,
    },
    
    {
        question: "In which two horror films does the quote “We all go a little mad sometimes” appear?",
        answers: ["Psycho and Nightmare on Elm Street", "Scream and Nightmare on Elm Street","Psycho and Friday the 13th", "Psycho and Scream"],
        correct: 3,
    },
    
    {
        question: "How many people does Jason kill in the first Friday the 13th film?",
        answers: ["9", "13", "0", "5"],
        correct: 2,
    },
    
    {
        question: "Leatherface was a character in what horror film?",
        answers: ["The Texas Chainsaw Massacre", "The Blair Witch Project","The Shining", "Carrie"],
        correct: 0,
    },
    
    {
        question: "What classic horror movie features a serial killer in a William Shatner mask?",
        answers: ["Halloween", "Friday The 13th","Texas Chainsaw Massacre", "The Fog"],
        correct: 0,
    },
];
    
// This will toggle class 'hidden' which will hide/reveal #intro el
function toggleIntro() {
    if (introEl.classList.contains("hidden")) {
      introEl.classList.remove("hidden");
    } else {
      introEl.classList.add("hidden");
    }
  }


  function toggleResetButton() {
    if (resetButton.classList.contains("hidden")) {
      resetButton.classList.remove("hidden");
    } else {
      resetButton.classList.add("hidden");
    }
  }
  
  function startQuiz() {
    var current = 0;
    var currentQuestion = quiz[current];
    var score - 0;

    resetButton.onClick = function () {
        toggleIntro();
        resetQuiz();
        toggleResetButton();
    };

    function resetQuiz() {
        current = 0;
        currentQuestion = quiz[current];
        timerLeft = 60;
        questionTitle.innerText = "Halloween Quiz Challenge";
        answersEl.innerHtml = null;
    }

    function showResults() {
        questionTitle.innerText = "Results";
        answersEl.innerHtml = 
        "You got " +
        score + 
        " out of " +
        quiz.length + 
        " right! That's " +
        Math.floor((score / quiz.length) * 100) +
        "%";

        toggleResetButton();

        //stops timer
        clearInterval(timer);

        //clear status
        clearStatus();
    }

    function clearStatus() {
        statusEl.innerText = null;
    }

    function nextQuestion() {
        current++;
        currentQuestion = quiz[current];
        updateQuestion(currentQuestion.question);
        updateAnswers(currentQuestion.answers);
    }

    function updateQuestion(text) {
        questionTitle.innerText = text;
    }

    function checkAnswer(index) {

        // correct answer
        if (index === currentQuestion.correct) {
            console.log("Correct!");
            score++;
            statusEl.innerText = "Correct!"; 
            // incorrect answer
        } else {
            console.log("Wrong!");
            timeLeft = timeLeft - penalty;
            statusEl.innerText = "Incorrect. -" + penalty + " seconds!";
        }

    }

    function updateAnswers(answers) {
        //empty answers
        answersEl.innerHTML = null;

        //add answers
        answers.forEach((answer, index) => {
            var button = document.createElement("button");

            button.innerText = answer;
            button.onclick = () => {
                checkAnswer(index);
                if (current + 1 < quiz.length) {
                    nextQuestion();
                } else {
                    showResults();
                }
            };
            answersEl.append(button);
        });
    }
    //start countdown
    countdown();
    //hide intro
    toggleIntro();

    //replace text with first question.
    if (current === 0) {
        updateQuestion(currentQuestion.question);
        updateAnswers(currentQuestion.answers);
    }
  }


startBtn.addEventListener("click", startQuiz);