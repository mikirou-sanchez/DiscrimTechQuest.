// script.js — logic for DiscrimTechQuest web version
const questions = [
  {question: "What tool allows citizens to report unfair situations online?",
   options: ["A. digital platform","B. newspaper","C. TV news","D. radio"], answer: "a"},
  {question: "Which system protects equality and participation?",
   options: ["A. dictatorship","B. democracy","C. monarchy","D. anarchy"], answer: "b"},
  {question: "What should you avoid to help reduce discrimination?",
   options: ["A. misinformation","B. education","C. helping others","D. volunteering"], answer: "a"},
  {question: "Which action promotes respect for others?",
   options: ["A. support equal rights","B. ignore rules","C. cheating","D. gossiping"], answer: "a"},
  {question: "How does technology help reduce discrimination?",
   options: ["A. spreads awareness","B. hides information","C. creates inequality","D. causes confusion"], answer: "a"},
  {question: "Which emotion helps people treat others better?",
   options: ["A. empathy","B. anger","C. envy","D. fear"], answer: "a"},
  {question: "Which type of speech can amplify marginalized voices?",
   options: ["A. public","B. silent","C. private","D. secret"], answer: "a"},
  {question: "Reporting unfair situations contributes to?",
   options: ["A. justice","B. chaos","C. violence","D. ignorance"], answer: "a"},
  {question: "Which right allows people to vote and express opinions?",
   options: ["A. freedom","B. slavery","C. control","D. obedience"], answer: "a"},
  {question: "Being confident and balanced reduces?",
   options: ["A. prejudice","B. friendship","C. happiness","D. kindness"], answer: "a"}
];

let current = 0;
let lives = 3;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const livesEl = document.getElementById('lives');
const scoreEl = document.getElementById('score');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

function updateLives() {
  livesEl.textContent = '❤'.repeat(lives);
}

function updateScore() {
  scoreEl.textContent = 'Score: ' + score;
}

function showQuestion() {
  feedbackEl.textContent = '';
  nextBtn.hidden = true;
  optionsEl.innerHTML = '';
  const q = questions[current];
  questionEl.textContent = q.question;
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    // choices are a, b, c, d
    const choice = ['a','b','c','d'][idx];
    btn.innerText = opt;
    btn.dataset.choice = choice;
    btn.onclick = () => selectAnswer(btn);
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(btn) {
  // disable all options
  Array.from(optionsEl.children).forEach(b => b.disabled = true);
  const choice = btn.dataset.choice;
  const correct = questions[current].answer;
  if (choice === correct) {
    score++;
    feedbackEl.textContent = 'Correct!';
    btn.style.boxShadow = '0 6px 14px rgba(0,150,136,0.18)';
  } else {
    lives--;
    feedbackEl.textContent = 'Wrong!';
    btn.style.opacity = '0.7';
  }
  updateLives();
  updateScore();
  // show next or game over
  if (lives <= 0) {
    feedbackEl.textContent = `Game Over! Final Score: ${score}`;
    nextBtn.hidden = true;
    restartBtn.hidden = false;
  } else {
    nextBtn.hidden = false;
    restartBtn.hidden = false;
  }
}

nextBtn.addEventListener('click', () => {
  current++;
  if (current < questions.length && lives > 0) {
    showQuestion();
  } else if (lives > 0) {
    feedbackEl.textContent = `Congratulations! Final Score: ${score}`;
    optionsEl.innerHTML = '';
    nextBtn.hidden = true;
  }
});

restartBtn.addEventListener('click', () => {
  current = 0;
  lives = 3;
  score = 0;
  updateLives();
  updateScore();
  feedbackEl.textContent = '';
  restartBtn.hidden = true;
  showQuestion();
});

// init
updateLives();
updateScore();
restartBtn.hidden = true;
showQuestion();
