import { Sprite } from 'pixi.js';

export default class Cookie {
  static resourceUrl = "images/cookie.png";

  constructor(app, texture) {
    this.sprite = new Sprite(texture);

    this.app = app;

    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.position.set(70, 70);
    this.resetScale();
  }

  resetScale() {
    this.sprite.scale.set(0.1, 0.1);
  }

  shrink(delta) {
    this.sprite.scale.x -= 0.0003 * delta;
    this.sprite.scale.y -= 0.0003 * delta;
  }

  addToStage() {
    this.app.stage.addChild(this.sprite);
    return this;
  }
}
