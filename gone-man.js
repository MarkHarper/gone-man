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
var resetBtn = document.querySelector('.reset')

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
  for (var h = 0; h<answerWord.length;h++) {
    if (answerWord.charAt(h)===guess) {
      answerField[h]=guess;
      empty.textContent=answerField.join("");
      txt.value = '';
    }
  }
}

function checkForLoss (x) {
  if (x>7) {
    h1.textContent='You lose!';
  }
}

var guessNumber = 0;

btn.addEventListener('click', function () {
  guess = txt.value;
  checkGuess(answer);
  guessNumber++;
  checkForLoss(guessNumber);
  if (checkForWin(answerField)) {
    h1.textContent='You Win!';
  };
})

function reset () {
  answer = randomIndex(filter(hangmanWords));
  answerField = [];
  displayMystery(answer);
  txt.value = '';
  guessNumber = 0;
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

function checkForLoss (x) {
  if (x>7) {
    h1.textContent='You lose!';
    return true;
  }
}

resetBtn.addEventListener('click', function () {
  reset();
})
