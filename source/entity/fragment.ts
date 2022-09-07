//

import {
  Actor,
  Color,
  Engine,
  Vector,
  vec
} from "excalibur";
import {
  RotatingSquareComponent
} from "/source/component/rotating-square";
import {
  DEPTHS
} from "/source/core/constant";


const FRAGMENT_PROPS = {
  vel: 18,
  existenceDuration: 1000,
  square: {
    outerSize: 13,
    outerRotationVel: 0.0024,
    playerOuterColor: Color.fromHSL(0.5, 0.8, 0.5, 0.4),
    enemyOuterColor: Color.fromHSL(0.85, 0.8, 0.5, 0.4)
  }
};

export type FragmentConfigs = {
  x: number,
  y: number,
  direction: number,
  owner: "player" | "enemy"
};


export class Fragment extends Actor {

  private readonly owner: "player" | "enemy";
  private timer: number;

  public constructor({x, y, ...configs}: FragmentConfigs) {
    super({
      pos: vec(x, y),
      z: DEPTHS.fragment
    });
    this.owner = configs.owner;
    this.timer = 0;
    this.vel = Vector.fromAngle(configs.direction).scale(FRAGMENT_PROPS.vel);
  }

  public override onInitialize(engine: Engine): void {
    this.initializeComponents();
  }

  public override onPreUpdate(engine: Engine, delta: number): void {
    this.updateOpacity(delta);
  }

  private initializeComponents(): void {
    const squareComponent = new RotatingSquareComponent({
      ...FRAGMENT_PROPS.square,
      outerColor: (this.owner === "player") ? FRAGMENT_PROPS.square.playerOuterColor : FRAGMENT_PROPS.square.enemyOuterColor
    });
    this.addComponent(squareComponent);
  }

  private updateOpacity(delta: number): void {
    this.timer += delta;
    if (this.timer < FRAGMENT_PROPS.existenceDuration) {
      this.graphics.opacity = 1 - this.timer / FRAGMENT_PROPS.existenceDuration;
    } else {
      this.kill();
    }
  }

}