import { Text } from 'pixi.js';

export default class Score {
  constructor(app) {
    this.innerValue = 0;
    this.app = app;

    this.sprite = new Text(
      this.text,
      {
        fontFamily : 'Arial',
        fontSize: 24,
        fill : 0xff1010,
        align : 'center'
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
