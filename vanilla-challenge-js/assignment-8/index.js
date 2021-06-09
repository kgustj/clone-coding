const numberchose = document.querySelector("h3");
const range = document.getElementById("jsRange");
const play = document.querySelector(".play");
const numberinput = document.querySelector(".numberinput");
const choseinfo = document.querySelector(".choseinfo");
const winlose = document.querySelector(".winlose");

let rangesize = range.value;

function handleRangeChange(event) {
    rangesize = event.target.value;
    numberchose.innerText = `Generate a number between 0 and ${event.target.value}`
}

function playGame() {
    let randomnum = Math.floor(Math.random() * (parseInt(rangesize) + 1))
    if (numberinput.value !== "") {
        choseinfo.innerText = `You chose:${numberinput.value}, the machine chose:${randomnum}`
        if (randomnum == numberinput.value) {
            winlose.innerText = "You Win!"
        } else {
            winlose.innerText = "You Lose :("
        }
    } 
}

range.addEventListener("input", handleRangeChange);
play.addEventListener("click", playGame);
