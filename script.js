const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'YENIDEN BASLA!'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
    alert("dogru!");
  } else {
    element.classList.add('wrong')
    alert("yanlis!");
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct') 
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Kizilirmak hangi ilimizde dogar?',
    answers: [
      { text: 'Amasya', correct: false },
      { text: 'Ankara', correct: false },
      { text: 'Sivas', correct: true },
      { text: 'Kayseri', correct: false }
    ]
  },
  {
    question: 'Asagidakilerden hangisi programlama dili degildir?',
    answers: [
      { text: 'C++', correct: false },
      { text: 'HTML', correct: true },
      { text: 'PHP', correct: false },
      { text: 'JAVA', correct: false }
    ]
  },
  {
    question: 'Kangali ile meshur ilimiz?',
    answers: [
      { text: 'Gaziantep', correct: false },
      { text: 'Mus', correct: false },
      { text: 'Trabzon', correct: false },
      { text: 'Sivas', correct: true }
    ]
  },
  {
    question: 'JavaScript kodlari <script>...</script> etiketleri arasinda yazilir?',
    answers: [
      { text: 'Yanlis', correct: false },
      { text: 'Dogru', correct: true }
    ]
  }
]