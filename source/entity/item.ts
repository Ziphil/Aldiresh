//

import {
  Actor,
  CollisionType,
  Color,
  Engine,
  Vector,
  vec
} from "excalibur";
import {
  RotatingSquareComponent
} from "/source/component/rotating-square";
import {
  DEPTHS,
  FIELD_PROPS
} from "/source/core/constant";
import {
  Status
} from "/source/entity/status";


export const ITEM_PROPS = {
  size: 15,
  vel: 75,
  square: {
    outerSize: 15,
    outerRotationVel: -0.006,
    outerColor: Color.fromHSL(0.17, 0.8, 0.5, 0.8)
  }
};

export type BulletConfigs = {
  x: number,
  y: number,
  direction: number,
  type: "recover"
};


export class Item extends Actor {

  private status!: Status;
  public readonly type: "recover";

  public constructor({x, y, ...configs}: BulletConfigs) {
    super({
      pos: vec(x, y),
      z: DEPTHS.item,
      radius: ITEM_PROPS.size / 2,
      collisionType: CollisionType["Passive"],
      color: Color["Transparent"]
    });
    this.type = configs.type;
    this.vel = Vector.fromAngle(configs.direction).scale(ITEM_PROPS.vel);
  }

  public override onInitialize(engine: Engine): void {
    this.addComponent(new RotatingSquareComponent(ITEM_PROPS.square));
  }

  public override onPreUpdate(engine: Engine, delta: number): void {
    this.killWhenOutside();
  }

  private killWhenOutside(): void {
    if (this.pos.x < -ITEM_PROPS.size || this.pos.x > FIELD_PROPS.width + ITEM_PROPS.size || this.pos.y < -ITEM_PROPS.size || this.pos.y > FIELD_PROPS.height + ITEM_PROPS.size) {
      this.kill();
    }
  }

  public setStatus(status: Status): void {
    this.status = status;
  }

}