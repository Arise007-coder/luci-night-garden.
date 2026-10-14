// --- Starfield Particle Background Animation ---
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 100;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        alpha: Math.random(),
        speed: Math.random() * 0.05 + 0.01
    });
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    stars.forEach(star => {
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0) star.speed = -star.speed;
    });
    requestAnimationFrame(animateStars);
}
animateStars();

// --- Multi-Step Navigation Logic ---
let currentStep = 1;
const totalSteps = 5;

function updateSteps() {
    document.querySelectorAll('.garden-section').forEach((sec, idx) => {
        sec.classList.toggle('active', idx + 1 === currentStep);
    });
    document.getElementById('step-indicator').textContent = `0${currentStep} / 0${totalSteps}`;
    document.getElementById('prev-btn').style.display = currentStep === 1 ? 'none' : 'inline-flex';
    document.getElementById('next-btn').style.display = currentStep === totalSteps ? 'none' : 'inline-flex';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextStep(stepNum) {
    currentStep = stepNum;
    updateSteps();
}

function changeStep(direction) {
    currentStep += direction;
    if (currentStep < 1) currentStep = 1;
    if (currentStep > totalSteps) currentStep = totalSteps;
    updateSteps();
}
updateSteps();

// --- Ambient Audio Control ---
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const musicStatus = document.getElementById('music-status');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicStatus.textContent = "Play Music";
    } else {
        bgMusic.play().catch(() => {});
        musicStatus.textContent = "Pause Music";
    }
    isPlaying = !isPlaying;
});

// --- Companion Selector Logic ---
document.querySelectorAll('.companion-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
        document.querySelectorAll('.companion-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
    });
});

// --- Cupid's Archery Game Logic ---
const shootBtn = document.getElementById('shoot-btn');
const shooterBow = document.getElementById('shooter-bow');
const wishRevealBox = document.getElementById('wish-reveal-box');

shootBtn.addEventListener('click', () => {
    shooterBow.style.transform = "translateY(-100px) rotate(-45deg)";
    shootBtn.disabled = true;
    shootBtn.textContent = "Bullseye! 🎯✨";
    
    setTimeout(() => {
        wishRevealBox.style.display = "block";
    }, 600);
});

// --- Enchanted Heart Tree Canvas Logic ---
let growthLevel = 0;
const maxGrowth = 10;
const treeCanvas = document.getElementById('heart-tree-canvas');
const treeCtx = treeCanvas.getContext('2d');

drawTree(0);

document.getElementById('grow-tree-btn').addEventListener('click', () => {
    if (growthLevel < maxGrowth) {
        growthLevel++;
        document.getElementById('growth-counter').textContent = growthLevel;
        drawTree(growthLevel);

        if (growthLevel === maxGrowth) {
            document.getElementById('grow-tree-btn').textContent = "Tree Fully Bloomed! ✨";
            document.getElementById('grow-tree-btn').disabled = true;
            document.getElementById('proceed-gallery').disabled = false;
        }
    }
});

function drawTree(level) {
    treeCtx.clearRect(0, 0, treeCanvas.width, treeCanvas.height);
    
    let startX = treeCanvas.width / 2;
    let startY = treeCanvas.height - 20;
    let trunkLength = 70 + (level * 8);

    // Draw trunk
    treeCtx.beginPath();
    treeCtx.moveTo(startX, startY);
    treeCtx.lineTo(startX, startY - trunkLength);
    treeCtx.strokeStyle = '#8B5A2B';
    treeCtx.lineWidth = Math.max(2, level * 1.5);
    treeCtx.lineCap = 'round';
    treeCtx.stroke();

    if (level > 2) {
        drawBranch(startX, startY - trunkLength, trunkLength * 0.7, -Math.PI / 4, level);
        drawBranch(startX, startY - trunkLength, trunkLength * 0.7, Math.PI / 4, level);
    }
    
    if (level >= 6) {
        drawBranch(startX, startY - trunkLength * 1.2, trunkLength * 0.5, -Math.PI / 6, level);
        drawBranch(startX, startY - trunkLength * 1.2, trunkLength * 0.5, Math.PI / 6, level);
    }

    if (level >= maxGrowth) {
        drawHeartCanopy(startX, startY - trunkLength - 40);
    }
}

function drawBranch(x, y, length, angle, level) {
    treeCtx.save();
    treeCtx.translate(x, y);
    treeCtx.rotate(angle);
    treeCtx.beginPath();
    treeCtx.moveTo(0, 0);
    treeCtx.lineTo(0, -length);
    treeCtx.strokeStyle = '#A0522D';
    treeCtx.lineWidth = Math.max(1, level * 0.8);
    treeCtx.stroke();
    treeCtx.restore();
}

function drawHeartCanopy(x, y) {
    treeCtx.fillStyle = '#ff5ca4';
    treeCtx.shadowColor = '#ff5ca4';
    treeCtx.shadowBlur = 15;
    
    treeCtx.beginPath();
    treeCtx.arc(x - 15, y, 20, 0, Math.PI * 2);
    treeCtx.arc(x + 15, y, 20, 0, Math.PI * 2);
    treeCtx.fill();
    
    treeCtx.beginPath();
    treeCtx.moveTo(x - 33, y + 10);
    treeCtx.lineTo(x, y + 45);
    treeCtx.lineTo(x + 33, y + 10);
    treeCtx.fill();
    treeCtx.shadowBlur = 0;
}
