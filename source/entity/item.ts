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
  AutoKillComponent
} from "/source/component/auto-kill";
import {
  RotatingSquareComponent
} from "/source/component/rotating-square";
import {
  DEPTHS
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

  public readonly type: "recover";
  public status!: Status;

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
    this.initializeComponents();
  }

  private initializeComponents(): void {
    const squareComponent = new RotatingSquareComponent(ITEM_PROPS.square);
    const autoKillComponent = new AutoKillComponent(ITEM_PROPS.size);
    this.addComponent(squareComponent);
    this.addComponent(autoKillComponent);
  }

}