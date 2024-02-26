//Setting Game Name
let gameName = "Gusse The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Game Created By HU ©`;

// Setting Game Options
let numberOfTrise = 6;
let numberOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;

//Words
let wordToGuess = "";
const word = [
  "create",
  "update",
  "delete",
  "master",
  "eating",
  "easily",
  "roblox",
  "school",
  "gaming",
];

wordToGuess = word[Math.floor(Math.random() * word.length)].toLowerCase();
let messagAreaya = document.querySelector(".message");

// Hints
document.querySelector(`.hint span`).innerHTML = numberOfHints;
const getHintButton = document.querySelector(`.hint`);
getHintButton.addEventListener("click", getHint);

function generateInput() {
  const inputsContainer = document.querySelector(".inputs");

  for (let i = 1; i <= numberOfTrise; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;

    if (i !== 1) tryDiv.classList.add("disabled-inputs");

    for (let j = 1; j <= numberOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }

    inputsContainer.appendChild(tryDiv);
  }
  //inputsContainer.children[0];
  inputsContainer.children[0].children[1].focus();

  const inputsInDisabledDiv = document.querySelectorAll(
    ".disabled-inputs input"
  );
  inputsInDisabledDiv.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function (event) {
      if (event.key !== "Backspace") {
        this.value = this.value.toUpperCase();
        const nextInput = inputs[index + 1];
        if (nextInput) nextInput.focus();
      }
    });
    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(inputs).indexOf(this);
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }

      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
    });
  });
}

const guesssButton = document.querySelector(".check");
guesssButton.addEventListener("click", handleGuesses);
console.log(wordToGuess);

function handleGuesses() {
  let successGuess = true;
  for (let i = 1; i <= numberOfLetters; i++) {
    const inputFilde = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    const letter = inputFilde.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];

    //Game logic
    if (letter === actualLetter) {
      inputFilde.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inputFilde.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputFilde.classList.add("no");
      successGuess = false;
    }
  }

  // check if win
  if (successGuess) {
    messagAreaya.innerHTML = `YOU WIN THE WORD IS <span>${wordToGuess.toUpperCase()}</span>`;

    let allTryies = document.querySelectorAll(".inputs > div");
    allTryies.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
    guesssButton.disabled = true;
    getHintButton.disabled = true;
  } else {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-inputs");
    const currentTryInputs = document.querySelectorAll(
      `.try-${currentTry} input`
    );
    currentTryInputs.forEach((input) => (input.disabled = true));

    currentTry++;

    const nextTry = document.querySelectorAll(`.try-${currentTry} input`);
    nextTry.forEach((input) => (input.disabled = false));

    let el = document.querySelector(`.try-${currentTry}`);
    if (el) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("disabled-inputs");
      el.children[1].focus();
    } else {
      messagAreaya.innerHTML = `YOU LOSES THE WORD IS <span>${wordToGuess.toUpperCase()}</span>`;
      guesssButton.disabled = true;
      getHintButton.disabled = true;
    }
  }
}

function getHint() {
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector(`.hint span`).innerHTML = numberOfHints;
  }
  if (numberOfHints === 0) {
    getHintButton.disabled = true;
  }
  //const enabledInputs = document.querySelectorAll(`.try-${currentTry} input`);
  const enabledInputs = document.querySelectorAll("input:not([disabled])");
  const emptyEnabledInputs = Array.from(enabledInputs).filter(
    (input) => input.value === ""
  );
  if (emptyEnabledInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
    const randomInput = emptyEnabledInputs[randomIndex];
    const indexToFill = Array.from(enabledInputs).indexOf(randomInput);

    if (indexToFill !== -1) {
      randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }
  }
}

function Hdelete(event) {
  if (event.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);

    if (currentIndex > 0) {
      const currentInput = inputs[currentIndex];
      const prevInput = inputs[currentIndex - 1];
      currentInput.focus();
      //currentInput.value = "";
      //prevInput.focus();
      console.log(event.key);
    }
  }
}

window.onload = function () {
  generateInput();
};

document.addEventListener("keydown", Hdelete);
