import * as moment from 'moment';

const timer = document.getElementById('timer-setup');
const desc = document.getElementById('timer-desc');
const time = document.getElementById('time');
const plus = document.getElementById('plus');
const minus = document.getElementById('minus');
const buttonStart = document.getElementById('button-start');
const textDescIdle = 'Set time in minutes:';
const textDescProcess = 'Remaining:';

function getTime(): string {
  return time.innerHTML;
}

function inProcessing() {
  if (!timer.classList.contains('process')) {
    timer.classList.add('process');
    minus.style.visibility = 'hidden';
    plus.style.visibility = 'hidden';
    buttonStart.style.visibility = 'hidden';
    desc.innerHTML = textDescProcess;
  } else if (getTime() === '0:00') {
    timer.classList.remove('process');
    minus.style.visibility = 'visible';
    plus.style.visibility = 'visible';
    buttonStart.style.visibility = 'visible';
    desc.innerHTML = textDescIdle;
  }
}

function startTimer() {
  inProcessing();
  if (getTime() === '0:00') {
    time.innerHTML = '5';
    return;
  }
  time.innerHTML = moment(`${getTime()}`, 'm:ss')
    .subtract(1, 'seconds')
    .format('m:ss');
  setTimeout(startTimer, 1000);
}

function timerManipulation(currentTime: string, operation: string) {
  let result = Number(currentTime);
  switch (operation) {
    case '+':
      result += 1;
      break;
    case '-':
      result -= 1;
      break;
    default:
      break;
  }
  if (result < 60 && result > 0) {
    time.innerHTML = result.toString();
  }
}

buttonStart.onclick = startTimer;

plus.onclick = () => {
  timerManipulation(time.innerHTML, '+');
};

minus.onclick = () => {
  timerManipulation(time.innerHTML, '-');
};
