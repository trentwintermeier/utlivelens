// Set the starting time (e.g., 09:39:55) as a string
const startTime = "09:39:55";
const intervalMinutes = 5; // 5-minute intervals

function getNextIntervalTime() {
    const now = new Date();
    const [startHours, startMinutes, startSeconds] = startTime.split(':').map(Number);

    // Create a Date object for the start time today
    let intervalDate = new Date(now);
    intervalDate.setHours(startHours, startMinutes, startSeconds, 0);

    // Calculate how many intervals have passed since the start time
    const timeSinceStart = now - intervalDate;
    const intervalsPassed = Math.floor(timeSinceStart / (intervalMinutes * 60 * 1000));
    
    // Set the next interval
    intervalDate.setMinutes(startMinutes + (intervalsPassed + 1) * intervalMinutes);

    // If the interval is in the past, move it to the next day
    if (now >= intervalDate) {
        intervalDate.setDate(intervalDate.getDate() + 1);
        intervalDate.setHours(startHours, startMinutes, startSeconds, 0);
    }

    return intervalDate;
}

function updateCountdown() {
    const targetDate = getNextIntervalTime();
    const now = new Date();
    const timeDifference = targetDate - now;

    if (timeDifference <= 0) {
        setTimeout(updateCountdown, 1000);
        return;
    }

    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);

    // Display the countdown in the format "mm:ss"
    document.getElementById('countdown').innerHTML = `${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;

    // Set up the countdown to update every second
    setTimeout(updateCountdown, 1000);
}

// Initialize the countdown
updateCountdown();
