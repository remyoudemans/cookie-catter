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
    { name: 'tailSprites', url: Cat.tailResourceUrl},
    { name: 'cookie', url: Cookie.resourceUrl },
  ])
  .load(setup);


const gameLoop = (delta) => {
  state(delta);
};

// This `setup` function will run when the image has loaded
function setup(_, resources) {
  const score = new Score(app).addToStage();
  const cat = new Cat(app, resources.cat.texture, resources.tailSprites.textures).addToStage();
  const cookie = new Cookie(app, resources.cookie.texture).addToStage();

  state = play({ app, cat, cookie, score });

  app.ticker.add(gameLoop);

}
