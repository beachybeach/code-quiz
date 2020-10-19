//get all of the elements ready for easy pickin's later
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
var penalty = 5;
var timeLeft = 60;
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

//setup quiz status
var current = 0;
var currentQuestion = quiz[current];
var score = 0;    

// Clears the #status element
function clearStatus() {
    statusEl.innerText = null;
  }
  
  // Toggles visibility of an element.
  function toggleElement(element) {
    if (element.classList.contains("hidden")) {
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
  }
  
  // Add onclick to reset button
  resetButton.onclick = function () {
    resetQuiz();
  };
  
    function resetQuiz() {
        current = 0;
        score = 0;
        currentQuestion = quiz[current];
        timeLeft = 60;
        questionTitle.innerText = "Halloween Quiz Challenge";
        answersEl.innerHTML = null;
        toggleElement(resetButton);
        toggleElement(introEl);
    }

    function showResults() {
        questionTitle.innerText = "Results";
        answersEl.innerHTML = 
        "You got " +
        score + 
        " out of " +
        quiz.length + 
        " right! That's " +
        Math.floor((score / quiz.length) * 100) +
        "%";

        toggleElement(resetButton);

        // stops timer
        clearInterval(timer);

        //clear status
        clearStatus();
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
function startQuiz() {

    countdown();
    //hide intro
    toggleElement(introEl);

    // Start the quiz
        updateQuestion(currentQuestion.question);
        updateAnswers(currentQuestion.answers);
  }
  startBtn.addEventListener("click", startQuiz);