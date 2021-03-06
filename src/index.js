import * as PIXI from 'pixi.js';

let type = "WebGL"

if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}

PIXI.utils.sayHello(type)

// Aliases
let Application = PIXI.Application,
    loader = new PIXI.Loader(),
    Sprite = PIXI.Sprite;

const STAGE_WIDTH = 500;
const STAGE_HEIGHT = 500;
const MOTION_SPEED = 4;

// Create a Pixi Application
let app = new Application({ 
    width: STAGE_WIDTH, 
    height: STAGE_HEIGHT,                       
    antialias: true, 
    transparent: false, 
    resolution: 1
  }
);

document.body.appendChild(app.view);

loader
  .add("images/cat.png")
  .load(setup);

// This `setup` function will run when the image has loaded
function setup(_, resources) {

  // Create the cat sprite
  const cat = new Sprite(resources["images/cat.png"].texture)
  
  // Add the cat to the stage
  app.stage.addChild(cat);

  cat.anchor.x = 0.5;
  cat.anchor.y = 0.5;
  cat.position.x = STAGE_WIDTH / 2;
  cat.position.y = STAGE_HEIGHT / 2;
  cat.interactive = true;

  let catRotationOn = false;
  cat.vx = 0;
  cat.vy = 0;
  cat.vrotation = 0;

  const gameLoop = () => {
    if (cat.vx > 0 && cat.x >= STAGE_WIDTH - cat.width / 2 || cat.vx < 0 && cat.x <= cat.width / 2) {
      cat.vx = 0;
    }

    if (cat.vy < 0 && cat.y <= cat.height / 2 || cat.vy > 0 && cat.y >= STAGE_HEIGHT - cat.height / 2) {
      cat.vy = 0;
    }

    cat.x += cat.vx;
    cat.y += cat.vy;
    cat.rotation += cat.vrotation;
  };

  app.ticker.add(gameLoop);

  cat.on('click', () => {
    catRotationOn = !catRotationOn;
    if (catRotationOn) {
      cat.vrotation = 0.01;
    } else {
      cat.vrotation = 0;
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      cat.vx = 0;
      cat.vy = -MOTION_SPEED;
    }

    if (e.key === 'ArrowDown') {
      cat.vx = 0;
      cat.vy = MOTION_SPEED;
    }

    if (e.key === 'ArrowLeft') {
      cat.vx = -MOTION_SPEED;
      cat.vy = 0;
    }

    if (e.key === 'ArrowRight') {
      cat.vx = MOTION_SPEED;
      cat.vy = 0;
    }

    if (e.key === ' ') {
      cat.vx = 0;
      cat.vy = 0;
    }
  })
}
