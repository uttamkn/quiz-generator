var res=0;
var myArr;
var y;
var qno=0;


function lock(x) {
    switch(x) {
        case 1: {y=x;if(myArr[x]==myArr[5].substring(8)){document.getElementById("op2").style.backgroundColor="#eee";document.getElementById("op3").style.backgroundColor="#eee";document.getElementById("op4").style.backgroundColor="#eee";document.getElementById("op1").style.backgroundColor="#097969"; } else {document.getElementById("op2").style.backgroundColor="#eee";document.getElementById("op3").style.backgroundColor="#eee";document.getElementById("op4").style.backgroundColor="#eee";document.getElementById("op1").style.backgroundColor="red";}
        check();
        next();}
        break;
        case 2: {y=x;if(myArr[x]==myArr[5].substring(8)){document.getElementById("op1").style.backgroundColor="#eee";document.getElementById("op3").style.backgroundColor="#eee";document.getElementById("op4").style.backgroundColor="#eee";document.getElementById("op2").style.backgroundColor="#097969"; } else {document.getElementById("op1").style.backgroundColor="#eee";document.getElementById("op3").style.backgroundColor="#eee";document.getElementById("op4").style.backgroundColor="#eee";document.getElementById("op2").style.backgroundColor="red";}
        check();
        next();}
        break;
        case 3: {y=x;if(myArr[x]==myArr[5].substring(8)){document.getElementById("op2").style.backgroundColor="#eee";document.getElementById("op1").style.backgroundColor="#eee";document.getElementById("op4").style.backgroundColor="#eee";document.getElementById("op3").style.backgroundColor="#097969"; } else {document.getElementById("op2").style.backgroundColor="#eee";document.getElementById("op1").style.backgroundColor="#eee";document.getElementById("op4").style.backgroundColor="#eee";document.getElementById("op3").style.backgroundColor="red";}
        check();
        next();}
        break;
        case 4: {y=x;if(myArr[x]==myArr[5].substring(8)){document.getElementById("op2").style.backgroundColor="#eee";document.getElementById("op3").style.backgroundColor="#eee";document.getElementById("op1").style.backgroundColor="#eee";document.getElementById("op4").style.backgroundColor="#097969"; } else {document.getElementById("op2").style.backgroundColor="#eee";document.getElementById("op3").style.backgroundColor="#eee";document.getElementById("op1").style.backgroundColor="#eee";document.getElementById("op4").style.backgroundColor="red";}
        check();
        next();}
        break;
    }
}

// const fetch = require('node-fetch');

const apiBase = "https://api.endpoints.anyscale.com/v1";
const token = "token";
const url = `${apiBase}/chat/completions`;
var apiResponse;

const body = {
  model: "mistralai/Mistral-7B-Instruct-v0.1",
  messages: [
    { role: "system", content: "You are quiz questions generating bot which generates simple and understandable quiz questions." },
    { role: "user", content: "Generate a quiz question related to any field like science, technology, history, etc. Follow the template: 'Question: <question goes here>?\nA) <Option 1>\nB) <Option 2>\nC) <Option 3>\nD) <Option 4>\nAnswer: <option letter>) <correct option>'" }
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

  if(qno<5){
  document.getElementById("next").innerHTML="next";
  }

  if(myArr[y]==myArr[5].substring(8)){
    res+=10;
  };
  document.getElementById("res").innerHTML="Score: "+res;
}

function submit() {
  // Assuming res is a global variable

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




