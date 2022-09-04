//

import {
  Actor,
  Color,
  Engine,
  vec
} from "excalibur";
import {
  RotatingSquareComponent
} from "/source/component/rotating-square";
import {
  DEPTHS
} from "/source/core/constant";


export const TARGET_PROPS = {
  square: {
    outerSize: 31,
    outerRotationVel: 0.003,
    outerColor: Color.fromHSL(0.5, 0.8, 0.5, 0.8)
  }
};


export class Target extends Actor {

  public constructor({x, y}: {x: number, y: number}) {
    super({
      pos: vec(x, y),
      z: DEPTHS.target
    });
  }

  public override onInitialize(engine: Engine): void {
    this.initializeComponents();
  }

  public override onPreUpdate(engine: Engine, delta: number): void {
    this.followPointer(engine);
  }

  private initializeComponents(): void {
    const squareComponent = new RotatingSquareComponent({...TARGET_PROPS.square, framed: true});
    this.addComponent(squareComponent);
  }

  private followPointer(engine: Engine): void {
    this.pos = engine.input.pointers.primary.lastScreenPos.clone();
  }

}