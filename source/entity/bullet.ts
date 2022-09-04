//

import {
  Actor,
  CollisionType,
  Color,
  Engine,
  Vector,
  vec
} from "excalibur";
import {AutoKillComponent} from "/source/component/auto-kill";
import {
  RotatingSquareComponent
} from "/source/component/rotating-square";
import {
  DEPTHS
} from "/source/core/constant";
import {
  Status
} from "/source/entity/status";


export const BULLET_PROPS = {
  size: 9,
  vel: 90,
  square: {
    outerSize: 9,
    outerRotationVel: 0.0042,
    playerOuterColor: Color.fromHSL(0.5, 0.8, 0.5, 0.8),
    enemyOuterColor: Color.fromHSL(0.85, 0.8, 0.5, 0.8)
  }
};

export type BulletConfigs = {
  x: number,
  y: number,
  direction: number,
  owner: "player" | "enemy"
};


export class Bullet extends Actor {

  private status!: Status;
  public readonly owner: "player" | "enemy";

  public constructor({x, y, ...configs}: BulletConfigs) {
    super({
      pos: vec(x, y),
      z: DEPTHS.bullet,
      radius: BULLET_PROPS.size / 2,
      collisionType: CollisionType["Passive"],
      color: Color["Transparent"]
    });
    this.owner = configs.owner;
    this.vel = Vector.fromAngle(configs.direction).scale(BULLET_PROPS.vel);
  }

  public override onInitialize(engine: Engine): void {
    this.initializeComponents();
    this.on("autokill", () => this.miss());
  }

  private initializeComponents(): void {
    const squareComponent = new RotatingSquareComponent({
      ...BULLET_PROPS.square,
      outerColor: (this.owner === "player") ? BULLET_PROPS.square.playerOuterColor : BULLET_PROPS.square.enemyOuterColor
    });
    const autoKillComponent = new AutoKillComponent(BULLET_PROPS.size);
    this.addComponent(squareComponent);
    this.addComponent(autoKillComponent);
  }

  private miss(): void {
    if (this.owner === "player") {
      this.status.miss();
    }
  }

  public setStatus(status: Status): void {
    this.status = status;
  }

}