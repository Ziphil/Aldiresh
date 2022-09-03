//

import {
  Actor,
  CollisionType,
  Color,
  Engine,
  Vector
} from "excalibur";
import {
  RotatingSquareComponent
} from "/source/component/rotating-square";


export const BULLET_PROPS = {
  size: 9,
  vel: 90,
  square: {
    outerSize: 9,
    outerRotationVel: 0.0042,
    playerOuterColor: Color.fromHSL(0.5, 0.8, 0.5, 0.8),
    enemyOuterColor: Color.fromHSL(0.5, 0.8, 0.5, 0.8)
  }
};

export type BulletConfigs = {
  x: number,
  y: number,
  direction: number,
  owner: "player" | "enemy"
};


export class Bullet extends Actor {

  public readonly owner: "player" | "enemy";

  public constructor({x, y, ...configs}: BulletConfigs) {
    super({x, y, z: -220, radius: BULLET_PROPS.size / 2, collisionType: CollisionType["Passive"]});
    this.owner = configs.owner;
    this.vel = Vector.fromAngle(configs.direction).scale(BULLET_PROPS.vel);
  }

  public override onInitialize(engine: Engine): void {
    this.addComponent(new RotatingSquareComponent({
      ...BULLET_PROPS.square,
      outerColor: (this.owner === "player") ? BULLET_PROPS.square.playerOuterColor : BULLET_PROPS.square.enemyOuterColor
    }));
  }

}