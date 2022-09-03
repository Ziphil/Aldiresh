//

import {
  Actor,
  CollisionType,
  Color,
  Vector
} from "excalibur";
import {
  RotatedSquareComponent
} from "/source/component/rotated-square";


export const BULLET_CONFIGS = {
  size: 9,
  vel: 90,
  square: {
    outerSize: 9,
    outerRotationVel: 0.0042,
    outerColor: Color.fromHSL(0.5, 0.8, 0.5, 0.8)
  }
};


export class Bullet extends Actor {

  public readonly owner: "player" | "enemy";

  public constructor(x: number, y: number, direction: number, owner: "player" | "enemy") {
    super({x, y, z: -220, radius: BULLET_CONFIGS.size / 2, collisionType: CollisionType["Passive"]});
    this.addComponent(new RotatedSquareComponent(BULLET_CONFIGS.square));
    this.owner = owner;
    this.vel = Vector.fromAngle(direction).scale(BULLET_CONFIGS.vel);
  }

}