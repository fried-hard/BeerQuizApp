let beerQuestions = [
    {
        question: "I feel like having a slice of Sausage Pizza. What beer pairs best with my slice?",
        choices: ['Stout','IPA','Doppelbock','Cider'],
        answer: 1,
        answerInText: 'IPA'
    },

    {
        question: "Going to a friend's house for a BBQ and she's serving smoked brisket. What should I Bring?",
        choices: ['IPA','Lager','Gose', 'Brown Ale'],
        answer: 3, 
        answerInText: 'Brown Ale'

    },

    {
        question: "You're at your go to Japanese Izakaya and about to munch on some yakitori. What should you drink?",
        choices: ['Sake','Rose','Lager','Coffee IPA'],
        answer: 2,
        answerInText: 'Lager'
    },

    {
        question: "You happen to be at a Belgian beer bar and you ordered moule frites. What do you pair with this classic dish?",
        choices: ['Lambic','Barrel Aged stout','Barleywine','Pilsner'],
        answer: 0,
        answerInText: 'Lambic'
         
    },

    {
        question: "Gonna snack on some artisinal cheese tonight, What should I pair it with?",
        choices: ['Geueze','Dunkel','Irish Stout','Porter'],
        answer: 0,
        answerInText: 'Geueze'
    },

    {
        question: "Woooo! After all this food, thinking about dessert. I'm gonna indulge in some mille-fueille, what should I pair it with?",
        choices:['Saison','Raspberry Sour','East coast IPA','Bourbon barrel aged vanilla stout'],
        answer: 3,
        answerInText: 'Bourbon barrel aged vanilla stout'
        
    }
];


 let currentQuestion = 0;
 let questionCounter = 1;
 let totalQuestions = beerQuestions.length;
 let score = 0;

//Intro Page this function handles the start page of the quiz. This displays the quiz name and contains the button to start the quiz.
function startPage() {
    $('.quizPage').hide();
    $('.nextButton').hide();
    $('.resultsPage').hide();
    $('.container1').hide();
    
}
//Once the user clicks on the start button, this executes and renders the Quiz Page.
function startGame() {
    $('.start-button').on('click', function () {
        $('.start-quiz').fadeOut();
        //$('.resultsPage').hide();
        $('.quizPage').fadeIn();
        $('.container1').fadeIn();
       })
}
//This function displays the questions from the beerQuestions array which hooks to the #form in index.html 
function showQuestion() {
    $('#question').html(beerQuestions[currentQuestion].question);
    $('#choice0').html(beerQuestions[currentQuestion].choices[0]);
    $('#choice1').html(beerQuestions[currentQuestion].choices[1]);
    $('#choice2').html(beerQuestions[currentQuestion].choices[2]);
    $('#choice3').html(beerQuestions[currentQuestion].choices[3]);
    showScore();
    
}

//This function increments the question counter and indicates to the user what number question they are currently on. 
function incrementQuestion(){
    $('#questionNum').text(`${'Question: ' + questionCounter++ + '/' + beerQuestions.length}` );
}

//This function displays the user's score. 
function showScore() {
    $('#score').text(`${'Score: ' + score}`);
}

/*This function handles the user's submitted answer. When the user clicks on a radio button and clicks the submit button, 
the function will check if the selected radio button matches the answer in the beerQuestions' choices array.
If it matches, the score will increment to 5 and the rightAnswer function and showScore funtion will execute.
If the answer is wrong, the wrongAnswer function will execute. */
function onSubmit() {
    $('#form').on('submit', function(event) {
        event.preventDefault();
        let selectedAnswer = $('input:checked').val();
            let correctAnswer = beerQuestions[currentQuestion].answer;
                //$('#question').hide();
                   // $('#form').hide();
                         $('.nextButton').fadeIn();
                         $('.response').fadeIn();
                         $('.answerButton').fadeOut();
                         
        if (selectedAnswer == correctAnswer) {
            score+=5;
            showScore();
            rightAnswer();
    } else 
        {
            wrongAnswer();

        }
        //console.log(correctAnswer);
        //console.log(selectedAnswer);    
    })
}

//This function handles the response when the user chooses the correct answer.
function rightAnswer() {
    $('.response').html('Correct!');
        //nextQuestion();
        console.log(score);
} 
   
        

//This function handles the response when the user chooses the incorrect answer.
function wrongAnswer() {
   $('.response').html(`Wrong! The preferred pairing is a ${beerQuestions[currentQuestion].answerInText}`);
    //nextQuestion();
}



/*This function renders the next question after the user recieved the response from the wrongAnswer/rightAnswer functions. 
After the response, the user is given a 'next' button to continue to the next question. The user will go in to this cycle until the currentQuestion == 6. 
When the user is on the last question (6), the lastQuestion function will execute.*/
function nextQuestion() {
    $('.nextButton').on('click', function(){
        event.preventDefault();
        $('input[name="value"]').attr('checked', false);
        $('.answerButton').fadeIn();
        $('.nextButton').fadeOut();
        $('.response').fadeOut();
        $('#question').fadeIn();
        $('#form').fadeIn();
        currentQuestion++;
    if(currentQuestion == 6) {
        lastQuestion();
    } else {
         showQuestion();
            incrementQuestion();
        }
        
    })
}
/*This function handles the last question. After the user answers and recieves the 'response' and
 clicks on the 'next' button, the user is given the results. If the user scores 18 or more, it's a pass, else it's a fail.*/
function lastQuestion() {
  $('.quizPage').hide();  
  $('.resultsPage').fadeIn();
  $('.container1').hide();
    if(score >= 18) {
        $('.passFail').html(`You Passed! You scored ${score} out of 30`);
    }else  {
        $('.passFail').html(`Sorry, you Failed! You scored ${score} out of 30`);
    }

}
//Functions that Render the Quiz App. 
startPage();
startGame();
showQuestion();
incrementQuestion();
nextQuestion();
onSubmit();
//lastQuestion();