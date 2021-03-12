import * as PIXI from 'pixi.js';
import Cat from './spriteClasses/Cat';
import Cookie from './spriteClasses/Cookie';
import Score from './spriteClasses/Score';

import play from './utils/play';

// Aliases
const Application = PIXI.Application;
const loader = PIXI.Loader.shared;

const STAGE_WIDTH = 1000;
const STAGE_HEIGHT = 800;

// Create a Pixi Application
let app = new Application({ 
    width: STAGE_WIDTH, 
    height: STAGE_HEIGHT,                       
    antialias: true, 
    resolution: 1,
    backgroundColor: 0xFFFFFF // white
  }
);

app.view.style = `
  border: 3px solid black;
  border-radius: 10px;
`;


// TODO: use a separate cat and tail texture. Have tail be an animated sprite. Group them so they move together. Only use cat for hitbox

document.body.appendChild(app.view);

let state;

loader
  .add([
    { name: 'cat', url: Cat.resourceUrl },
    { name: 'cookie', url: Cookie.resourceUrl },
    { name: 'tail', url: 'images/Tail.png' },
    { name: 'tailFlip', url: 'images/TailFlip.png' },
    { name: 'tailStraight', url: 'images/TailStraight.png' },
    { name: 'tailSprites', url: 'images/tail_spritesheet.json'}
  ])
  .load(setup);


const gameLoop = (delta) => {
  state(delta);
};

// This `setup` function will run when the image has loaded
function setup(_, resources) {
  const score = new Score(app).addToStage();
  const cat = new Cat(app, resources.cat.texture).addToStage();
  const cookie = new Cookie(app, resources.cookie.texture).addToStage();

  const catTail = new PIXI.AnimatedSprite(Object.values(resources.tailSprites.textures));

  catTail.anchor.set(0.5, 0.5);
  catTail.animationSpeed = 0.5;

  let direction = 'left';
  catTail.onLoop = () => {
    if (direction === 'left') {
      if (catTail.scale.x < 0) {
        catTail.textures.reverse();
        direction = 'right';
      } else {
        catTail.scale.x = -catTail.scale.x;
        catTail.textures.reverse();
      }
    } else {
      // direction is right
      if (catTail.scale.x < 0) {
        catTail.scale.x = -catTail.scale.x;
        catTail.textures.reverse();
      } else {
        direction = 'left';
        catTail.textures.reverse();
      }
    }
  }

  catTail.x = 150;
  catTail.y = 150;
  catTail.play();

  app.stage.addChild(catTail);

  state = play({ app, cat, cookie, score });

  app.ticker.add(gameLoop);

}
