

$("button").click('click', answerCheck);

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
var num = 0;
var score = 0;

showQuestions();

function showQuestions(){

	var div = document.getElementById("question");
	div.innerHTML = questionArray[num].question;

	var radioB = document.getElementsByName('choices');
	for(var i = 0; i<radioB.length; i++){
		radioB[i].value = questionArray[num].choices[i];
		radioB[i].checked = false;
		
	}
	
	
}

function nextQuestion(){
	num++;
	if(num === questionArray.length){
		scorePage();
	}
	else {
	
		showQuestions();
	}
}

function answerCheck(){
	var checked = false;

	var radioB = document.getElementsByName('choices');
	for(var i =0; i < radioB.length; i++){
		if(radioB[i].checked === true){
			checked = true;

			if(radioB[i].value === questionArray[num].choices[questionArray[num].correctAnswer]){
				console.log("Correct");
				score+=100;
				nextQuestion();
			
			}
			else{
				console.log("Incorrect");
				nextQuestion();
			}
		}
	}

	if(checked === false){
		console.log("You didn't answer the question");
		showQuestions();
	}

	


}

function scorePage(){

	$('h1').replaceWith("<h1>Your Final Score: </h1>");

	var div = document.getElementById("question");
	div.innerHTML = score + " points";

	$('form').remove();
	
}







