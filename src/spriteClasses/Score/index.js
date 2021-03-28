import { Text, Graphics } from 'pixi.js';

export default class Score {
  constructor(app) {
    this.innerValue = 0;
    this.app = app;

    this.fontSize = 24;
    this.lineHeight = 30;

    const graphics = new Graphics()
      .beginFill()
      .drawRect(0, 0, this.app.view.width, this.lineHeight)
      .endFill();

    this.app.stage.addChild(graphics);

    this.sprite = new Text(
      this.text,
      {
        fontFamily : 'Arial',
        fontSize: this.fontSize,
        lineHeight: this.lineHeight,
        fill : 0xff1010,
        align : 'center',
      }
    );
  }

  get text() {
    return `Score: ${this.innerValue}`;
  }

  add(increase) {
    this.innerValue += increase;
    this.sprite.text = this.text;
  }

  addToStage() {
    this.app.stage.addChild(this.sprite);
    return this;
  }
}
