import * as PIXI from 'pixi.js';
import hitTestRectangle from './utils/hitTestRectangle';

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

let cat, state, cookie, score, scoreVal;

const positionRandomly = sprite => {
  sprite.position.set(
    Math.random() * (app.view.width - sprite.width) + sprite.width / 2,
    Math.random() * (app.view.height - sprite.height) + sprite.height / 2
  );
};

loader
  .add([
    { name: 'cat', url:"images/cat.png" },
    { name: 'cookie', url: "images/cookie.png" }
  ])
  .load(setup);

const play = delta => {
  if (cat.vx > 0 && cat.x >= app.view.width - cat.width / 2 || cat.vx < 0 && cat.x <= cat.width / 2) {
    cat.vx = 0;
  }

  if (cat.vy < 0 && cat.y <= cat.height / 2 || cat.vy > 0 && cat.y >= app.view.height - cat.height / 2) {
    cat.vy = 0;
  }

  if (hitTestRectangle(cat, cookie)) {
    positionRandomly(cookie);

    scoreVal += 20;
  }

  cat.x += cat.vx;
  cat.y += cat.vy;
  cat.rotation += cat.vrotation;
  score.text = `Score: ${scoreVal}`;
}

const gameLoop = (delta) => {
  state(delta);
};

// This `setup` function will run when the image has loaded
function setup(_, resources) {

  // Create the cat sprite
  cat = new Sprite(resources.cat.texture);
  cookie = new Sprite(resources.cookie.texture);
  scoreVal = 0
  score = new PIXI.Text(`Score: ${scoreVal}`,{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
  
  // Add the cat to the stage
  app.stage.addChild(cat);
  app.stage.addChild(cookie);
  app.stage.addChild(score);

  cookie.scale.set(0.1, 0.1);
  cookie.anchor.set(0.5, 0.5);
  cookie.position.set(70, 70);

  cat.anchor.x = 0.5;
  cat.anchor.y = 0.5;
  cat.position.x = app.view.width / 2;
  cat.position.y = app.view.height / 2;
  cat.interactive = true;

  let catRotationOn = false;
  cat.vx = 0;
  cat.vy = 0;
  cat.vrotation = 0;

  state = play;

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
    switch(e.key) {
      case 'ArrowUp':
        cat.vx = 0;
        cat.vy = -MOTION_SPEED;
        break;
      case 'ArrowDown':
        cat.vx = 0;
        cat.vy = MOTION_SPEED;
        break;
      case 'ArrowLeft':
        cat.vx = -MOTION_SPEED;
        cat.vy = 0;
        break;
      case 'ArrowRight':
        cat.vx = MOTION_SPEED;
        cat.vy = 0;
        break;
      case ' ':
        cat.vx = 0;
        cat.vy = 0;
        break;
    }
  })
}
