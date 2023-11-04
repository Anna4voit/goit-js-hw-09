import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { Report } from 'notiflix/build/notiflix-report-aio';

let timerId = null;

const inputEl = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

btnStart.disabled = true;

const styleOptions = {
  titleFontSize: '20px',
  messageFontSize: '18px',
  svgSize: '80px',
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= Date.now()) {
      Notiflix.Report.failure(
        'Attention',
        'Please choose a date in the future',
        'Okay',
        styleOptions
      );
    } else {
      inputEl.disabled = true;
      btnStart.disabled = false;
    }
  },
};
const fp = flatpickr(inputEl, options);

btnStart.addEventListener('click', startTimer);

function startTimer() {
  btnStart.disabled = true;
  timerId = setInterval(() => {
    const deltaDate = new Date(inputEl.value) - Date.now();

    if (deltaDate > 0) {
      timerValue(deltaDate);
    }

    if (deltaDate <= 0) {
      stopTimer();
      Notiflix.Report.info(
        'Timer stopped',
        'To start again, please reload page and choose new date',
        'Okay',
        styleOptions
      );
      return;
    }
  }, 1000);
}

function timerValue(val) {
  const { days, hours, minutes, seconds } = convertMs(val);
  dataDays.textContent = addLeadingZero(days);
  dataHours.textContent = addLeadingZero(hours);
  dataMinutes.textContent = addLeadingZero(minutes);
  dataSeconds.textContent = addLeadingZero(seconds);
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function stopTimer() {
  clearInterval(timerId);
}
