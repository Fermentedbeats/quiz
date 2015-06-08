

start();

// Creates question literals, instantiates a Quiz object instance, adds button event handler***********************

function start(){

	var quest1 = {
		question: "What is my name?",
		choices: ["Scott", "Travis", "Dingle"],
		correctAnswer: 0
	}

	var quest2 = {
		question: "How old am I?",
		choices: ["39", "Dirt", "189" ], 
		correctAnswer: 1
	}

	var quest3 = {
		question: "Why?",
		choices: ["Because", "Jesus", "Mom"],
		correctAnswer: 2
	}

	var questionArray = [quest1, quest2, quest3];


	var quiz = new Quiz(questionArray, thisHelper);
	quiz.showQuestions();

	$("button").click('click', function(){
		thisHelper("answer");
	});



// Helper function to keep THIS value when using JQuery ***********************************************************	

	function thisHelper(value){
		if(value === "show"){
			quiz.showQuestions();
		}
		else if (value === "answer"){
			quiz.answerCheck();
		}
		else {
			quiz.scorePage();
		}

	}

	

}


//Quiz constructor ************************************************************************************************

function Quiz(array, thisHelper){

	this.questionArray = array;
	this.num = 0;
	this.score = 0;

//Updates values of radio buttons and labels, updates DOM *********************************************************

	this.showQuestions = function(){

							var div = document.getElementById("question");
							div.innerHTML = this.questionArray[this.num].question;

							var radioB = document.getElementsByName('choices');
							var labels = document.getElementsByTagName('label');
							for(var i = 0; i<radioB.length; i++){
								radioB[i].value = this.questionArray[this.num].choices[i];	
								radioB[i].checked = false;
								console.log("----" + radioB[i].value);		
							}

							for(var k = 0; k<labels.length; k++){
								
								$(labels[k]).replaceWith("<label>" + radioB[k].value + "</label>");
							}							
	
						}

// Checks to see if answer is correct; diplays message; goes to next question ************************************

	this.answerCheck = function(){
							var checked = false;
							var radioB = document.getElementsByName('choices');
	
							for(var i =0; i < radioB.length; i++){
								if(radioB[i].checked === true){
									checked = true;
									
									if(radioB[i].value === this.questionArray[this.num].choices[this.questionArray[this.num].correctAnswer]){
										console.log("CORRECT!!!");
										$('#message').replaceWith("<p id='message'>CORRECT!!!</p>");
										$('#message').fadeTo(500, 1);
										this.score+=100;
										this.nextQuestion();			
									}
									else{
										console.log("INCORRECT!!!");
										$('#message').replaceWith("<p id='message'>INCORRECT!!!</p>");
										$('#message').fadeTo(500, 1);
										this.nextQuestion();
									}
								}
							}

							if(checked === false){
								console.log("You didn't answer the question");
								$('#message').replaceWith("<p id='message'>ANSWER THE QUESTION!!!</p>");
								$('#message').fadeTo(500, 1);
																	
								this.showQuestions();
							}
						}

// Goes to next question if there's another; goes to score page if not*********************************************8

	this.nextQuestion = function(){
							this.num++;
							if(this.num === this.questionArray.length){
								$('#message').fadeTo(1000, 0, function(){
									thisHelper("score");
								});
								
							}
							else {
								
								$('#message').fadeTo(1000, 0, function(){
									thisHelper("show");
								});
							}
						}	

// Creates score page; creates reset button and handler ************************************************************

	this.scorePage = function(){

							var header = $('h1');
							header.replaceWith("<h1>Your Final Score: </h1>");

							var div = document.getElementById("question");
							div.innerHTML = this.score + " points";
							var form = $('form');
							form.remove();
							$('button').replaceWith("<button type='button'>Reset</button");
							$('button').click('click', function(){
								$('button').replaceWith("<button type='button'>Next</button>");
								$('#form').append(form);
								$('h1').replaceWith(header);
								start();
							});

						}

	
						
}









