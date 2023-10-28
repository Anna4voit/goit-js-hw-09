//random color
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

//set link on button by data-atribute
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

//default value of button-stop
btnStop.setAttribute('disabled', 'false');

btnStart.addEventListener('click', clickStart);
btnStop.addEventListener('click', clickStop);

//add timer
let timerId = null;

function clickStart(event) {
  btnStop.removeAttribute('disabled');
  btnStart.setAttribute('disabled', 'false');
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function clickStop(event) {
  btnStart.removeAttribute('disabled');
  btnStop.setAttribute('disabled', 'false');
  clearInterval(timerId);
}
