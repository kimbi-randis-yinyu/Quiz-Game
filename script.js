//dom Element
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText= document.getElementById("questions-text");
const answerContainer = document.getElementById("answer-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress")

const quizQuestions= [
    {
        question: "which of the following is extension for javascript?",
        answers:[
            {text:".jsc",correct: false},
            {text:".py", correct: false},
            {text:".js",correct: true},
            {text:".cx",correct:false},
        ],
    },
    {
        question: "which of the following is a build-in function in javacript?",
        answers:[
            {text:"let",correct: false},
            {text:"const",correct: false},
            {text:"scope",correct: false},
            {text:"setInterval",correct: true},

        ],
    },
    {
        question: "which of the following is framework in javascript?",
        answers:[
            {text:"HTML",correct: false},
            {text:"CSS",correct: false},
            {text:"Pandas",correct: false},
            {text:"React",correct: true},
        ],
    },
    {
        question: "The following is a strick equall  operator in javascript?",
        answers:[
            {text:"!=",correct: false},
            {text:"===",correct:true},
            {text:"==",correct: false},
            {text:"=",correct: false},
        ],
    },
    {
        question: "which of the following is an ananymous function?",
        answers:[
            {text:"=()=>{}",correct: true},
            {text:"function('click')",correct: false},
            {text:"forEach",correct: false},
            {text:"=(e)=>",correct: false},
        ],
    },
];

// quiz state vars
let currentQuestionIndex= null;
let score=0;
let answersDisabled =false;


totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent=quizQuestions.length;

// event listiner
startButton.addEventListener("click",startQuiz);
restartButton.addEventListener("click",restartQuiz);

function startQuiz(){
    console.log(Array.from(answerContainer.children).forEach
    ((el)=> console.log(el)));
    currentQuestionIndex=0;
    scoreSpan.textContent=0
    startScreen.classList.remove("active")
    quizScreen.classList.add("active")

    showQuestion()

    }
function showQuestion(){
    answersDisabled=false;

   const currentQuestion = quizQuestions[currentQuestionIndex] 
   currentQuestionSpan.textContent = currentQuestionIndex + 1
   const progressPercent = (currentQuestionIndex / quizQuestions.length)*100;
   progressBar.style.width =progressPercent + "%"
   
   questionText.textContent=currentQuestion.question;
   // todo: explain this on a second
   answerContainer.innerHTML="";

   currentQuestion.answers.forEach(answer =>{
     const button = document.createElement('button');
     button.textContent = answer.text;
     button.classList.add("answer-btn");
     button.dataset.correct = answer.correct;

    button.addEventListener("click",selectAnswer);
    
    answerContainer.appendChild(button);

   })
}
function selectAnswer(event){
   if(answersDisabled) return ;
      answersDisabled=true;
      const selectedButton = event.target;
      const isCorrect =selectedButton.dataset.correct==="true";
      //todo
      Array.from(answerContainer.children).forEach(button => {
        if(button.dataset.correct==="true"){
           button.classList.add("correct");
        }else{
           button.classList.add("incorrect"); 
        }
        
      });
      if(isCorrect){
        score++;
        scoreSpan.textContent = score;
      }

      setTimeout(() => {
        currentQuestionIndex++;

        if(currentQuestionIndex < quizQuestions.length){
           showQuestion()
        }else{
            showResults()
        }

      },1000)
}

function showResults(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length) * 100;
    if(percentage===100){
        resultMessage.textContent="perfect! you're a genius";

    }else if(percentage >=80){
        resultMessage.textContent="  Very Good!";
    }else if(percentage >=60){
        resultMessage.textContent="Good effort keep learning";
    }else if(percentage >=40){
        resultMessage.textContent="Not bad try again";
    }else{
        resultMessage.textContent="Keeping studing y'll get better";
    }
    score = 0;

    }

function restartQuiz(){
    resultScreen.classList.remove("active")
    startQuiz();
    
let currentQuestionIndex=0;

    
}
restartQuiz='';
