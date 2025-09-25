
 

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 500;

let hearts = [];
let score = 0;

let messages = [
  "You're the best 💙",
  "You always make me smile 😄",
  "So grateful for you 🥰",
  "Bestie forever 🌸",
  "Happy vibes with you 🎉",
  "You’re my favorite person 💫"
];

// Heart object
function Heart(x, y) {
  this.x = x;
  this.y = y;
  this.size = 30;
  this.speed = 1 + Math.random() * 2;

  this.draw = function () {
    ctx.font = this.size + "px Arial";
    ctx.fillText("❤️", this.x, this.y);
  };

  this.update = function () {
    this.y += this.speed;
    this.draw();
  };
}

// Spawn hearts
function spawnHeart() {
  let x = Math.random() * (canvas.width - 30);
  hearts.push(new Heart(x, -30));
}

// Animate game
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  hearts.forEach((heart, index) => {
    heart.update();

    // remove if off screen
    if (heart.y > canvas.height + heart.size) {
      hearts.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

// Handle clicks
canvas.addEventListener("click", (e) => {
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;

  hearts.forEach((heart, index) => {
    if (
      mouseX > heart.x &&
      mouseX < heart.x + heart.size &&
      mouseY > heart.y - heart.size &&
      mouseY < heart.y + heart.size
    ) {
      hearts.splice(index, 1);
      score++;
      document.getElementById("score").innerText = "Score: " + score;

      // Show cute message
      const msg = messages[Math.floor(Math.random() * messages.length)];
      const msgDiv = document.getElementById("message");
      msgDiv.innerText = msg;
      setTimeout(() => (msgDiv.innerText = ""), 2000);
    }
  });
});

// Start game
setInterval(spawnHeart, 1000);
animate();
