//

import {
  Actor,
  Color,
  Engine
} from "excalibur";
import {
  RotatedSquareComponent
} from "/source/component/rotated-square";


export const TARGET_CONFIGS = {
  size: 31,
  square: {
    outerSize: 31,
    outerRotationVel: 0.003,
    outerColor: Color.fromHSL(0.5, 0.8, 0.5, 0.8)
  }
};


export class Target extends Actor {

  public constructor({x, y}: {x: number, y: number}) {
    super({x, y, z: -190});
    this.addComponent(new RotatedSquareComponent({...TARGET_CONFIGS.square, framed: true}));
  }

  public override onPreUpdate(engine: Engine, delta: number): void {
    this.pos = engine.input.pointers.primary.lastScreenPos.clone();
  }

}