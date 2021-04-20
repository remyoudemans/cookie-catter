import { Sprite, AnimatedSprite, Container } from 'pixi.js';

export default class Cat {
  static resourceUrl = "images/cat_without_tail.png";
  static tailResourceUrl = "images/tail_spritesheet.json";

  constructor(app, catTexture, tailTextures) {
    this.app = app;

    this.cat = new Sprite(catTexture);
    this.cat.anchor.set(0.5, 0.5);
    this.cat.scale.set(0.7, 0.7);

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

    this.sprite.addChild(catTail, this.cat);

    this.sprite.position.set(
      app.view.width / 2,
      app.view.height / 2,
    );

    this.originalMotionSpeed = 4;
    this.motionSpeed = this.originalMotionSpeed;

    this.sprite.vx = 0;
    this.sprite.vy = 0;

    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  resetMotionSpeed() {
    this.motionSpeed = this.originalMotionSpeed;
  }

  increaseMotionSpeed() {
    this.motionSpeed += this.motionSpeed;
  }

  onKeyDown(e) {
    switch(e.key) {
      case 'ArrowUp':
        this.sprite.vx = 0;
        if (this.sprite.vy < 0) {
          this.increaseMotionSpeed();
        } else {
          this.resetMotionSpeed();
        }
        this.sprite.vy = -this.motionSpeed;
        break;
      case 'ArrowDown':
        this.sprite.vx = 0;
        if (this.sprite.vy > 0) {
          this.increaseMotionSpeed();
        } else {
          this.resetMotionSpeed();
        }
        this.sprite.vy = this.motionSpeed;
        break;
      case 'ArrowLeft':
        if (this.sprite.vx < 0) {
          this.increaseMotionSpeed();
        } else {
          this.resetMotionSpeed();
        }
        this.sprite.vx = -this.motionSpeed;
        this.sprite.vy = 0;
        break;
      case 'ArrowRight':
        if (this.sprite.vx > 0) {
          this.increaseMotionSpeed();
        } else {
          this.resetMotionSpeed();
        }
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
    if (this.isAtEdge) {
      this.sprite.vx = 0;
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
    } else if (this.sprite.vy > 0) {
      this.sprite.angle = 0;
    }
  }

  get isAtEdge() {
    const { height, x: catX, y: catY } = this.cat;
    const x = catX + this.sprite.x;
    const y = catY + this.sprite.y;

    const isAtRight = this.sprite.vx > 0 && x >= this.app.view.width - height / 2;
    const isAtLeft = this.sprite.vx < 0 && x <= height / 2;
    const isAtTop = this.sprite.vy < 0 && y <= height / 2;
    const isAtBottom = this.sprite.vy > 0 && y >= this.app.view.height - height / 2;

    return isAtTop || isAtRight || isAtBottom || isAtLeft;
  }

  addToStage() {
    this.app.stage.addChild(this.sprite);
    return this;
  }
}
