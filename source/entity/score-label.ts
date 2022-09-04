//

import {
  Actor,
  Engine,
  Text,
  Vector,
  vec
} from "excalibur";
import {
  SPRITE_FONTS
} from "/source/core/asset";


const SCORE_LABEL_PROPS = {
  existenceDuration: 1000,
  terminalOffset: 10
};

export type ScoreLabelConfigs = {
  x: number,
  y: number,
  score: number
};


export class ScoreLabel extends Actor {

  private initialPos: Vector;
  private score: number;
  private timer: number;

  public constructor({x, y, ...configs}: ScoreLabelConfigs) {
    super({
      pos: vec(x, y),
      z: -190
    });
    this.initialPos = vec(x, y);
    this.score = configs.score;
    this.timer = 0;
    this.anchor = vec(0.5, 1);
  }

  public override onInitialize(engine: Engine): void {
    const string = this.score.toFixed(0);
    const text = new Text({text: string, font: SPRITE_FONTS.smallNumber});
    this.graphics.use(text);
  }

  public override onPreUpdate(engine: Engine, delta: number): void {
    this.timer += delta;
    if (this.timer < SCORE_LABEL_PROPS.existenceDuration) {
      this.pos = this.initialPos.add(vec(0, -this.timer / SCORE_LABEL_PROPS.existenceDuration * SCORE_LABEL_PROPS.terminalOffset));
      this.graphics.opacity = 1 - this.timer / SCORE_LABEL_PROPS.existenceDuration;
    } else {
      this.kill();
    }
  }

}