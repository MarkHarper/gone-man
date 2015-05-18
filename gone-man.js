var hangmanWords = [
  "the","of","and","a","to","in","is","you","that","it","he",
  "was","for","on","are","as","with","his","they","I","at","be",
  "this","have","from","or","one","had","by","word","but","not",
  "what","all","were","we","when","your","can","said","there",
  "use","an","each","which","she","do","how","their","if","will",
  "up","other","about","out","many","then","them","these","so",
  "some","her","would","make","like","him","into","time","has",
  "look","two","more","write","go","see","number","no","way",
  "could","people","my","than","first","water","been","call",
  "who","oil","its","now","find","long","down","day","did","get",
  "come","made","may","part"
];

var txt = document.querySelector('.guess');
var btn = document.querySelector('button');
var h1 = document.querySelector('h1');
var guess = "";
var resetBtn = document.querySelector('.reset');
var cloud = document.getElementsByClassName('cloud');
var sun = document.querySelector('.sun');
var alien = document.querySelector('.alien');
var cloud1 = document.getElementById('cloud1');
var cloud2 = document.getElementById('cloud2');
var cloud3 = document.getElementById('cloud3');
var cloud4 = document.getElementById('cloud4');
var cloud5 = document.getElementById('cloud5');
var manContainer = document.querySelector('.man-container');
var dog = document.querySelector('.dog');
var night = document.querySelector('.night');

function filter (wordList) {
  for (var i = 0; i<wordList.length; i++) {
    if (wordList[i].length<3) {
      wordList.splice(i,1);
      i-=i;
    }
  }
  return hangmanWords;
}

function randomIndex (filterList) {
  var randIndex = Math.floor(Math.random()*77);
  return filterList[randIndex];
}

var answer = randomIndex(filter(hangmanWords));

var answerField = [];

var empty = document.querySelector('span');

function displayMystery (answerWord) {
  for (var g = 0; g<answerWord.length; g++) {
    answerField.push("_")
  }
  empty.textContent=answerField.join("");
}

displayMystery(answer);
console.log(answer);

function checkGuess (answerWord) {
  var correct = 0;
  for (var h = 0; h<answerWord.length;h++) {
    if (answerWord.charAt(h)===guess) {
      answerField[h]=guess;
      correct += 1;
    }
  }
  if (correct==0) {
    incorrectCount +=1;
    changeSetting(incorrectCount);
    console.log(incorrectCount);
  }
  txt.value = '';
  empty.textContent=answerField.join("");
}

var incorrectCount = 0;

btn.addEventListener('click', function () {
  guess = txt.value;
  checkGuess(answer);
  checkForLoss(incorrectCount);
  if (checkForWin(answerField)) {
    h1.textContent='You Win!';
  };
})

function reset () {
  answer = randomIndex(filter(hangmanWords));
  answerField = [];
  displayMystery(answer);
  txt.value = '';
  incorrectCount = 0;
  console.log(answer);
  h1.textContent='Gone Man';
}

function checkForWin (field) {
  for (var h = 0; h<field.length;h++) {
    if (field[h]==="_") {
      return false;
    }
  }
  return true;
}

function checkForLoss (incorrect) {
  if (incorrect>7) {
    h1.textContent='You lose!';
    return true;
  }
}

function changeSetting (incorrect) {
  if (incorrect==1) {
    h1.textContent='I coming for you!!!!';
    appear(alien);
  }
  else if (incorrect==2) {
    hide(cloud5);
    hide(cloud1);
    moveSun(sun);
    hide(alien);
    h1.textContent='That is not too bad';
  }
  else if (incorrect==3) {
    hide(sun);
    lighten(dog);
    darken(manContainer,cloud2,cloud3,cloud4);
    h1.textContent='Come on, It is getting darker!';
  }
  else if (incorrect==4) {
    appear(alien);
    hide(cloud3);
    appear(cloud1);
    appear(cloud5);
    hide(cloud4);
    darken2(manContainer);
    appear(night);
    h1.textContent='I am not joking!';
  }
}

resetBtn.addEventListener('click', function () {
  reset();
})

function hide (element) {
  element.style.opacity = '0';
  element.style.transition = '0.5s ease';
}

function appear (element) {
  element.style.opacity = '1';
  element.style.transition = '1.5s ease';
}

function moveSun (element) {
  element.style.left = '770';
  element.style.transition = '0.5s ease';
}

function returnSun (element) {
  element.style.left = '369';
  element.style.transition = '0.5s ease';
}

function darken (element1,element2,element3,element4) {
  element1.style.background = 'linear-gradient(to bottom, HSLA(198, 40%, 20%, 1) 5%, HSLA(198, 40%, 20%, 1) 240px, HSLA(134, 8%, 50%, 1) 60px, HSLA(134, 8%, 50%, 1)50%)';
  element1.style.transition = '0.5s ease';
  element2.style.opacity = '0.3';
  element2.style.transition = '0.5s ease';
  element3.style.opacity = '0.4';
  element3.style.transition = '0.5s ease';
  element4.style.opacity = '0.2';
  element4.style.transition = '0.5s ease';
}

function darken2 (element1) {
  element1.style.background = 'linear-gradient(to bottom, HSLA(220, 20%, 20%, 1) 5%, HSLA(220, 20%, 20%, 1) 240px, HSLA(134, 1%, 20%, 1) 60px, HSLA(134, 1%, 20%, 1) 50%)';
  element1.style.transition = '0.5s ease';
}

function lighten (element1, element2) {
  element1.style.filter = 'alpha(opacity=80)';
  element1.style.opacity = '0.8';
}
