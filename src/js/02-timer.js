import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { Report } from 'notiflix/build/notiflix-report-aio';

let timerId = null;
let currentDate = null;
let selectedDate = null;

const inputEl = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= Date.now()) {
      //window.alert('Please choose a date in the future');
      // Notiflix.Notify.failure('Please choose a date in the future', {
      //   position: 'center-top',
      // });
      Notiflix.Report.failure(
        'Attention',
        'Please choose a date in the future',
        'Okay',
        {
          titleFontSize: '20px',
          messageFontSize: '18px',
          svgSize: '80px',
        }
      );
    } else {
      btnStart.disabled = false;
      const clickTimer = () => {
        selectedDate = selectedDates[0].getTime();
        startTimer();
      };
      btnStart.addEventListener('click', clickTimer);
    }
  },
};
const fp = flatpickr(inputEl, options);

function startTimer() {
  btnStart.disabled = true;
  timerId = setInterval(() => {
    currentDate = Date.now();
    const deltaDate = selectedDate - currentDate;

    if (deltaDate > 0) {
      const { days, hours, minutes, seconds } = convertMs(deltaDate);
      dataDays.textContent = addLeadingZero(days);
      dataHours.textContent = addLeadingZero(hours);
      dataMinutes.textContent = addLeadingZero(minutes);
      dataSeconds.textContent = addLeadingZero(seconds);
    }

    if (deltaDate <= 0) {
      stopTimer();
      Notiflix.Report.info(
        'Timer stopped',
        'To start again, please reload page and choose new date',
        'Okay',
        {
          titleFontSize: '20px',
          messageFontSize: '18px',
          svgSize: '80px',
        }
      );
      return;
    }
  }, 1000);
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
  currentDate = null;
  selectedDate = null;
  clearInterval(timerId);
}
