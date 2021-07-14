const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let position = 0;
var jumpSound = document.getElementById("jumpSound");
var music = document.getElementById("music");
var gameOverSound = document.getElementById("gameOverSound");

music.addEventListener("ended", function(){ music.currentTime = 0; music.play(); }, false);
music.play();

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}
 
function jump() {

    isJumping = true;

    let upInterval = setInterval(() => {
        if(position >= 150) {
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    jumpSound.play();
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
        position += 20;
        dino.style.bottom = position + 'px';
        }   
    }, 20)
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){
          clearInterval(leftInterval);
          music.pause();
          gameOverSound.play();
          document.body.innerHTML = '<h1 class="game-over">Game over</h1>';     
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

createCactus();

document.addEventListener('keyup', handleKeyUp);

