import './style.css';
import allQuestions from './questions.ts';

const quizContainer = document.querySelector('.quiz-container') as HTMLDivElement;
const questionDisplay = document.querySelector('.question-display') as HTMLParagraphElement;
const choicesDisplay = document.querySelector('.choices-display') as HTMLDivElement;
const startButton = document.querySelector('.start-btn') as HTMLButtonElement;
const nextButton = document.querySelector('.next-btn') as HTMLButtonElement;
let quizIndex = 0;
let score = 0;

startButton?.addEventListener('click', startQuiz);
nextButton?.addEventListener('click', nextQuestion);

function startQuiz() {
  startButton.style.visibility = 'hidden';
  displayQuiz();
}
 
function displayQuiz() {
  if (quizIndex <= 9) {
  const choices = allQuestions[quizIndex].choices;
  choices.forEach((choice) => {
    const choiceButton = document.createElement('button');
    choiceButton.textContent = String(choice.choice);
    choicesDisplay.append(choiceButton);
    choiceButton.addEventListener('click', makeChoice);
    questionDisplay.textContent = allQuestions[quizIndex].question;
  })
} else if (quizIndex > 9) {
  questionDisplay.style.visibility = 'hidden';
  choicesDisplay.style.visibility = 'hidden';
  nextButton.style.visibility = 'hidden';
  displayScore();
}
}

function nextQuestion() {
 quizIndex++
 clearPreviousQuestion();
 displayQuiz();
}

function clearPreviousQuestion() {
  while (choicesDisplay.hasChildNodes()) {
    choicesDisplay.childNodes.forEach(previous => {
      previous.remove();
    })
  }
}

function makeChoice(e) {
  const userChoice = e.currentTarget;
  const choice = Array.from(choicesDisplay.children);
  const correctChoice = allQuestions[quizIndex].correctAnswer;
    if (choice.indexOf(userChoice) === correctChoice) {
      score++
    }
}

function displayScore() {
  const scoreDisplay = document.createElement('span');
  quizContainer.appendChild(scoreDisplay);
  scoreDisplay.textContent = `You scored ${String(score)} out of 10!`;
}