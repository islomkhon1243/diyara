// Плавный скролл
function scrollToSection(id) {
  const section = document.getElementById(id);
  section.scrollIntoView({ behavior: 'smooth' });
}

// Конфетти
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let confettiParticles = [];
let animationFrame;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createConfetti() {
  confettiParticles = [];
  for(let i=0; i<150; i++){
    confettiParticles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 50 + 10,
      color: `hsl(${Math.random()*360},100%,60%)`,
      tilt: Math.random() * 10 - 10,
      tiltAngleIncrement: Math.random() * 0.07 + 0.05
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  confettiParticles.forEach(p => {
    ctx.beginPath();
    ctx.lineWidth = p.r / 2;
    ctx.strokeStyle = p.color;
    ctx.moveTo(p.x + p.tilt + p.r/4, p.y);
    ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r/4);
    ctx.stroke();
    p.tiltAngle += p.tiltAngleIncrement;
    p.y += (Math.cos(p.d) + 3 + p.r/2)/2;
    p.x += Math.sin(p.tiltAngle);
    if(p.y > canvas.height) p.y = -10;
  });
  animationFrame = requestAnimationFrame(drawConfetti);
}

function acceptProposal() {
  document.getElementById('result').innerText = '💖 Да, я согласна! 💖';
  createConfetti();
  drawConfetti();
  // Остановим конфетти через 7 секунд
  setTimeout(() => cancelAnimationFrame(animationFrame), 7000);
}

function typeWriter(element, speed = 80) {
  const text = element.dataset.text;
  let i = 0;
  element.innerHTML = '';

  function type() {
    if (i < text.length) {
      element.innerHTML += text[i] === '\n' ? '<br>' : text[i];
      i++;
      setTimeout(type, speed);
    } else {
      // Бегущий курсор
      element.style.borderRight = 'none';
    }
  }
  type();
}

// Применяем
const typewriterElements = document.querySelectorAll('.typewriter');
typewriterElements.forEach(el => typeWriter(el));
