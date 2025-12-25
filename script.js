const photos = [
    'IMG_0532.jpg',
    'IMG_3025.jpg',
    'IMG_3204.jpg',
    'IMG_3468.jpg',
    'IMG_3599.jpg',
    'IMG_6068.jpg',
    'IMG_6141-1.jpg',
    'IMG_6762.jpg',
    'IMG_7196.jpg',
    'alex.jpg'
];

const messages = [
    "Forever Christmas, forever yours",
    "If I ever had a Christmas, you're the first gift I want in my list!",
    "Santa gave you a break to celebrate my little elf? :)",
    "It's snowing, and yet you're there making me melt",
    "Forever my cutie bunny"
];

let giftsOpened = 0;

// Gentle snow (fewer flakes, slower for romantic vibe)
function createSnow() {
    const snowContainer = document.getElementById('snow-container');
    for (let i = 0; i < 15; i++) { // Soft snowfall
        const snow = document.createElement('div');
        snow.classList.add('snowflake');
        snow.innerHTML = '❄️';
        snow.style.left = Math.random() * 100 + 'vw';
        snow.style.animationDuration = (Math.random() * 5 + 5) + 's';
        snow.style.opacity = Math.random() * 0.5 + 0.5;
        snowContainer.appendChild(snow);
        setTimeout(() => snow.remove(), 10000);
    }
}
setInterval(createSnow, 800);

// Add animated photos to gallery (NOW WITH YOUR REAL PHOTOS!)
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

// Add clickable gifts (5 gifts matching your 5 messages)
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

// Open gift with message + random photo + heart explosion
function openGift(index) {
    const popup = document.createElement('div');
    popup.classList.add('message-popup');
    const randomPhoto = photos[Math.floor(Math.random() * photos.length)]; // Random Bunny photo!
    popup.innerHTML = `
        <img src="${randomPhoto}" alt="Sweet Bunny Memory">
        <p>${messages[index]}</p>
        <button class="close-btn" onclick="this.parentElement.remove(); giftsOpened++; if(giftsOpened === ${messages.length}) document.getElementById('love-letter').scrollIntoView({behavior: 'smooth'});">💖 Next Gift</button>
    `;
    document.body.appendChild(popup);
    popup.style.display = 'block';

    // Heart + bunny explosion!
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
    heart.style.zIndex = '50';
    heart.style.animation = 'floatUp 2s ease-out forwards';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
}

// Heart animation CSS (inline)
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

// Music (works with your music.mp3 + Jingle Bells fallback)
const audio = document.getElementById('bg-music');
audio.volume = 0.3;  // Soft & romantic
audio.muted = true;  // Start muted (browser autoplay fix)

const toggle = document.getElementById('music-toggle');
toggle.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        audio.muted = false;
        toggle.innerHTML = '🎵 Playing Softly 🐰';
    } else {
        audio.pause();
        toggle.innerHTML = '🔇 Paused';
    }
});

// Unmute & play on first interaction (gift click, etc.)
document.addEventListener('click', () => {
    audio.play().then(() => {
        audio.muted = false;
    }).catch(() => {});
}, { once: true });

// Plushie squeak counter 🐰
let squeakCount = 0;
const plushie = document.getElementById('plushie');
const squeakCounter = document.getElementById('squeak-counter');
const squeakSound = document.getElementById('squeak-sound');

plushie.addEventListener('click', () => {
    squeakCount++;
    document.getElementById('counter-num').textContent = squeakCount;
    squeakCounter.classList.remove('hidden');
    
    // Play squeak
    squeakSound.currentTime = 0;
    squeakSound.play().catch(() => {}); // Silent fail if blocked
    
    // Hearts pop!
    createHeart();
    
    // Hide counter after 3 sec
    setTimeout(() => squeakCounter.classList.add('hidden'), 3000);
});
// All ready! Site loads with snow, photos, gifts, music toggle.
console.log('Bunny Christmas site ready! 🎄❤️');
