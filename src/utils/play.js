import hitTestRectangle from './hitTestRectangle';

const positionRandomly = (sprite, app) => {
  sprite.position.set(
    Math.random() * (app.view.width - sprite.width) + sprite.width / 2,
    Math.random() * (app.view.height - sprite.height) + sprite.height / 2
  );
};

const play = ({ app, cat, cookie, score, scoreVal }) => delta => {

  const catGotCookie = hitTestRectangle(cat.sprite, cookie);

  if (catGotCookie || cookie.scale.x <= 0) {
    positionRandomly(cookie, app);
    cookie.scale.set(0.1, 0.1);

    if (catGotCookie) {
      scoreVal += 20;
    }
  }

  cat.move(delta);
  score.text = `Score: ${scoreVal}`;
  cookie.scale.x -= 0.0003 * delta;
  cookie.scale.y -= 0.0003 * delta;
}

export default play;
