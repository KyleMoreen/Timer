const State = {
    Off: 'off',
    Up: 'up',
    Down: 'down'
}

let Timer = document.getElementById('timer');
let hour = 0;
let minute = 0;
let second = 0;

let interval;
let timerState;

let hue = getComputedStyle(document.documentElement).getPropertyValue('--hue');
hue = Math.floor(Math.random() * 360);
document.documentElement.style.setProperty('--hue', hue);

function displayTimer() {
    Timer.innerHTML = hour.toString().padStart(2, '0') + ':' + minute.toString().padStart(2, '0') + ':' + second.toString().padStart(2, '0');
}

function countUp() {

    if (second < 59) {
        second++;
        displayTimer();
    }
    else if (second === 59 && minute < 59) {
        second = 0;
        minute++;
        displayTimer()
    }
    else if (second === 59 && minute === 59) {
        second = 0;
        minute = 0;
        hour++;
        displayTimer();
    }

    if (hue < 359) {
        document.documentElement.style.setProperty('--hue', hue++);
    }
    else if (hue >= 359) {
        hue = 0;
        document.documentElement.style.setProperty('--hue', hue);
    }
}

function countDown() {
    
    if (second > 0) {
        second--;
        displayTimer();
    }
    else if (second === 0 && minute > 0) {
        second = 59;
        minute--;
        displayTimer()
    }
    else if (second === 0 && minute === 0 && hour > 0) {
        second = 59;
        minute = 59;
        hour--;
        displayTimer();
    }
    else if (second === 0 && minute === 0 && hour === 0) {
        clearInterval(interval);
        timerState = State.Off;
    }

    if (hue < 359) {
        document.documentElement.style.setProperty('--hue', hue++);
    }
    else if (hue >= 359) {
        hue = 0;
        document.documentElement.style.setProperty('--hue', hue);
    }
}

function startCountUp() {

    if (!timerState) {
        interval = setInterval(countUp, 1000);
        timerState = State.Up;
    }
    else if (timerState === State.Off) {
        interval = setInterval(countUp, 1000);
        timerState = State.Up;
    }
    else if (timerState === State.Down) {
        clearInterval(interval);
        interval = setInterval(countUp, 1000);
        timerState = State.Up
    }
}

function startCountDown() {

    if (!timerState) {
        interval = setInterval(countDown, 1000);
        timerState = State.Down;
    }
    else if (timerState === State.Off) {
        interval = setInterval(countDown, 1000);
        timerState = State.Down;
    }
    else if (timerState === State.Up) {
        clearInterval(interval);
        interval = setInterval(countDown, 1000);
        timerState = State.Down;
    }
}

function pauseTimer() {
    clearInterval(interval);
    timerState = State.Off;
}

function resetTimer() {
    clearInterval(interval);
    timerState = State.Off;

    hour = 0;
    minute = 0;
    second = 0;
    displayTimer();
}

displayTimer();
