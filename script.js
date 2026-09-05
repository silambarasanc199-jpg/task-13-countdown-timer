// =========================================
// VEDA TECHNOLOGY - TASK 13
// PREMIUM COUNTDOWN TIMER
// =========================================

// Change only this date to configure the countdown.
const targetDate = new Date(
    "December 31, 2026 23:59:59"
).getTime();

const startDate = new Date().getTime();

const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");

const targetDateElement =
    document.getElementById("target-date");

const messageElement =
    document.getElementById("message");

const statusText =
    document.getElementById("status-text");

const progressBar =
    document.getElementById("progress-bar");

const progressText =
    document.getElementById("progress-text");

// Display target date
const formattedTargetDate =
    new Date(targetDate).toLocaleString(
        "en-IN",
        {
            dateStyle: "long",
            timeStyle: "short"
        }
    );

targetDateElement.textContent =
    formattedTargetDate;


// Format numbers with leading zero
function formatNumber(number) {

    return String(number).padStart(2, "0");

}


// Update countdown
function updateCountdown() {

    const now =
        new Date().getTime();

    const difference =
        targetDate - now;


    // Countdown completed
    if (difference <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        messageElement.innerHTML =
            '<span class="message-icon">●</span> Countdown complete!';

        messageElement.classList.add(
            "completed"
        );

        statusText.textContent =
            "COMPLETED";

        progressText.textContent =
            "Target reached";

        progressBar.style.width = "0%";

        clearInterval(countdownInterval);

        return;
    }


    // Calculate time units
    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (difference %
                (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (difference %
                (1000 * 60 * 60)) /
            (1000 * 60)
        );

    const seconds =
        Math.floor(
            (difference %
                (1000 * 60)) /
            1000
        );


    // Update DOM
    daysElement.textContent =
        formatNumber(days);

    hoursElement.textContent =
        formatNumber(hours);

    minutesElement.textContent =
        formatNumber(minutes);

    secondsElement.textContent =
        formatNumber(seconds);


    // Progress calculation
    const totalDuration =
        targetDate - startDate;

    const elapsed =
        now - startDate;

    let progress =
        100 -
        (elapsed / totalDuration) * 100;

    progress =
        Math.max(
            0,
            Math.min(100, progress)
        );

    progressBar.style.width =
        `${progress}%`;

    progressText.textContent =
        `${Math.round(progress)}% remaining`;
}


// Run immediately
updateCountdown();


// Update every second
const countdownInterval =
    setInterval(
        updateCountdown,
        1000
    );
