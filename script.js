// =========================================
// VEDA TECHNOLOGY - TASK 13
// COUNTDOWN TIMER
// =========================================

// Configure the target date here.
const targetDate = new Date("December 31, 2026 23:59:59").getTime();

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const targetDateElement = document.getElementById("target-date");
const messageElement = document.getElementById("message");

const formattedTargetDate = new Date(targetDate).toLocaleString(
    "en-IN",
    {
        dateStyle: "long",
        timeStyle: "short"
    }
);

targetDateElement.textContent = formattedTargetDate;

function updateCountdown() {

    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        messageElement.textContent = "Countdown complete!";
        messageElement.classList.add("completed");

        clearInterval(countdownInterval);

        return;
    }

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (difference % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (difference % (1000 * 60))
        / 1000
    );

    daysElement.textContent = String(days).padStart(2, "0");
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();

const countdownInterval = setInterval(
    updateCountdown,
    1000
);
