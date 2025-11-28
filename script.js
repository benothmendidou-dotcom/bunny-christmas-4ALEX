// Photos as base64 (replace with actual base64 from your uploads; for now, placeholders)
const photos = [
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdAB//Z', // Photo 1: Bunny hat
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdAB//Z', // Photo 2: Devil horns
    // Add more base64 for all 8 photos - to get base64, upload to a site like base64.guru and copy
    // For now, use placeholders; replace with real ones from your images
];

const messages = [
    "Forever Christmas, forever yours",
    "If I ever had a Christmas, you're the first gift I want in my list!",
    "Santa gave you a break to celebrate my little elf? :)",
    "It's snowing, and yet you're there making me melt",
    "Forever my cutie bunny"
];

let messageIndex = 0;
let giftsOpened = 0;

// Snow effect
function createSnow() {
    const snowContainer = document.getElementById('snow-container');
    for (let i = 0; i < 25; i++) {
        const snow = document.createElement('div');
        snow.classList.add('snowflake');
        snow.innerHTML = '❄️';
        snow.style.left = Math.random() * 100 + 'vw';
        snow.style.animationDuration = (Math.random() * 3 + 2) + 's';
        snow.style.opacity = Math.random();
        snowContainer.appendChild(snow);
        setTimeout(() => snow.remove(), 5000);
    }
}
setInterval(createSnow, 600);

// Twinkling lights (already in CSS)

// Countdown to Christmas 2025 (Dec 25, 00:00 UTC - adjust if needed)
function updateCountdown() {
    const now = new Date();
    const christmas = new Date('2025-12-25T00:00:00Z');
    const diff = christmas - now;
    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        document.getElementById('timer').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else {
        document.getElementById('timer').innerHTML = "It's Christmas Morning! 🎄";
        showFinalLetter();
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Add photos to gallery
function addPhotos() {
    const gallery = document.getElementById('gallery');
    photos.forEach((photo, index) => {
        const img = document.createElement('img');
        img.src = photo;
        img.classList.add('gallery-photo');
        img.alt = `Memory ${index + 1}`;
        gallery.appendChild(img);
    });
    // For final photo, use the last one
    document.getElementById('final-photo').src = photos[photos.length - 1];
}
addPhotos();

// Add clickable gifts
function addGifts() {
    const container = document.getElementById('gifts-container');
    for (let i = 0; i < 5; i++) { // 5 gifts for your 5 messages
        const gift = document.createElement('div');
        gift.classList.add('gift');
        gift.addEventListener('click', () => openGift(i));
        container.appendChild(gift);
    }
}
addGifts();

// Open gift popup
function openGift(index) {
    if (index >= messages.length) return;
    const popup = document.createElement('div');
    popup.classList.add('message-popup');
    popup.innerHTML = `
        <img src="${photos[index % photos.length]}" alt="Sweet Memory">
        <p>${messages[index]}</p>
        <button class="close-btn" onclick="this.parentElement.remove(); giftsOpened++; if (giftsOpened === ${messages.length}) showFinalLetter();">💕 Close & Next Gift</button>
    `;
    document.body.appendChild(popup);
    popup.style.display = 'block';
    
    // Heart pop animation
    for (let j = 0; j < 5; j++) {
        setTimeout(() => createHeart(), j * 200);
    }
}

function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '50vh';
    heart.style.fontSize = '30px';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'floatUp 1s ease-out forwards';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
}

// Add CSS for heart animation (inline for simplicity)
const style = document.createElement('style');
style.innerHTML = `
    @keyframes floatUp {
        to {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Show final letter
function showFinalLetter() {
    document.getElementById('final-letter').classList.remove('hidden');
    document.getElementById('gifts-container').style.display = 'none';
    document.getElementById('countdown').innerHTML = '<h2>Merry Christmas, Bunny!</h2><p>The best is now... 💝</p>';
}

// Music toggle
document.getElementById('music-toggle').addEventListener('click', () => {
    const audio = document.getElementById('bg-music');
    if (audio.paused) {
        audio.play();
        document.getElementById('music-toggle').innerHTML = '🎵 (Playing)';
    } else {
        audio.pause();
        document.getElementById('music-toggle').innerHTML = '🔇 (Paused)';
    }
});

// Auto-start music (with user interaction fallback)
document.addEventListener('click', () => {
    document.getElementById('bg-music').play().catch(() => {}); // Browser policy
}, { once: true });
