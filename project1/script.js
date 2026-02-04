// character inst
const characters = {
    selfie: {
        name: "The Selfie Queen 📸",
        description: "You see every moment as a photo op. Elevator lighting? Chef's kiss. You've mastered the art of the casual mirror check and you always know your best angles.",
        tagline: "Living life one selfie at a time.",
        color: "#F5004F"
    },
    loud: {
        name: "The Loud Speaker 📢",
        description: "Your phone is permanently on speaker mode and volume is set to MAX. Why whisper when everyone deserves to hear your conversation? The elevator is your stage.",
        tagline: "Can you hear me now? GOOD.",
        color: "#FFAF00"
    },
    texter: {
        name: "The Frantic Texter 📱",
        description: "Your nails create a symphony of clicks as you furiously type. Emergencies, gossip, memes — everything needs to be sent RIGHT NOW. The elevator WiFi better not fail you.",
        tagline: "*click click click* sorry *click* one sec.",
        color: "#7C00FE"
    },
    butterfly: {
        name: "The Social Butterfly 🦋",
        description: "You can make friends anywhere, including a 30-second elevator ride. Weather, weekend plans, compliments — you've got endless small talk fuel. Awkward silence? Not on your watch.",
        tagline: "Let's be friends! We have 12 floors to bond.",
        color: "#F9E400"
    }
};

// comments for the IG live look
const preloadedComments = [
    { user: "elev8fan",   text: "omg this is so funny 💀",                color: "#7C00FE" },
    { user: "sarah_m",    text: "the selfie queen is literally ME",       color: "#F5004F" },
    { user: "kevin_k",    text: "LMAOOO the loud speaker 🤣",            color: "#FFAF00" },
    { user: "luna.x",     text: "i relate to the texter so much",        color: "#F9E400" },
    { user: "mike22",     text: "this is literally my elevator lol",     color: "#7C00FE" },
    { user: "jade_rose",  text: "the nail clicking killed me 😂😂",      color: "#F5004F" },
    { user: "alex_t",     text: "social butterfly said HELLO 🦋",        color: "#FFAF00" },
    { user: "emma.js",    text: "wait this is actually genius ngl",      color: "#F9E400" },
    { user: "dan_cool",   text: "the sound effects lmaooo 💀💀💀",      color: "#7C00FE" },
    { user: "olivia_w",   text: "i'm literally crying this is too real", color: "#F5004F" },
    { user: "chris44",    text: "elevator comedies > everything",        color: "#FFAF00" },
    { user: "nina.star",  text: "selfie queen needs her own show fr",    color: "#F9E400" },
    { user: "jason_b",    text: "the loud speaker on SPEAKER MODE 💀",  color: "#7C00FE" },
    { user: "maya.r",     text: "why is this so relatable omg",         color: "#F5004F" },
    { user: "tommy_x",    text: "i literally do this every single day", color: "#FFAF00" },
    { user: "grace.h",    text: "the butterfly is goals actually 🦋✨", color: "#F9E400" },
    { user: "sam_d",      text: "HOLD THE DOOR lmaooo dead 💀",        color: "#7C00FE" },
    { user: "rachel_q",   text: "this made my whole day fr fr",         color: "#F5004F" },
    { user: "lucas.m",    text: "elevator content is underrated",       color: "#FFAF00" },
    { user: "zara.k",     text: "okay the click click click 😭😭",      color: "#F9E400" },
    { user: "ben_w",      text: "i'm the loud speaker and i'm not sorry", color: "#7C00FE" },
    { user: "chloe.r",    text: "this has no business being this funny", color: "#F5004F" },
    { user: "daniel.s",   text: "the meme sounds make it 10x better 😩", color: "#FFAF00" },
    { user: "anna.k",     text: "my friends NEED to see this rn",       color: "#F9E400" }
];

// reaction emojis
const heartEmojis = [
    '❤️', '❤️', '❤️', '❤️',
    '💜', '💜', '🧡', '🧡',
    '💛', '💗', '🤍',
    '😂', '🤣', '💀'
];

// shapes overlay to add fun to the plain video screen
const comicChars  = ['★', '✦', '⚡', '●', '◆', '✧', '✱', '~', '!'];
const comicColors = ['#7C00FE', '#F9E400', '#FFAF00', '#F5004F'];
const comicAnims  = ['shape-bounce', 'shape-spin', 'shape-pop', 'shape-drift', 'shape-wiggle'];

// DOM refs
const quizForm            = document.getElementById('quiz-form');
const quizPopup           = document.getElementById('quiz-popup');
const videoMessagePopup   = document.getElementById('video-message-popup');
const resultsPopup        = document.getElementById('results-popup');
const overlay             = document.getElementById('overlay');
const skipBtn             = document.getElementById('skip-to-results');
const retakeBtn           = document.getElementById('retake-quiz');
const rewatchBtn          = document.getElementById('rewatch-btn');
const videoIframe         = document.getElementById('video-iframe');
const igLiveOverlay       = document.getElementById('ig-live-overlay');
const igCommentsScroll    = document.getElementById('ig-comments-scroll');
const igCommentInput      = document.getElementById('ig-comment-input');
const igCommentSend       = document.getElementById('ig-comment-send');
const igHeartsContainer   = document.getElementById('ig-hearts-container');
const igHeartBtn          = document.getElementById('ig-heart-btn');
const igViewerNum         = document.getElementById('ig-viewer-num');
const comicShapesEl       = document.getElementById('comic-shapes-container');
// const laughterTrack       = document.getElementById('laughter-track');

// states
let calculatedResult  = '';
let commentIndex      = 0;
let commentInterval   = null;
let heartInterval     = null;
let comicInterval     = null;
let viewerInterval    = null;
let viewerCount       = 1243;
let resultsTimeout    = null;

// quiz submission
quizForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // tally scores
    const scores = { selfie: 0, loud: 0, texter: 0, butterfly: 0 };
    for (let i = 1; i <= 3; i++) {
        const picked = document.querySelector(`input[name="q${i}"]:checked`);
        if (picked) scores[picked.value]++;
    }

    // find winner
    let resultCharacter = 'selfie';
    let maxScore = 0;
    for (const key in scores) {
        if (scores[key] > maxScore) {
            maxScore = scores[key];
            resultCharacter = key;
        }
    }
    calculatedResult = resultCharacter;

    // trigger video autoplay
    videoIframe.src = "https://drive.google.com/file/d/15eMO2GdDd9eWhwywLfEVz4McQbv7mHY6/preview?autoplay=1";

    // // play background laughter
    // laughterTrack.volume = 0.22;
    // laughterTrack.play().catch(() => {});

    // hide quiz, show "enjoy watching" message
    quizPopup.classList.add('hidden');
    videoMessagePopup.classList.remove('hidden');

    // after 2s: hide message, lighten overlay, launch IG live overlay
    setTimeout(function() {
        videoMessagePopup.classList.add('hidden');
        overlay.classList.add('light');
        startIGLiveOverlay();
    }, 2000);

    // auto-show results after ~96s (2s message + 93s film)
    resultsTimeout = setTimeout(showResults, 95000);
});

// video screen overlay (for an IG look)
function startIGLiveOverlay() {
    igLiveOverlay.classList.remove('hidden');
    startComments();
    startHearts();
    startComicShapes();
    startViewerCount();
}

function stopIGLiveOverlay() {
    igLiveOverlay.classList.add('hidden');
    stopComments();
    stopHearts();
    stopComicShapes();
    stopViewerCount();
}

// comment starter
function startComments() {
    commentIndex = 0;
    igCommentsScroll.innerHTML = '';

    // drop first few comments quickly for instant feel
    for (let i = 0; i < 5; i++) {
        setTimeout(() => addPreloadedComment(), i * 350);
    }

    // then keep adding at a natural chat pace
    commentInterval = setInterval(addPreloadedComment, 2100);
}

function stopComments() {
    if (commentInterval) { clearInterval(commentInterval); commentInterval = null; }
}

function addPreloadedComment() {
    if (commentIndex >= preloadedComments.length) commentIndex = 0;
    const c = preloadedComments[commentIndex++];
    appendComment(c.user, c.text, c.color, false);
}

function appendComment(username, text, color, isOwn) {
    const row = document.createElement('div');
    row.className = 'ig-comment' + (isOwn ? ' own' : '');

    // avatar
    const avatar = document.createElement('div');
    avatar.className = 'ig-comment-avatar';
    avatar.style.background = color;
    avatar.textContent = username.charAt(0).toUpperCase();

    // body
    const body = document.createElement('div');
    body.className = 'ig-comment-body';
    body.innerHTML =
        '<span class="ig-username">' + username + '</span>' +
        '<span class="ig-text">'     + text     + '</span>';

    row.appendChild(avatar);
    row.appendChild(body);
    igCommentsScroll.appendChild(row);

    // trim old comments (keep last 10 for smooth perf)
    const all = igCommentsScroll.querySelectorAll('.ig-comment');
    if (all.length > 10) {
        all[0].remove();
    }
}

// user sends a comment
igCommentSend.addEventListener('click', sendUserComment);
igCommentInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') sendUserComment();
});

function sendUserComment() {
    const raw = igCommentInput.value.trim();
    if (!raw) return;
    // sanitize to prevent XSS
    const safe = raw.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    appendComment('You', safe, '#7C00FE', true);
    igCommentInput.value = '';
    igCommentInput.focus();
    // burst of hearts when user comments
    createHeartBurst(5);
}

// floating hearts on the right
function startHearts() {
    createHeartBurst(3); // initial pop
    heartInterval = setInterval(() => {
        // 65% chance each tick
        if (Math.random() < 0.65) createHeart();
    }, 850);
}

function stopHearts() {
    if (heartInterval) { clearInterval(heartInterval); heartInterval = null; }
}

function createHeart() {
    const emoji = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    const el = document.createElement('div');
    el.className = 'ig-heart';
    el.textContent = emoji;

    // randomise horizontal position within container
    el.style.right = (4 + Math.random() * 55) + 'px';

    // randomise size
    el.style.fontSize = (1.6 + Math.random() * 1.3) + 'em';

    // randomise duration via CSS custom property
    const dur = 3 + Math.random() * 1.8;
    el.style.setProperty('--dur', dur + 's');
    el.style.animationDuration = dur + 's';

    igHeartsContainer.appendChild(el);
    setTimeout(() => { if (el.parentNode) el.remove(); }, dur * 1000 + 300);
}

function createHeartBurst(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => createHeart(), i * 70);
    }
}

// heart button click
igHeartBtn.addEventListener('click', () => createHeartBurst(7));

// comic shapes starter
function startComicShapes() {
    comicShapesEl.innerHTML = '';
    // seed more initial shapes staggered
    for (let i = 0; i < 16; i++) {
        setTimeout(() => spawnComicShape(), i * 180);
    }
    comicInterval = setInterval(spawnComicShape, 900);
}

function stopComicShapes() {
    if (comicInterval) { clearInterval(comicInterval); comicInterval = null; }
    comicShapesEl.innerHTML = '';
}

function spawnComicShape() {
    const el = document.createElement('div');
    el.className = 'comic-shape';
    el.textContent = comicChars[Math.floor(Math.random() * comicChars.length)];
    el.style.color  = comicColors[Math.floor(Math.random() * comicColors.length)];
    el.style.fontSize = (1.1 + Math.random() * 2.2) + 'em';
    el.style.opacity  = (0.5 + Math.random() * 0.5);

    // avoids comments bottom-left & hearts far-right
    const zone = Math.floor(Math.random() * 4);

    switch (zone) {
        case 0: // top left
            el.style.left = (Math.random() * 9) + '%';
            el.style.top  = (3 + Math.random() * 34) + '%';
            break;
        case 1: // top center
            el.style.left = (18 + Math.random() * 64) + '%';
            el.style.top  = (1 + Math.random() * 8) + '%';
            break;
        case 2: // top right
            el.style.right = (6 + Math.random() * 9) + '%';
            el.style.top   = (3 + Math.random() * 49) + '%';
            break;
        case 3: // bottom right
            el.style.right = (6 + Math.random() * 9) + '%';
            el.style.top   = (60 + Math.random() * 30) + '%';
            break;
    }

    const anim = comicAnims[Math.floor(Math.random() * comicAnims.length)];
    const dur  = 1.8 + Math.random() * 3;
    el.style.animation = anim + ' ' + dur + 's ease-in-out infinite';

    comicShapesEl.appendChild(el);

    // auto-remove after a random lifetime 
    const life = 3500 + Math.random() * 5500;
    setTimeout(() => {
        el.style.transition = 'opacity 0.4s';
        el.style.opacity = '0';
        setTimeout(() => { if (el.parentNode) el.remove(); }, 420);
    }, life);
}

// viewed count top-left
function startViewerCount() {
    const START   = 769;
    const END     = 1043;
    const TOTAL_MS = 96000;
    const TICK_MS  = 1200; // update every 1.2s
    let elapsed    = 0;

    viewerCount = START;
    updateViewerDisplay();

    if (viewerInterval) clearInterval(viewerInterval);

    viewerInterval = setInterval(() => {
        elapsed += TICK_MS;

        if (elapsed >= TOTAL_MS) {
            viewerCount = END;
            updateViewerDisplay();
            clearInterval(viewerInterval);
            viewerInterval = null;
            return;
        }

        // Linear progress 0→1
        const progress = elapsed / TOTAL_MS;
        // Base target at this moment
        const base = START + (END - START) * progress;
        // Small random jitter ±4 so it doesn't feel robotic
        const jitter = (Math.random() - 0.5) * 8;
        viewerCount = Math.round(Math.min(END, Math.max(START, base + jitter)));
        updateViewerDisplay();
    }, TICK_MS);
}

function stopViewerCount() {
    if (viewerInterval) { clearInterval(viewerInterval); viewerInterval = null; }
}

function updateViewerDisplay() {
    igViewerNum.textContent = viewerCount.toLocaleString();
}

// quiz results
function showResults() {
    if (resultsTimeout) { clearTimeout(resultsTimeout); resultsTimeout = null; }

    stopIGLiveOverlay();
    // laughterTrack.pause();
    // laughterTrack.currentTime = 0;

    const ch = characters[calculatedResult];

    document.getElementById('result-character').innerHTML =
        '<h3>' + ch.name + '</h3>' +
        '<p>' + ch.description + '</p>' +
        '<p class="result-tagline">"' + ch.tagline + '"</p>';

    // Color the result box border to match character
    document.querySelector('.result-box').style.borderColor = ch.color;

    overlay.classList.remove('light');
    resultsPopup.classList.remove('hidden');
}

// skip to results
skipBtn.addEventListener('click', function() {
    videoMessagePopup.classList.add('hidden');
    overlay.classList.add('light');
    stopIGLiveOverlay();
    showResults();
});

// rewatch video
rewatchBtn.addEventListener('click', function() {
    // Hide results
    resultsPopup.classList.add('hidden');

    // reload video with autoplay
    videoIframe.src = "https://drive.google.com/file/d/15eMO2GdDd9eWhwywLfEVz4McQbv7mHY6/preview?autoplay=1";

    // lighten overlay and restart IG live
    overlay.classList.add('light');
    // laughterTrack.volume = 0.22;
    // laughterTrack.play().catch(() => {});
    startIGLiveOverlay();

    // show results again after 96s
    resultsTimeout = setTimeout(showResults, 96000);
});

// retake quiz
retakeBtn.addEventListener('click', function() {
    quizForm.reset();
    resultsPopup.classList.add('hidden');
    quizPopup.classList.remove('hidden');
    overlay.classList.remove('light');

    // reset video
    videoIframe.src = "https://drive.google.com/file/d/15eMO2GdDd9eWhwywLfEVz4McQbv7mHY6/preview";

    // stop everything
    stopIGLiveOverlay();
    // laughterTrack.pause();
    // laughterTrack.currentTime = 0;
    if (resultsTimeout) { clearTimeout(resultsTimeout); resultsTimeout = null; }
});

// auto rewatch on load (from cast page)
(function() {
    if (sessionStorage.getItem('rewatch') === '1') {
        sessionStorage.removeItem('rewatch');

        // hide quiz, trigger rewatch flow
        quizPopup.classList.add('hidden');
        videoIframe.src = "https://drive.google.com/file/d/15eMO2GdDd9eWhwywLfEVz4McQbv7mHY6/preview?autoplay=1";
        overlay.classList.add('light');

        // laughterTrack.volume = 0.22;
        // laughterTrack.play().catch(() => {});
        startIGLiveOverlay();

        // If no result stored yet, just show the video message popup with skip
        if (!calculatedResult) {
            videoMessagePopup.classList.remove('hidden');
        }

        resultsTimeout = setTimeout(showResults, 96000);
    }
})();