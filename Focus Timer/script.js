let workDuration = 25 * 60;
let restDuration = 5 * 60;
let isWork = true;
let timeLeft = workDuration;
let timerInterval = null;

const timerDisplay = document.getElementById('timer');
const sessionLabel = document.getElementById('session-label');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const chime = document.getElementById('chime');

const workDurationInput = document.getElementById('work-duration');
const restDurationInput = document.getElementById('rest-duration');
const setDurationsBtn = document.getElementById('set-durations');

function updateDisplay() {
  const min = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const sec = String(timeLeft % 60).padStart(2, '0');
  timerDisplay.textContent = `${min}:${sec}`;
  sessionLabel.textContent = isWork ? 'Work' : 'Rest';
}

function switchSession() {
  isWork = !isWork;
  timeLeft = isWork ? workDuration : restDuration;
  updateDisplay();
}

function playChime() {
  chime.currentTime = 0;
  chime.play();
}

function tick() {
  if (timeLeft > 0) {
    timeLeft--;
    updateDisplay();
  } else {
    playChime();
    switchSession();
  }
}

function startTimer() {
  if (!timerInterval) {
    timerInterval = setInterval(tick, 1000);
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  pauseTimer();
  timeLeft = isWork ? workDuration : restDuration;
  updateDisplay();
}

function setDurations() {
  pauseTimer(); // Stop the timer before changing durations
  workDuration = parseInt(workDurationInput.value) * 60;
  restDuration = parseInt(restDurationInput.value) * 60;

  if (isWork) {
    timeLeft = workDuration;
  } else {
    timeLeft = restDuration;
  }
  
  if (workDuration > 0 && restDuration > 0) {
      updateDisplay();
  } else {
      alert("Please set a valid duration.")
  }
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
setDurationsBtn.addEventListener('click', setDurations);

updateDisplay(); 