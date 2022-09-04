//

import {
  Actor,
  Engine,
  Text,
  vec
} from "excalibur";
import {
  SPRITE_FONTS
} from "/source/core/asset";
import {
  DEPTHS
} from "/source/core/constant";


const SCORE_LABEL_PROPS = {
  vel: 10,
  existenceDuration: 1000
};

export type ScoreLabelConfigs = {
  x: number,
  y: number,
  score: number
};


export class ScoreLabel extends Actor {

  private score: number;
  private timer: number;

  public constructor({x, y, ...configs}: ScoreLabelConfigs) {
    super({
      pos: vec(x, y),
      z: DEPTHS.scoreLabel
    });
    this.score = configs.score;
    this.timer = 0;
    this.vel.y = -SCORE_LABEL_PROPS.vel;
    this.anchor = vec(0.5, 1);
  }

  public override onInitialize(engine: Engine): void {
    this.initializeGraphics();
  }

  public override onPreUpdate(engine: Engine, delta: number): void {
    this.updateOpacity(delta);
  }

  private initializeGraphics(): void {
    const string = this.score.toFixed(0);
    const text = new Text({text: string, font: SPRITE_FONTS.smallNumber});
    this.graphics.use(text);
  }

  private updateOpacity(delta: number): void {
    this.timer += delta;
    if (this.timer < SCORE_LABEL_PROPS.existenceDuration) {
      this.graphics.opacity = 1 - this.timer / SCORE_LABEL_PROPS.existenceDuration;
    } else {
      this.kill();
    }
  }

}