const questions = [
    {
        question: "what day was oscars?",
        optionA: "may 31",
        optionB: "may 30",
        optionC: "june 1",
        optionD: "july 1",
        correctOption: "optionA"
    },

    {
        question: "what day was the promposal",
        optionA: "june 4",
        optionB: "june 3",
        optionC: "june 2",
        optionD: "june 1 ",
        correctOption: "optionB"
    },

    {
        question: "who's my favourite movie director",
        optionA: "Hayao Miyazaki",
        optionB: "Wong Kar Wai",
        optionC: "Akira Kurosawa",
        optionD: "Zhang Yimou",
        correctOption: "optionB"
    },

    {
        question: "how long will we be together",
        optionA: "10 years",
        optionB: "100 years",
        optionC: "1000 years",
        optionD: "forever",
        correctOption: "optionD"
    },

    {
        question: "what's my favourite colour?",
        optionA: "red",
        optionB: "orange",
        optionC: "green",
        optionD: "blue",
        correctOption: "optionD"
    },

    {
        question: "who's taller",
        optionA: "me",
        optionB: "you",
        optionC: "",
        optionD: "",
        correctOption: "optionA"
    },

    {
        question: "what is my favourite food",
        optionA: "pho",
        optionB: "spaghetti",
        optionC: "fried rice",
        optionD: "pizza",
        correctOption: "optionA"
    },

    {
        question: "im chinese and _____ mixed",
        optionA: "scottish",
        optionB: "irish",
        optionC: "australian",
        optionD: "italian",
        correctOption: "optionA"
    },

    {
        question: "without looking, how many 8s are in your insgram handle",
        optionA: "2",
        optionB: "3",
        optionC: "4",
        optionD: "5",
        correctOption: "optionB"
    },

    {
        question: "what did we name the panda?",
        optionA: "dudu",
        optionB: "edwin",
        optionC: "josh",
        optionD: "henry",
        correctOption: "optionD"
    },

]


let shuffledQuestions = [] //empty array to hold shuffled selected questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0

// function for displaying next question in the array to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })
   
    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    //delays next question displaying for a second
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "erm"
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "almostt honey"
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "good job i'm proud of u :)"
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal and resets game
function closeScoreModal() {
    document.getElementById('score-modal').style.display = "none"
    window.location.href = "deciphered.html";

}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}