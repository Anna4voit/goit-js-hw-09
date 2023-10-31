//random color
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

//set link on button by data-atribute
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

//default value of button-stop
btnStop.disabled = true;

btnStart.addEventListener('click', clickStart);
btnStop.addEventListener('click', clickStop);

//add timer
let timerId = null;

function clickStart(event) {
  btnStop.disabled = false;
  btnStart.disabled = true;
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function clickStop(event) {
  btnStart.disabled = false;
  btnStop.disabled = true;
  clearInterval(timerId);
}
