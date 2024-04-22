// active watch bar -------------------------------------
const timerContents = document.querySelector(".timer_contents");
const stopwatchContents = document.querySelector(".stopwatch_contents");
const box = document.querySelectorAll(".box");

timerContents.style.display = "block";
stopwatchContents.style.display = "none";

box.forEach((value, index) => {
  value.addEventListener("click", () => {
    box.forEach((val, ind) => {
      if (index === ind) {
        val.setAttribute("id", "active");
        if (val.className === "timer box") {
          timerContents.style.display = "block";
          stopwatchContents.style.display = "none";
        } else {
          stopwatchContents.style.display = "block";
          timerContents.style.display = "none";
        }
      } else {
        val.removeAttribute("id");
      }
    });
  });
});
// -----------------------------------------------------------
const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");

let hour = 0;
let min = 0;
let sec = 0;
let mil_sec = 0;

let intevalID;

function stopWatchStart() {
  startBtn.style.display = "none";
  stopBtn.style.display = "block";
  timer = true;
  time();
}
function stopWatchStop() {
  startBtn.style.display = "block";
  stopBtn.style.display = "none";
  timer = false;
}
function stopWatchReset() {
  startBtn.style.display = "block";
  stopBtn.style.display = "none";
  hour = 0;
  min = 0;
  sec = 0;
  mil_sec = 0;
  timer = false;

  document.getElementById("stw-hr").innerHTML = "00";
  document.getElementById("stw-min").innerHTML = "00";
  document.getElementById("stw-sec").innerHTML = "00";
  document.getElementById("stw-mil_sec").innerHTML = "00";
  document.getElementById("hr-box").style.display = "none";
  document.getElementById("min-box").style.display = "none";
}

function time() {
  if (timer) {
    mil_sec++;
    if (mil_sec == 100) {
      sec++;
      mil_sec = 0;
    }
    if (sec == 60) {
      min++;
      sec = 0;
    }
    if (min == 60) {
      hour++;
      min = 0;
      sec = 0;
    }

    let hrString = hour;
    let minString = min;
    let secString = sec;
    let mil_secString = mil_sec;

    if (hour < 10) {
      hrString = "0" + hrString;
    }
    if (min < 10) {
      minString = "0" + minString;
    }
    if (sec < 10) {
      secString = "0" + secString;
    }
    if (mil_sec < 10) {
      mil_secString = "0" + mil_secString;
    }

    document.getElementById("stw-hr").innerHTML = hrString;
    document.getElementById("stw-min").innerHTML = minString;
    document.getElementById("stw-sec").innerHTML = secString;
    document.getElementById("stw-mil_sec").innerHTML = mil_secString;

    setTimeout(time, 10);

    if (min >= 1) {
      document.getElementById("min-box").style.display = "block";
    }

    if (hour >= 1) {
      document.getElementById("hr-box").style.display = "block";
    }
  }
}

// ------------------------------------------------

let timerOutput = document.querySelector(".timer_output");
let inputTimerData = document.querySelector("form");
let timer_div = document.querySelector(".input-sec");

const hrBox = document.getElementById("timer-hr-box");
const minBox = document.getElementById("timer-min-box");

let timerApp;

timer_div.addEventListener("click", (e) => {
  if (timerOutput.contains(e.target)) {
    timerOutput.style.display = "none";
    inputTimerData.style.display = "flex";
    clearInterval(timerApp);
    timerStartBtn.style.display = "block";
    timerStopBtn.style.display = "none";
  } else if (!inputTimerData.contains(e.target)) {
    timerOutput.style.display = "flex";
    inputTimerData.style.display = "none";
  }
});
let inputHour;
let inputMin;
let inputSec;

let outputHour = document.getElementById("timer-hr");
let outputMin = document.getElementById("timer-min");
let outputSec = document.getElementById("timer-sec");

let timerStartBtn = document.getElementById("timer-start");
let timerStopBtn = document.getElementById("timer-stop");

let timerStatus = document.querySelector(".time-status-bar span");

function handleInput() {
  inputHour = document.getElementById("Input-hour").value;
  inputMin = document.getElementById("Input-min").value;
  inputSec = document.getElementById("Input-sec").value;
}

function timerStart() {
  if (Number(inputHour) > 0 || Number(inputMin) > 0 || Number(inputSec) > 0) {
    timerOutput.style.display = "flex";
    inputTimerData.style.display = "none";

    timerStartBtn.style.display = "none";
    timerStopBtn.style.display = "block";

    // start min clock
    timerApp = setInterval(myClock, 1000);

    timerStatus.style.display = "block";
    timerStatus.style.animationPlayState = "running";
    timerStatus.style.animation = `progress ${totalTime()}s ease-in 1`;
  } else {
  }
}
let Test = 0;
function myClock() {
  if (inputSec > 0) {
    inputSec--;
    outputSec.innerHTML = inputSec;
    document.getElementById("Input-sec").value = inputSec;
  } else {
    if (inputMin > 0) {
      inputMin--;
      outputMin.innerHTML = inputMin;
      document.getElementById("Input-min").value = inputMin;
      inputSec = 59;
      outputSec.innerHTML = inputSec;
      document.getElementById("Input-sec").value = inputSec;
    } else {
      if (inputHour > 0) {
        inputHour--;
        outputHour.innerHTML = inputHour;
        document.getElementById("Input-hour").value = inputHour;
        inputMin = 59;
        outputMin.innerHTML = inputMin;
        document.getElementById("Input-min").value = inputMin;
        inputSec = 59;
        outputSec.innerHTML = inputSec;
        document.getElementById("Input-sec").value = inputSec;
      }
    }
  }

  if (inputMin > 0) {
    minBox.style.display = "block";
  }
  if (inputHour > 0) {
    hrBox.style.display = "block";
  }
  if (totalTime() === 0) {
    timerStatus.style.display = "none";
    var beepSound = new Audio("sound/1616.mp3");
    beepSound.play();
  }
}

function timerStop() {
  timerStartBtn.style.display = "block";
  timerStopBtn.style.display = "none";
  clearInterval(timerApp);
  timerStatus.style.animationPlayState = "paused";
}

function timerReset() {
  timerStartBtn.style.display = "block";
  timerStopBtn.style.display = "none";
  clearInterval(timerApp);

  document.getElementById("Input-hour").value = "";
  document.getElementById("Input-min").value = "";
  document.getElementById("Input-sec").value = "20";
  outputSec.innerHTML = "20";
  inputSec = "20";
  timerStatus.style.display = "none";
}

function totalTime() {
  let result =
    Number(inputHour) * 3600 + Number(inputMin) * 60 + Number(inputSec);
  return result;
}
const stopWatch = document.querySelector("body");
function openFullScreen() {
  if (stopWatch.requestFullscreen()) {
    stopWatch.requestFullscreen();
  }
}
