// Initialize Flickity
var elem = document.querySelector('.carousel');
var flkty = new Flickity(elem, {
    // options
    cellAlign: 'left',
    contain: true,
    wrapAround: true,
    autoPlay: false
});

// Function to calculate the remaining time until the next photo update
function updateCountdown() {
    const photoInterval = 5 * 60 * 1000; // 5 minutes in milliseconds
    const lastPhotoTime = new Date();
    lastPhotoTime.setHours(13);
    lastPhotoTime.setMinutes(26);
    lastPhotoTime.setSeconds(15);

    const now = new Date();
    let nextPhotoTime = new Date(lastPhotoTime.getTime() + photoInterval);

    if (now > nextPhotoTime) {
        // If current time is past the next photo time, adjust next photo time
        const missedIntervals = Math.floor((now - nextPhotoTime) / photoInterval);
        nextPhotoTime = new Date(nextPhotoTime.getTime() + (missedIntervals + 1) * photoInterval);
    }

    const timeDifference = nextPhotoTime - now;

    const minutes = Math.floor((timeDifference % (1000 * 3600)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    document.getElementById('countdown').textContent = `NEXT PHOTO UPDATE IN ${minutes}m ${seconds}s`;

    // Reload the page when the countdown reaches zero
    if (timeDifference <= 0) {
        location.reload();
    }
}

// Update the countdown every second
setInterval(updateCountdown, 1000);

// Initial countdown update
updateCountdown();

// Function to close the overlay
function closeOverlay() {
    document.getElementById('welcomeOverlay').style.display = 'none';
}

// Ensure the overlay is closed if the user has already seen it (using localStorage)
window.onload = function() {
    if (!localStorage.getItem('overlaySeen')) {
        document.getElementById('welcomeOverlay').style.display = 'flex';
    } else {
        document.getElementById('welcomeOverlay').style.display = 'none';
    }
};

// Set the overlaySeen flag when the overlay is closed
document.querySelector('.overlay button').addEventListener('click', function() {
    localStorage.setItem('overlaySeen', 'true');
});
