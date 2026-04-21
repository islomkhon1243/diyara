const typewriter = document.getElementById("typewriter");
const loveBtn = document.getElementById("loveBtn");
const finalBtn = document.getElementById("finalBtn");
const finalScreen = document.getElementById("finalScreen");
const closeFinal = document.getElementById("closeFinal");
const heartsContainer = document.getElementById("heartsContainer");
const cursorLight = document.querySelector(".cursor-light");
const revealItems = document.querySelectorAll(".reveal");
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");
const canvas = document.getElementById("petals");

const text =
  "Diyara, sen mening hayotimga kirib kelib, uni yanada chiroyli, yanada ma’noli va yanada nurli qilding. Bugun bu sahifa faqat sen uchun.";

let musicInitialized = false;
let i = 0;

/* typewriter */
function typeEffect() {
  if (!typewriter) return;
  if (i < text.length) {
    typewriter.textContent += text.charAt(i);
    i++;
    setTimeout(typeEffect, 34);
  }
}
typeEffect();

/* mouse glow */
window.addEventListener("mousemove", (e) => {
  if (!cursorLight) return;
  cursorLight.style.left = `${e.clientX}px`;
  cursorLight.style.top = `${e.clientY}px`;
});

/* reveal */
if (revealItems.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((item) => observer.observe(item));
}

/* hearts */
function createHeartBurst(count = 24, x = window.innerWidth / 2, y = window.innerHeight / 2) {
  if (!heartsContainer) return;

  const symbols = ["♡", "♥", "✦", "❀"];

  for (let j = 0; j < count; j++) {
    const el = document.createElement("div");
    el.className = "heart-burst";
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const tx = `${(Math.random() - 0.5) * 420}px`;
    const ty = `${(Math.random() - 0.5) * 420}px`;

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.setProperty("--tx", tx);
    el.style.setProperty("--ty", ty);
    el.style.fontSize = `${16 + Math.random() * 18}px`;
    el.style.color = Math.random() > 0.5
      ? "rgba(111,168,255,0.9)"
      : "rgba(143,201,255,0.95)";

    heartsContainer.appendChild(el);
    setTimeout(() => el.remove(), 1600);
  }
}

if (loveBtn) {
  loveBtn.addEventListener("click", () => {
    createHeartBurst(32);
  });
}

if (finalBtn && finalScreen) {
  finalBtn.addEventListener("click", () => {
    finalScreen.classList.add("active");
    createHeartBurst(48);
  });
}

if (closeFinal && finalScreen) {
  closeFinal.addEventListener("click", () => {
    finalScreen.classList.remove("active");
  });
}

/* decorative clicks */
document.addEventListener("click", (e) => {
  if (e.target.closest(".btn")) {
    createHeartBurst(14, e.clientX, e.clientY);
  }
});

/* petals canvas */
if (canvas) {
  const ctx = canvas.getContext("2d");
  let petals = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : -20;
      this.size = Math.random() * 8 + 6;
      this.speedY = Math.random() * 0.9 + 0.4;
      this.speedX = Math.random() * 0.8 - 0.4;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = Math.random() * 0.02 - 0.01;
      this.alpha = Math.random() * 0.35 + 0.18;
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.y * 0.01) * 0.6 + this.speedX;
      this.rotation += this.rotationSpeed;

      if (this.y > canvas.height + 30 || this.x < -40 || this.x > canvas.width + 40) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);

      ctx.beginPath();
      ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(165, 215, 255, ${this.alpha})`;
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(this.size * 0.2, -1, this.size * 0.55, this.size * 0.32, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha * 0.65})`;
      ctx.fill();

      ctx.restore();
    }
  }

  function initPetals() {
    petals = [];
    const count = Math.min(55, Math.floor(window.innerWidth / 24));
    for (let k = 0; k < count; k++) {
      petals.push(new Petal());
    }
  }

  function animatePetals() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    petals.forEach((petal) => {
      petal.update();
      petal.draw();
    });

    requestAnimationFrame(animatePetals);
  }

  resizeCanvas();
  initPetals();
  animatePetals();

  window.addEventListener("resize", () => {
    resizeCanvas();
    initPetals();
  });
}

/* first burst */
window.addEventListener("load", () => {
  setTimeout(() => {
    createHeartBurst(22, window.innerWidth / 2, window.innerHeight / 2.4);
  }, 700);
});

/* music */
async function playMusic() {
  if (!bgMusic) return;

  try {
    bgMusic.volume = 0.5;
    await bgMusic.play();
    musicInitialized = true;

    if (musicToggle) {
      musicToggle.textContent = "♫ Musiqa o‘chirish";
    }
  } catch (err) {
    console.log("Autoplay bloklandi:", err);
    if (musicToggle) {
      musicToggle.textContent = "♫ Musiqa yoqish";
    }
  }
}

function firstInteractionStartMusic() {
  if (!musicInitialized) {
    playMusic();
  }

  window.removeEventListener("click", firstInteractionStartMusic);
  window.removeEventListener("touchstart", firstInteractionStartMusic);
  window.removeEventListener("keydown", firstInteractionStartMusic);
}

window.addEventListener("load", () => {
  playMusic();
});

window.addEventListener("click", firstInteractionStartMusic);
window.addEventListener("touchstart", firstInteractionStartMusic);
window.addEventListener("keydown", firstInteractionStartMusic);

if (musicToggle && bgMusic) {
  musicToggle.addEventListener("click", async () => {
    try {
      if (bgMusic.paused) {
        bgMusic.volume = 0.5;
        await bgMusic.play();
        musicInitialized = true;
        musicToggle.textContent = "♫ Musiqa o‘chirish";
      } else {
        bgMusic.pause();
        musicToggle.textContent = "♫ Musiqa yoqish";
      }
    } catch (err) {
      console.log("Musiqa ishlamadi:", err);
    }
  });
}
