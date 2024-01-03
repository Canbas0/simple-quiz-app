const questions = [
    {
        question: 'Dünya üzerinde kaç kıta bulunmaktadır?',
        answer: [
            { text: '3', correct: false },
            { text: '6', correct: false },
            { text: '5', correct: false },
            { text: '7', correct: true }
        ]
    },
    {
        question: 'İstanbul Boğazı\'nın karşı kıyısında hangi kıta yer almaktadır?',
        answer: [
            { text: 'Asya', correct: true },
            { text: 'Avrupa', correct: false },
            { text: 'Afrika', correct: false },
            { text: 'Okyanusya', correct: false }
        ]
    },
    {
        question: 'Hangi gezegen Güneş Sistemi\'ndeki en büyük gezegendir?',
        answer: [
            { text: 'Mars', correct: false },
            { text: 'Jüpiter', correct: true },
            { text: 'Venüs', correct: false },
            { text: 'Satürn', correct: false }
        ]
    },
    {
        question: 'Hangi renk, gökkuşağının ortasında bulunmaz?',
        answer: [
            { text: 'Mavi', correct: false },
            { text: 'Yeşil', correct: false },
            { text: 'Sarı', correct: true },
            { text: 'Kırmızı', correct: false }
        ]
    },
    {
        question: 'Türkiye\'nin başkenti neresidir?',
        answer: [
            { text: 'Ankara', correct: true },
            { text: 'İstanbul', correct: false },
            { text: 'İzmir', correct: false },
            { text: 'Bursa', correct: false }
        ]
    },
    {
        question: 'Hangi gezegen "Avcı Takımyıldızı"nda yer almaktadır?',
        answer: [
            { text: 'Venüs', correct: false },
            { text: 'Mars', correct: false },
            { text: 'Jüpiter', correct: true },
            { text: 'Merkür', correct: false }
        ]
    },
    {
        question: 'Leonardo da Vinci hangi alanlarda ünlüdür?',
        answer: [
            { text: 'Müzik', correct: false },
            { text: 'Resim', correct: true },
            { text: 'Matematik', correct: false },
            { text: 'Spor', correct: false }
        ]
    },
    {
        question: 'Hangi kitap, William Golding\'e Nobel Edebiyat Ödülü\'nü kazandırmıştır?',
        answer: [
            { text: 'Lord of the Flies', correct: true },
            { text: '1984', correct: false },
            { text: 'To Kill a Mockingbird', correct: false },
            { text: 'The Great Gatsby', correct: false }
        ]
    },
    {
        question: 'En yüksek dağ zirvesi olan Everest Dağı hangi dağ silsilesindedir?',
        answer: [
            { text: 'And Dağları', correct: false },
            { text: 'Alp Dağları', correct: false },
            { text: 'Himalaya Dağları', correct: true },
            { text: 'Rocky Dağları', correct: false }
        ]
    },
    {
        question: 'Hangi yıl Türkiye Cumhuriyeti resmen ilan edilmiştir?',
        answer: [
            { text: '1920', correct: false },
            { text: '1923', correct: true },
            { text: '1930', correct: false },
            { text: '1940', correct: false }
        ]
    }
];


const questionTitle = document.querySelector('#question-title');
const answerButtons = document.querySelector('.answer-buttons');
const nextBtn = document.querySelector('#next-btn');

let score = 0;
let currentQuestionIndex = 0;

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    showQuestion();
}

function showQuestion() {
    resetState();

    nextBtn.innerHTML = 'Next';

    questionTitle.innerHTML = `${currentQuestionIndex + 1} . ${questions[currentQuestionIndex].question}`;

    questions[currentQuestionIndex].answer.forEach(answer => {
        const button = document.createElement('button');
        button.classList.add('btn');
        button.innerHTML = answer.text;
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    nextBtn.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === 'true';

    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('incorrect');
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        } else {
            button.disabled = true;
        }
    });

    nextBtn.style.display = 'block';
}

function showScore() {
    resetState();
    questionTitle.innerHTML = `You scored ${score} out of ${questions.length}!!!`
    nextBtn.innerHTML = 'Play Again';
    nextBtn.style.display = 'block';
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})


startQuiz();