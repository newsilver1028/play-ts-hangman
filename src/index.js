var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var answersList = 
["JAVASCRIPT", "PYTHON", "CONSOLE", "BOOLEAN", "CHARACTER", "PROTOTYPE",
  "FUNCTION", "METHOD", "UNDEFINED", "FALSE", "LENGTH", "NUMBER", "SYMBOL",
  "SCOPE", "HOISTING", "THIS", "INSTANCE", "OBJECT", "PROPERTY", "PARAMETER", "CLOSURE", "NULL", "OPERATOR", "STRICT", "RETURN", "STRING", "ARRAY",
  "CALLBACK", "VARIABLE", "CONSTRUCTOR", "ARGUMENTS", "ITERABLE", "PROMISE"
];
var $hangmanImg = document.querySelectorAll(".hangman-img");
var hangmanImgArray = Array.prototype.slice.call($hangmanImg);
var CLASS_NAME_HIDDEN = "hidden";
var CLASS_NAME_VISIBLE_HANGMAN = "visible-hangman";
var CLASS_NAME_UNVISIBLE_HANGMAN = "hangman-img";
var CLASS_NAME_UNVISIBLE_ANSWER = "unvisible-answer";
var CLASS_NAME_VISIBLE_ANSWER = "visible-answer";
var CLASS_NAME_WRONG_ALPHABET = "wrong-alphabet";
var CLASS_NAME_CORRECT_ALPHABET = "correct-alphabet";
var CLASS_NAME_CONTENT_CONTAINER = "content-container";
var $hangmanWrapper = document.querySelector(".hangman-wrapper");
var $answerWrapper = document.querySelector(".answer-wrapper");
var $answerContainer = document.querySelector(".answer-container");
var $alphabetsWrapper = document.querySelector(".alphabets-wrapper");
var $timer = document.querySelector("#timer");
var $alphabets = document.querySelectorAll(".alphabet");
var $inputAnswerWrapper = document.querySelector(".input-answer-wrapper");
var $inputAnswer = document.querySelector(".input-answer");
var $contentContainer = document.querySelector(".content-container");
var $startPageWrapper = document.querySelector(".start-page-wrapper");
var $chooseLevelWrapper = document.querySelector(".choose-level-wrapper");
var $correctMessageWrapper = document.querySelector(".correct-message-wrapper");
var $wrongMessageWrapper = document.querySelector(".wrong-message-wrapper");
var $startButtons = document.querySelectorAll(".start-button");
var $inputButton = document.querySelector(".input-button");
$contentContainer.className = CLASS_NAME_HIDDEN;
$correctMessageWrapper.className = CLASS_NAME_HIDDEN;
$wrongMessageWrapper.className = CLASS_NAME_HIDDEN;
function handleStartButtonsClick() {
  var chanceIndex = 0;
  var correctCount = 0;
  var isCorrect = true;
  // 이전 정답 지우기
  while ($answerContainer.hasChildNodes()) {
    $answerContainer.removeChild($answerContainer.firstChild);
  }
  // 타이머 기능
  var sec = 20;
  var timer = setInterval(function () {
    $timer.innerHTML = sec.toString();
    sec -= 1;
    if (sec === -1) {
      hangmanImgArray[chanceIndex].className = CLASS_NAME_VISIBLE_HANGMAN;
      chanceIndex++;
      sec = 20;
    }
  }, 1000);
  $inputButton.addEventListener("click", handleInputButtonClick);
  var alphabetsArray = Array.prototype.slice.call($alphabets);
  alphabetsArray.forEach(function (el) {
    el.addEventListener("click", handleAlphabetClick, false);
  });
  alphabetsArray.forEach(function (el) {
    el.className = "alphabet";
  });
  hangmanImgArray.forEach(function (el) {
    el.className = CLASS_NAME_UNVISIBLE_HANGMAN;
  });
  $inputAnswer.value = "";
  $correctMessageWrapper.className = CLASS_NAME_HIDDEN;
  $wrongMessageWrapper.className = CLASS_NAME_HIDDEN;
  $startPageWrapper.className = CLASS_NAME_HIDDEN;
  $contentContainer.className = CLASS_NAME_CONTENT_CONTAINER;
  // const currentAnswer = Array.from(randomAnswer(answersList));
  var currentAnswer = __spreadArray([], randomAnswer(answersList), true);
  currentAnswer.forEach(function (el) {
    var $answer = document.createElement("div");
    $answerContainer.append($answer);
    $answer.textContent = el;
    $answer.id = el;
    $answer.className = CLASS_NAME_UNVISIBLE_ANSWER;
  });
  function handleAlphabetClick(event) {
    sec = 20;
    var selectedTarget = event.target.id;
    var hasCorrectAlphabet = currentAnswer.filter(function (el) {
      return selectedTarget === el;
    });
    // 게임 오버.
    if (chanceIndex === 9) {
      isCorrect = false;
      showResultMeassage(isCorrect);
      return;
    }
    // 모두 정답으로 클릭했을 때.
    if (correctCount === currentAnswer.length - 1) {
      isCorrect = true;
      showResultMeassage(isCorrect);
      return;
    }
    // 클릭한 알파벳 판단.
    if (hasCorrectAlphabet.length !== 0) {
      // 맞은 알파벳 색 변경
      setTimeout(function () {
        $alphabetsWrapper.querySelector("#" + selectedTarget).className = CLASS_NAME_CORRECT_ALPHABET;
        $alphabetsWrapper.querySelector("#" + selectedTarget).removeEventListener("click", handleAlphabetClick, false);
        // 맞은 알파벳 정답에 표시.
        var correctAlphabet = $answerContainer.querySelectorAll("#" + selectedTarget);
        var correctAlphabetArray = Array.prototype.slice.call(correctAlphabet);
        correctAlphabetArray.forEach(function (el) {
          el.className = CLASS_NAME_VISIBLE_ANSWER;
          correctCount++;
        });
      }, 200);
      return;
    }
    if (hasCorrectAlphabet.length === 0) {
    // 틀린 알파벳 색 변경.
      setTimeout(function () {
        hangmanImgArray[chanceIndex].className = CLASS_NAME_VISIBLE_HANGMAN;
        chanceIndex++;
        $alphabetsWrapper.querySelector("#" + selectedTarget).className = CLASS_NAME_WRONG_ALPHABET;
        $alphabetsWrapper.querySelector("#" + selectedTarget).removeEventListener("click", handleAlphabetClick, false);
        return;
      }, 200);
    }
  }
  // input 정답 여부
  function handleInputButtonClick() {
    sec = 20;
    var inputValue = $inputAnswer.value;
    setTimeout(function () {
      if (chanceIndex === 9) {
        isCorrect = false;
        showResultMeassage(isCorrect);
        return;
      }
      if (inputValue.toUpperCase() === currentAnswer.join("").replace(/ /g, "")) {
        isCorrect = true;
        showResultMeassage(isCorrect);
        return;
      }
      hangmanImgArray[chanceIndex].className = CLASS_NAME_VISIBLE_HANGMAN;
      chanceIndex++;
    }, 200);
  }
  function showResultMeassage(isCorrect) {
    clearInterval(timer);
    $contentContainer.className = CLASS_NAME_HIDDEN;
    hangmanImgArray.forEach(function (el) {
      el.className = CLASS_NAME_UNVISIBLE_HANGMAN;
    });
    alphabetsArray.forEach(function (el) {
      el.removeEventListener("click", handleAlphabetClick, false);
    });
    $inputButton.removeEventListener("click", handleInputButtonClick);
    if (!isCorrect) {
      $wrongMessageWrapper.querySelector(".correct-answer").textContent = "answer : ".concat(currentAnswer.join("").replace(/ /g, ""));
      $wrongMessageWrapper.className = "wrong-message-wrapper";
      return;
    }
    $correctMessageWrapper.querySelector(".correct-answer").textContent = "answer : ".concat(currentAnswer.join("").replace(/ /g, ""));
    $correctMessageWrapper.className = "correct-message-wrapper";
  }
}
function randomAnswer(answersList) {
  return answersList[Math.floor(Math.random() * answersList.length)];
}
var startButtonsArray = Array.prototype.slice.call($startButtons);
startButtonsArray.forEach(function (el) {
  el.addEventListener("click", handleStartButtonsClick, false);
});
