function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

function checkAnswer(correct) {
  const result = document.getElementById("quiz-result");
  if (correct) {
    result.textContent = "✔ Correct. And yes, I’m still here 🙂";
    result.style.color = "#f08a8a";
  } else {
    result.textContent = "Almost 🙂 Try again";
    result.style.color = "#999";
  }
}

function toggleTurkish() {
  const text = document.getElementById("turkish");
  text.classList.toggle("hidden");
}

function finishLesson() {
  const result = document.getElementById("final-result");
  result.textContent = "You just made a developer very happy 🙂";
  result.style.color = "#f08a8a";
}

/* floating hearts */
setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "♥";
  heart.style.left = Math.random() * 100 + "vw";
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 4000);
}, 120);
