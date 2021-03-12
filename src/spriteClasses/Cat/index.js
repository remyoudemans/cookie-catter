import { Sprite, AnimatedSprite, Container } from 'pixi.js';

export default class Cat {
  static resourceUrl = "images/cat_without_tail.png";

  constructor(app, catTexture, tailTextures) {
    this.app = app;

    const cat =  new Sprite(catTexture);
    cat.anchor.set(0.5, 0.5);
    cat.scale.set(0.7, 0.7);

    const catTail = new AnimatedSprite(Object.values(tailTextures));

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

    catTail.y -= catTail.height;
    catTail.play();

    this.sprite = new Container();

    this.sprite.addChild(catTail, cat);

    this.sprite.position.set(
      app.view.width / 2,
      app.view.height / 2,
    );

    this.motionSpeed = 4;

    this.sprite.vx = 0;
    this.sprite.vy = 0;

    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }


  onKeyDown(e) {
    switch(e.key) {
      case 'ArrowUp':
        this.sprite.vx = 0;
        this.sprite.vy = -this.motionSpeed;
        break;
      case 'ArrowDown':
        this.sprite.vx = 0;
        this.sprite.vy = this.motionSpeed;
        break;
      case 'ArrowLeft':
        this.sprite.vx = -this.motionSpeed;
        this.sprite.vy = 0;
        break;
      case 'ArrowRight':
        this.sprite.vx = this.motionSpeed;
        this.sprite.vy = 0;
        break;
      case ' ':
        this.sprite.vx = 0;
        this.sprite.vy = 0;
        break;
    }
  }

  move(delta) {
    if (this.isAtSide) {
      this.sprite.vx = 0;
    }

    if (this.isAtTopOrBottom) {
      this.sprite.vy = 0;
    }

    this.sprite.x += this.sprite.vx * delta;
    this.sprite.y += this.sprite.vy * delta;

    if (this.sprite.vx > 0) {
      this.sprite.angle = -90;
    } else if (this.sprite.vx < 0) {
      this.sprite.angle = 90;
    } else if (this.sprite.vy < 0) {
      this.sprite.angle = 180;
    } else {
      this.sprite.angle = 0;
    }
  }

  get isAtSide() {
    return this.sprite.vx > 0 && this.sprite.x >= this.app.view.width - this.sprite.width / 2 || this.sprite.vx < 0 && this.sprite.x <= this.sprite.width / 2;
  }

  get isAtTopOrBottom() {
    return this.sprite.vy < 0 && this.sprite.y <= this.sprite.height / 2 || this.sprite.vy > 0 && this.sprite.y >= this.app.view.height - this.sprite.height / 2;
  }

  addToStage() {
    this.app.stage.addChild(this.sprite);
    return this;
  }
}
