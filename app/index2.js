const answersList = ["SNOWMAN", "VANILLA", "JAVASCRIPT","PYTHON","CONSOLE","BOOLEAN","CHARACTER","PROTOTYPE",
"FUNCTION","METHOD","UNDEFINED","QUERYSELECTOR","FALSE","LENGTH",
"SUMMER","WINTER","SPRING","CALENDAR","CODING","SOCCER",
"BASEBALL","ORANGE","CUCOMBER","CARROT","VOLLEYBALL","GARBAGE","TELEVISION","CARAMEL",
"AMERICANO","RABBIT","TOMATO"];
const $hangmanImg = document.querySelectorAll(".hangman-img");
const hangmanImgArray = Array.prototype.slice.call($hangmanImg);

const CLASS_NAME_HIDDEN = "hidden";
const CLASS_NAME_VISIBLE_HANGMAN = "visible-hangman";
const CLASS_NAME_UNVISIBLE_HANGMAN = "hangman-img";
const CLASS_NAME_UNVISIBLE_ANSWER = "unvisible-answer";
const CLASS_NAME_VISIBLE_ANSWER = "visible-answer";
const CLASS_NAME_WRONG_ALPHABET = "wrong-alphabet";
const CLASS_NAME_CORRECT_ALPHABET = "correct-alphabet";
const CLASS_NAME_CONTENT_CONTAINER = "content-container";

const $hangmanWrapper = document.querySelector(".hangman-wrapper");
const $answerWrapper = document.querySelector(".answer-wrapper");
const $answerContainer = document.querySelector(".answer-container");
const $alphabetsWrapper = document.querySelector(".alphabets-wrapper");

const $alphabets = document.querySelectorAll(".alphabet");
const $inputAnswerWrapper = document.querySelector(".input-answer-wrapper");
const $inputAnswer = document.querySelector(".input-answer");
const $contentContainer = document.querySelector(".content-container");
const $startPageWrapper = document.querySelector(".start-page-wrapper");
const $chooseLevelWrapper = document.querySelector(".choose-level-wrapper");
const $correctMessageWrapper = document.querySelector(".correct-message-wrapper");
const $wrongMessageWrapper = document.querySelector(".wrong-message-wrapper");

const $startButtons = document.querySelectorAll(".start-button");
const $inputButton = document.querySelector(".input-button");

$contentContainer.className = CLASS_NAME_HIDDEN;
$chooseLevelWrapper.className = CLASS_NAME_HIDDEN;
$correctMessageWrapper.className = CLASS_NAME_HIDDEN;
$wrongMessageWrapper.className = CLASS_NAME_HIDDEN;

function handleStartButtonsClick() {
  let chanceIndex = 0;
  let correctCount = 0;
  let isCorrect = true;
  console.log("초기화 된 chance", chanceIndex);
  // 이전 정답 지우기
  while($answerContainer.hasChildNodes()){
    $answerContainer.removeChild($answerContainer.firstChild)
  }

  $inputButton.addEventListener("click", handleInputButtonClick);
  const alphabetsArray = Array.prototype.slice.call($alphabets);
  alphabetsArray.forEach((el) => {
    el.addEventListener("click", handleAlphabetClick, false);
  });
  alphabetsArray.forEach((el) => {
    el.className = "alphabet";
  });
  hangmanImgArray.forEach((el) => {
    el.className = CLASS_NAME_UNVISIBLE_HANGMAN;
  });

  // $inputAnswer.value = "";
  $correctMessageWrapper.className = CLASS_NAME_HIDDEN;
  $wrongMessageWrapper.className = CLASS_NAME_HIDDEN;
  $startPageWrapper.className = CLASS_NAME_HIDDEN;
  $contentContainer.className = CLASS_NAME_CONTENT_CONTAINER;

  const currentAnswer = Array.from(randomAnswer(answersList));
  currentAnswer.forEach((el) => {
    const $answer = document.createElement("div");
    $answerContainer.append($answer);
    $answer.textContent = el;
    $answer.id = el;
    $answer.className = CLASS_NAME_UNVISIBLE_ANSWER;

  });
  console.log(currentAnswer.length);

  function handleAlphabetClick (event) {
    const selectedTarget = event.target.id;
    const hasCorrectAlphabet = currentAnswer.filter((el) => {
      return selectedTarget === el;
    });
    
    // 게임 오버.
    if (chanceIndex === 9) {
      console.log("게임 오버 chanceIndex : ", chanceIndex);
      isCorrect = false;
      showResultMeassage(isCorrect);
      return;
    }
    // 모두 정답으로 클릭했을 때.
    if (correctCount === currentAnswer.length - 1) {
      console.log("모두 정답 chanceIndex : ", chanceIndex);
      isCorrect = true;
      showResultMeassage(isCorrect);
      return;
    };

    // 클릭한 알파벳 판단.
    if (hasCorrectAlphabet.length !== 0) {
      // 맞은 알파벳 색 변경
      $alphabetsWrapper.querySelector("#" + selectedTarget).className = CLASS_NAME_CORRECT_ALPHABET;
      $alphabetsWrapper.querySelector("#" + selectedTarget).removeEventListener("click", handleAlphabetClick, false);

      // 맞은 알파벳 정답에 표시.
      const correctAlphabet = $answerContainer.querySelectorAll("#" + selectedTarget);
      const correctAlphabetArray = Array.prototype.slice.call(correctAlphabet);
      correctAlphabetArray.forEach((el) => {
        el.className = CLASS_NAME_VISIBLE_ANSWER;
        correctCount++;
        console.log(correctCount);
      });
      return;
    }
    if (hasCorrectAlphabet.length === 0) {
      // 틀린 알파벳 색 변경.
      chanceIndex++;
      hangmanImgArray[chanceIndex].className = CLASS_NAME_VISIBLE_HANGMAN;
      console.log("selectedTarget : ", selectedTarget, "chanceIndex : ", chanceIndex);
      $alphabetsWrapper.querySelector("#" + selectedTarget).className = CLASS_NAME_WRONG_ALPHABET;
      $alphabetsWrapper.querySelector("#" + selectedTarget).removeEventListener("click", handleAlphabetClick, false);
      return;
    }

  }

  // input 정답 여부
  function handleInputButtonClick () {
    const inputValue = $inputAnswer.value;
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
      chanceIndex++;
      hangmanImgArray[chanceIndex].className = CLASS_NAME_VISIBLE_HANGMAN;
  
      console.log("input 오답 chanceIndex : ", chanceIndex);
  
    }

  function showResultMeassage(isCorrect) {
    $contentContainer.className = CLASS_NAME_HIDDEN;
    hangmanImgArray.forEach((el) => {
      el.className = CLASS_NAME_UNVISIBLE_HANGMAN;
    });
    alphabetsArray.forEach((el) => {
      el.removeEventListener("click", handleAlphabetClick, false);
    });
    $inputButton.removeEventListener("click", handleInputButtonClick);
    if (!isCorrect) {
      $wrongMessageWrapper.className = "wrong-message-wrapper";
      return;
    }
    $correctMessageWrapper.className = "correct-message-wrapper";
  }
}

function randomAnswer(answersList) {
  return answersList[Math.floor(Math.random() * answersList.length)];
}

const startButtonsArray = Array.prototype.slice.call($startButtons);
startButtonsArray.forEach((el) => {
  el.addEventListener("click", handleStartButtonsClick, false);
});