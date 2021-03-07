import { Sprite } from 'pixi.js';

export default class Cat {
  static resourceUrl = "images/cat.png";

  constructor(app, texture) {
    this.sprite = new Sprite(texture);

    this.app = app;

    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.position.set(
      app.view.width / 2,
      app.view.height / 2,
    )

    this.sprite.interactive = true;

    this.sprite.scale.set(0.7, 0.7);

    this.rotationOn = false;
    this.motionSpeed = 4;

    this.sprite.vx = 0;
    this.sprite.vy = 0;
    this.sprite.vrotation = 0;

    this.sprite.on('click', this.onClick.bind(this));

    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  onClick() {
    this.rotationOn = !this.rotationOn;

    if (this.rotationOn) {
      this.sprite.vrotation = 0.01;
    } else {
      this.sprite.vrotation = 0;
    }
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
    this.sprite.rotation += this.sprite.vrotation * delta;
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
