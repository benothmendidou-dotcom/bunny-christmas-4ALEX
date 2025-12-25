const photos = [
    'photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg',
    'photo5.jpg', 'photo6.jpg', 'photo7.jpg', 'photo8.jpg'
];

const messages = [
    "Forever Christmas, forever yours",
    "If I ever had a Christmas, you're the first gift I want in my list!",
    "Santa gave you a break to celebrate my little elf? :)",
    "It's snowing, and yet you're there making me melt",
    "Forever my cutie bunny"
];

let giftsOpened = 0;

// Gentle snow (fewer flakes, slower)
function createSnow() {
    const snowContainer = document.getElementById('snow-container');
    for (let i = 0; i < 15; i++) { // Softer: only 15 flakes
        const snow = document.createElement('div');
        snow.classList.add('snowflake');
        snow.innerHTML = '❄️';
        snow.style.left = Math.random() * 100 + 'vw';
        snow.style.animationDuration = (Math.random() * 5 + 5) + 's'; // Slower fall
        snow.style.opacity = Math.random() * 0.5 + 0.5;
        snowContainer.appendChild(snow);
        setTimeout(() => snow.remove(), 10000);
    }
}
setInterval(createSnow, 800); // Even less aggressive

// Add animated photos to gallery
function addPhotos() {
    const gallery = document.getElementById('gallery');
    photos.forEach((photo, index) => {
        const img = document.createElement('img');
        img.src = photo;
        img.classList.add('gallery-photo');
        img.alt = `Our Memory ${index + 1}`;
        img.style.animationDelay = `${index * 0.2}s`; // Staggered entry
        gallery.appendChild(img);
    });
}
addPhotos();

// Add clickable gifts
function addGifts() {
    const container = document.getElementById('gifts-container');
    messages.forEach((_, index) => {
        const gift = document.createElement('div');
        gift.classList.add('gift');
        gift.addEventListener('click', () => openGift(index));
        container.appendChild(gift);
    });
}
addGifts();

// Open gift with message + random photo + hearts
function openGift(index) {
    const popup = document.createElement('div');
    popup.classList.add('message-popup');
    const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
    popup.innerHTML = `
        <img src="${randomPhoto}" alt="Sweet Memory">
        <p>${messages[index]}</p>
        <button class="close-btn" onclick="this.parentElement.remove(); giftsOpened++; if(giftsOpened === ${messages.length}) document.getElementById('love-letter').scrollIntoView({behavior: 'smooth'});">💖 Close</button>
    `;
    document.body.appendChild(popup);
    popup.style.display = 'block';

    // Heart explosion
    for (let j = 0; j < 10; j++) {
        createHeart();
    }
}

function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️🐰';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = Math.random() * 100 + 'vh';
    heart.style.fontSize = '2em';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'floatUp 2s ease-out forwards';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
}

// Heart animation CSS (inline)
const style = document.createElement('style');
style.innerHTML = `
    @keyframes floatUp {
        to { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Music toggle
const audio = document.getElementById('bg-music');
const toggle = document.getElementById('music-toggle');
toggle.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        toggle.innerHTML = '🎵 Playing Softly';
    } else {
        audio.pause();
        toggle.innerHTML = '🔇 Paused';
    }
});

// Auto-play on load (browser safe)
document.addEventListener('click', () => audio.play().catch(() => {}), { once: true });
