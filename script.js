var res=0;
var myArr;
var y;
var qno=0;
var userInput=0;


// to display questions (starts the quiz)
if(qno==0){

  document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("start-button");
    const elements = document.querySelectorAll(".hide");

    toggleButton.addEventListener("click", function () {
        document.getElementById("menu").style.display = "none";
        elements.forEach(function (element) {
            element.style.display = "flex";
        });
    });
});
}


function takeInput() {
  userInput = document.getElementById("maxq").value
  setTimeout (next(), 200);
}



function lock(selectedOption) {
  y = selectedOption;

  // Reset background colors for all options
  for (let i = 1; i <= 4; i++) {
      document.getElementById(`op${i}`).style.backgroundColor = "#eee";
  }

  // green if correct and red if wrong
  if (myArr[selectedOption]==myArr[5].substring(8)){
      document.getElementById(`op${selectedOption}`).style.backgroundColor = "#097969";
  }
  else {
      document.getElementById(`op${selectedOption}`).style.backgroundColor = "#ff7f7f";
  }
  // Check the answer and proceed to the next question
  setTimeout(check, 200);
  setTimeout(next2, 900);
}




// const fetch = require('node-fetch');

const apiBase = "https://api.endpoints.anyscale.com/v1";
const token = "Your-token";
const url = `${apiBase}/chat/completions`;
var apiResponse;

const body = {
  model: "mistralai/Mistral-7B-Instruct-v0.1",
  messages: [
    { role: "system", content: "You are question generating bot which generates understandable quiz questions according to the given template." },
    { role: "user", content: "Generate one unique question related to maths, technology or science. Follow the template: 'Question: <question goes here>?\nA) <Option 1>\nB) <Option 2>\nC) <Option 3>\nD) <Option 4>\nAnswer: <option letter>) <correct option>' ensure you give the correct option letter with the corresponding option" }
  ],
  temperature: 0.7
};

function next() {
  
  
   document.getElementById("op1").style.backgroundColor="#eee";
   document.getElementById("op2").style.backgroundColor="#eee";
   document.getElementById("op3").style.backgroundColor="#eee";
   document.getElementById("op4").style.backgroundColor="#eee";

   qno++;
   document.getElementById("qno").innerHTML="Question "+qno+":";


   fetch(url, {
     method: 'POST',
     headers: {
        'Authorization': `Bearer ${token}`,
       'Content-Type': 'application/json',
     },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(data => {apiResponse = data.choices[0].message.content; console.log(apiResponse); myArr=apiResponse.split('\n'); document.getElementById("ques").innerHTML= myArr[0].substring(10); document.getElementById("op1").innerHTML= myArr[1]; document.getElementById("op2").innerHTML= myArr[2]; document.getElementById("op3").innerHTML= myArr[3]; document.getElementById("op4").innerHTML= myArr[4];})
      .catch(error => console.error('Error:', error));
    }


function check() {
  if (myArr && myArr.length > 5) {  // Check if myArr is defined and has enough elements

      if (myArr[y] == myArr[5].substring(8)) {
          res += 10;
      }
      document.getElementById("res").innerHTML = "Score: " + res;
  } else {
      console.error("WARNING: myArr is undefined or has insufficient elements.");
  }
}

function submit() {

  // Set the "res" value in the "thanks.html" file
  localStorage.setItem('finalScore', res);

  // Redirect to the "thanks.html" page
  window.location.href = 'thanks.html';
}

document.addEventListener('DOMContentLoaded', function() {
  // Retrieve the "res" value from localStorage
  var finalScore = localStorage.getItem('finalScore');

  // Display the "res" value on the page
  var finalScoreElement = document.getElementById('final-score');
  if (finalScoreElement && finalScore !== null) {
      finalScoreElement.innerHTML = "Final score: " + finalScore;
  }
});

function next2() {

  if(qno < Number(userInput)) {
    next();
  }
  else {
    submit();
  }
}