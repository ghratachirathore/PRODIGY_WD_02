let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCount = 0;
let timeElapsed = 0; // Store the time elapsed since the last lap

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lap-list');

function startTimer() {
    if (!running) {
        running = true;
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
    }
}

function stopTimer() {
    if (running) {
        clearInterval(tInterval);
        running = false;
        timeElapsed += difference; // Store the elapsed time since the last lap
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    display.textContent = "00:00:00";
    lapList.innerHTML = "";
    lapCount = 0;
    timeElapsed = 0;
}

function lapTimer() {
    if (running) {
        lapCount++;
        const lapTime = new Date().getTime() - startTime - timeElapsed;
        const formattedLapTime = formatTime(lapTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount}: ${formattedLapTime}`;
        lapList.appendChild(lapItem);
        timeElapsed += lapTime; // Update the timeElapsed to include the latest lap
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const formattedTime = formatTime(difference);
    display.textContent = formattedTime;
}

function formatTime(milliseconds) {
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapTimer);
