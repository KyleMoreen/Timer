let Timer = document.getElementById('timer');
let hour = 0;
let minute = 0;
let second = 0;

let interval;
let timerOn;

let hue = getComputedStyle(document.documentElement).getPropertyValue('--hue');
hue = Math.floor(Math.random() * 360);
document.documentElement.style.setProperty('--hue', hue);

function displayTimer() {
    Timer.innerHTML = hour.toString().padStart(2, '0') + ':' + minute.toString().padStart(2, '0') + ':' + second.toString().padStart(2, '0');
}

function addTime() {
    if (second < 59) {
        second++;
        displayTimer();
    }
    else if (second == 59 && minute < 59) {
        second = 0;
        minute++;
        displayTimer()
    }
    else if (second == 59 && minute == 59) {
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

displayTimer();

function startTimer() {
    if (!timerOn) {
        interval = setInterval(addTime, 1000);
        timerOn = true;
    }

    else if (timerOn === false) {
        interval = setInterval(addTime, 1000);
        timerOn = true;
    }
}

function stopTimer() {
    clearInterval(interval);
    timerOn = false;
}

function resetTimer() {
    hour = 0;
    minute = 0;
    second = 0;
    displayTimer();
}
