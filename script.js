const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');
const durationInput = document.getElementById('durationInput');
const setDurationBtn = document.getElementById('setDurationBtn');
const add5Btn = document.getElementById('add5Btn');

let timer;
let timeLeft = 25 * 60; // Default 25 minutes
let running = false;
let paused = false;
let originalTime = 25 * 60;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

function updateButtonStates() {
    if (running && !paused) {
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        stopBtn.disabled = false;
        durationInput.disabled = true;
        setDurationBtn.disabled = true;
    } else if (running && paused) {
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        stopBtn.disabled = false;
        durationInput.disabled = true;
        setDurationBtn.disabled = true;
    } else {
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        stopBtn.disabled = true;
        durationInput.disabled = false;
        setDurationBtn.disabled = false;
    }
}

function startTimer() {
    if (running && !paused) return;
    
    if (paused) {
        // Resume from pause
        paused = false;
        startBtn.textContent = 'Start';
        pauseBtn.textContent = 'Pause';
    } else {
        // Start fresh
        running = true;
        originalTime = timeLeft;
    }
    
    updateButtonStates();
    
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timer);
            running = false;
            paused = false;
            updateButtonStates();
            alert('Timer finished!');
        }
    }, 1000);
}

function pauseTimer() {
    if (!running || paused) return;
    
    clearInterval(timer);
    paused = true;
    startBtn.textContent = 'Resume';
    pauseBtn.textContent = 'Paused';
    updateButtonStates();
}

function stopTimer() {
    clearInterval(timer);
    running = false;
    paused = false;
    timeLeft = originalTime;
    startBtn.textContent = 'Start';
    pauseBtn.textContent = 'Pause';
    updateDisplay();
    updateButtonStates();
}

function setDuration() {
    const minutes = parseInt(durationInput.value);
    if (minutes >= 1 && minutes <= 120) {
        timeLeft = minutes * 60;
        originalTime = timeLeft;
        updateDisplay();
    } else {
        alert('Please enter a duration between 1 and 120 minutes.');
    }
}

function add5Minutes() {
    timeLeft += 5 * 60; // Add 5 minutes
    if (!running) {
        originalTime = timeLeft;
    }
    updateDisplay();
}

// Event listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
stopBtn.addEventListener('click', stopTimer);
setDurationBtn.addEventListener('click', setDuration);
add5Btn.addEventListener('click', add5Minutes);

// Allow Enter key to set duration
durationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        setDuration();
    }
});

// Initialize
updateDisplay();
updateButtonStates(); 