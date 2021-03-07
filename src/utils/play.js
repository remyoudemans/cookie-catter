import hitTestRectangle from './hitTestRectangle';

const positionRandomly = (sprite, app) => {
  sprite.position.set(
    Math.random() * (app.view.width - sprite.width) + sprite.width / 2,
    Math.random() * (app.view.height - sprite.height) + sprite.height / 2
  );
};

const play = ({ app, cat, cookie, score, scoreVal }) => delta => {
  if (cat.vx > 0 && cat.x >= app.view.width - cat.width / 2 || cat.vx < 0 && cat.x <= cat.width / 2) {
    cat.vx = 0;
  }

  if (cat.vy < 0 && cat.y <= cat.height / 2 || cat.vy > 0 && cat.y >= app.view.height - cat.height / 2) {
    cat.vy = 0;
  }

  const catGotCookie = hitTestRectangle(cat, cookie);

  if (catGotCookie || cookie.scale.x <= 0) {
    positionRandomly(cookie, app);
    cookie.scale.set(0.1, 0.1);

    if (catGotCookie) {
      scoreVal += 20;
    }
  }

  cat.x += cat.vx * delta;
  cat.y += cat.vy * delta;
  cat.rotation += cat.vrotation * delta;
  score.text = `Score: ${scoreVal}`;
  cookie.scale.x -= 0.0003 * delta;
  cookie.scale.y -= 0.0003 * delta;
}

export default play;
