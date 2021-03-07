import hitTestRectangle from './hitTestRectangle';

const positionRandomly = (sprite, app) => {
  sprite.position.set(
    Math.random() * (app.view.width - sprite.width) + sprite.width / 2,
    Math.random() * (app.view.height - sprite.height) + sprite.height / 2
  );
};

const play = ({ app, cat, cookie, score, scoreVal }) => delta => {

  const catGotCookie = hitTestRectangle(cat.sprite, cookie.sprite);

  if (catGotCookie || cookie.sprite.scale.x <= 0) {
    positionRandomly(cookie.sprite, app);
    cookie.resetScale();

    if (catGotCookie) {
      scoreVal += 20;
    }
  }

  cat.move(delta);
  score.text = `Score: ${scoreVal}`;
  cookie.shrink(delta);
}

export default play;
