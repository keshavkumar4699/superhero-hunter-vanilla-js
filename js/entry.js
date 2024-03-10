//function to excute for animation on entry page
document.addEventListener("DOMContentLoaded", function () {
  const particleConatainer = document.querySelector(".boxes");

  //function to create particles in background
  const createParticle = () => {
    //animations and setup for particles in background
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

  //function to create particle with time
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

function redirect(){
  window.location.href = "http://127.0.0.1:3000/hero_list.html";
  // window.location.href = 'https://superhero-hunter-vanilla-js.onrender.com/hero_list.html';
}
