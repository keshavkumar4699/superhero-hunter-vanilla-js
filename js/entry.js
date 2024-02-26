document.addEventListener("DOMContentLoaded", function () {
  const particleConatainer = document.querySelector(".boxes");

  const createParticle = () => {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.innerHTML = '<i class="fa-solid fa-star-of-life"></i>';
    particle.style.left = Math.random() * window.innerWidth + "px";
    particle.style.top = Math.random() * window.innerHeight + "px";
    particle.style.animationDuration = Math.random() * 2 + 1 + "s";
    particleConatainer.appendChild(particle);

    particle.addEventListener("animationend", () => {
      particle.remove();
    });
  };

  let counter = 0;
  const spawnParticles = () => {
    const intervalId = setInterval(() => {
      createParticle();
      counter++;
      console.log(counter);
      if (counter === 100) {
        clearInterval(intervalId);
      }
    }, 500);
  };

  spawnParticles();
});
