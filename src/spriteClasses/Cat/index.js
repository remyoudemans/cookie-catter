import { Sprite } from 'pixi.js';

export default class Cat {
  static resourceUrl = "images/cat.png";

  constructor(app, texture) {
    this.sprite = new Sprite(texture);

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
}
