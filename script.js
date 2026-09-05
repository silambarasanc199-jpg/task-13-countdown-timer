/* =========================================
   VEDA TECHNOLOGY
   TASK 13 - COUNTDOWN TIMER
   ========================================= */


/*
   =========================================
   CONFIGURATION
   =========================================

   Change this date if you want a different
   countdown target.

   Format:
   "Month Day, Year HH:MM:SS"
*/

const targetDateString =
    "December 31, 2026 23:59:59";


/*
   Convert target date into milliseconds
*/

const targetDate =
    new Date(targetDateString).getTime();


/*
   Store the starting time.
*/

const startDate =
    new Date().getTime();


/*
   =========================================
   DOM ELEMENTS
   =========================================
*/

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

const statusText =
    document.getElementById("status-text");

const messageElement =
    document.getElementById("message");

const messageText =
    document.getElementById("message-text");

const progressBar =
    document.getElementById("progress-bar");

const progressText =
    document.getElementById("progress-text");


/*
   =========================================
   DISPLAY TARGET DATE
   =========================================
*/

function displayTargetDate() {

    const date =
        new Date(targetDate);


    if (isNaN(date.getTime())) {

        targetDateElement.textContent =
            "Invalid target date";

        return;
    }


    targetDateElement.textContent =
        date.toLocaleString(
            "en-IN",
            {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true
            }
        );
}


/*
   =========================================
   NUMBER FORMATTER
   =========================================
*/

function formatNumber(number) {

    return String(number)
        .padStart(2, "0");
}


/*
   =========================================
   UPDATE COUNTDOWN
   =========================================
*/

function updateCountdown() {

    const now =
        new Date().getTime();


    const difference =
        targetDate - now;


    /*
       =====================================
       COUNTDOWN COMPLETED
       =====================================
    */

    if (difference <= 0) {

        daysElement.textContent = "00";

        hoursElement.textContent = "00";

        minutesElement.textContent = "00";

        secondsElement.textContent = "00";


        statusText.textContent =
            "COMPLETED";


        messageText.textContent =
            "Countdown complete!";


        messageElement.classList.add(
            "completed"
        );


        progressText.textContent =
            "Target reached";


        progressBar.style.width =
            "0%";


        /*
           Stop interval.
        */

        if (countdownInterval) {

            clearInterval(
                countdownInterval
            );
        }


        return;
    }


    /*
       =====================================
       CALCULATE TIME
       =====================================
    */


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


    /*
       =====================================
       UPDATE DISPLAY
       =====================================
    */

    daysElement.textContent =
        formatNumber(days);


    hoursElement.textContent =
        formatNumber(hours);


    minutesElement.textContent =
        formatNumber(minutes);


    secondsElement.textContent =
        formatNumber(seconds);


    /*
       =====================================
       PROGRESS BAR
       =====================================
    */

    const totalDuration =
        targetDate - startDate;


    const elapsed =
        now - startDate;


    let progress =
        100 -
        (
            elapsed /
            totalDuration
        ) * 100;


    /*
       Keep progress between 0 and 100.
    */

    progress =
        Math.max(
            0,
            Math.min(
                100,
                progress
            )
        );


    progressBar.style.width =
        progress + "%";


    progressText.textContent =
        Math.round(progress) +
        "% remaining";
}


/*
   =========================================
   INITIALIZE
   =========================================
*/

displayTargetDate();


/*
   Declare interval variable before
   calling updateCountdown().
*/

let countdownInterval = null;


/*
   Run immediately so the page does not
   wait one second for the first update.
*/

updateCountdown();


/*
   =========================================
   UPDATE EVERY SECOND
   =========================================
*/

countdownInterval =
    setInterval(
        updateCountdown,
        1000
    );