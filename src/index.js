import * as PIXI from 'pixi.js';
import Cat from './spriteClasses/Cat';
import Cookie from './spriteClasses/Cookie';
import Score from './spriteClasses/Score';

import play from './utils/play';

// Aliases
let Application = PIXI.Application,
    loader = PIXI.Loader.shared,

const STAGE_WIDTH = 1000;
const STAGE_HEIGHT = 800;

// Create a Pixi Application
let app = new Application({ 
    width: STAGE_WIDTH, 
    height: STAGE_HEIGHT,                       
    antialias: true, 
    resolution: 1
  }
);

document.body.appendChild(app.view);

let state;

loader
  .add([
    { name: 'cat', url: Cat.resourceUrl },
    { name: 'cookie', url: Cookie.resourceUrl }
  ])
  .load(setup);


const gameLoop = (delta) => {
  state(delta);
};

// This `setup` function will run when the image has loaded
function setup(_, resources) {

  const score = new Score();
  const cat = new Cat(app, resources.cat.texture);
  const cookie = new Cookie(app, resources.cookie.texture);

  app.stage.addChild(cat.sprite);
  app.stage.addChild(cookie.sprite);
  app.stage.addChild(score.sprite);

  state = play({ app, cat, cookie, score });

  app.ticker.add(gameLoop);

}
