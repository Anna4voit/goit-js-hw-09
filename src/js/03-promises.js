import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const form = e.target;
  let inputDelay = Number(form.delay.value);
  let inputAmount = Number(form.amount.value);
  let inputStep = Number(form.step.value);
  if (inputDelay < 0 || inputAmount < 0 || inputStep < 0) {
    Notiflix.Notify.warning('The number must be greater than 0. Try again');
  } else {
    for (let i = 0; i < inputAmount; i += 1) {
      let positions = i + 1;
      createPromise(positions, inputDelay + inputStep * i)
        .then(({ position, delay }) => {
          //console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          //console.log(`❌ Rejected promise ${position} in ${delay}ms`);
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
    }
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
