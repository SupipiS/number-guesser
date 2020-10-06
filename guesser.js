let button = document.querySelector("#button");
let txtGuess = document.querySelector("#txtGuess");
let messages = document.querySelector("#message");
let playAgainButton = document.querySelector("#playAgain");
let muteButton = document.querySelector("#btn");
let numToCompare = random();
let numOfGuesses = 0;
let previousGusses = [];
let mySoundWin;
let mySoundLoose;

button.addEventListener("click", onSubmit);
playAgainButton.addEventListener("click", newGame);
muteButton.addEventListener("click", mute);

function showMessage(msg) {
    document.getElementById('messages').innerHTML = msg;
}

function mute(src){
    mySoundWin.pause();
    mySoundLoose.pause();
}


function onSubmit(e) {
    e.preventDefault();
    let val = parseInt(txtGuess.value);

    if (validateGuess(val)) {
        numOfGuesses++;
        updateUI();

        if (val == numToCompare) {
            showMessage("You guessed correctly!")
            mySoundWin.play();
        } else if (val > numToCompare) {
            showMessage('Try a smaller num')
        } else if (val < numToCompare) {
            showMessage('Try a greater num')
        }

        if ((numOfGuesses === 3) && (val != numToCompare)) {
            showMessage(`Game over! Num to guess was ${numToCompare}`)
            mySoundLoose.play();
        }

    };
}

function updateUI() {
    remaining.innerHTML = `Guesses left:  ${3 - numOfGuesses}`;
}

function validateGuess(val) {


    if (isNaN(val) || val < 1 || val > 10) {
        showMessage("Please enter a valid number.");
        return false;
    }

    return true;

}



function random() {
    let num = Math.floor(Math.random() * 10) + 1;
    return num;
}

function startGame() {
    numToCompare = random();
    numOfGuesses = 0;
    clearInput();
    updateUI();
    showMessage("");
    mySoundWin = new sound("winner.mp3");
    mySoundLoose = new sound("loose.mp3");
    writeMessage('guess-list', '');
}

function clearInput(arguments) {
    const inputBox = document.getElementById('txtGuess');
    inputBox.value = "";
}

function newGame(e) {
    e.preventDefault();
    startGame();
}

let remaining = document.getElementById('remaining');

function init(arguments) { //initilizing the game
    startGame();
}
init();

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}


var input = document.getElementById("button");
input.addEventListener("keyup",
    function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("button").click();
        }
    });