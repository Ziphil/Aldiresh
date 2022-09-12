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
  InputComponent,
  RotatingSquareComponent
} from "/source/component";
import {
  DEPTHS,
  FIELD_DIMENSION,
  SCREEN_DIMENSION
} from "/source/core/constant";


export const TARGET_PROPS = {
  vel: 240,
  square: {
    outerSize: 31,
    outerRotationVel: 0.003,
    outerColor: Color.fromHSL(0.5, 0.8, 0.5, 0.8)
  }
};

export type TargetConfigs = {
  x: number,
  y: number,
  range: "screen" | "field"
};


export class Target extends Actor {

  private readonly range: "screen" | "field";
  private previousPointerPos: Vector;

  public constructor({x, y, ...configs}: TargetConfigs) {
    super({
      pos: vec(x, y),
      z: DEPTHS.target,
      radius: 1,
      color: Color["Transparent"],
      collisionType: CollisionType["PreventCollision"],
      name: "target"
    });
    this.range = configs.range;
    this.previousPointerPos = vec(x, y);
  }

  public override onInitialize(engine: Engine): void {
    this.initializeComponents();
  }

  public override onPreUpdate(engine: Engine, delta: number): void {
    this.move();
    this.followPointer(engine);
  }

  private initializeComponents(): void {
    const squareComponent = new RotatingSquareComponent({...TARGET_PROPS.square, framed: true});
    const inputComponent = new InputComponent();
    this.addComponent(squareComponent);
    this.addComponent(inputComponent);
  }

  private move(): void {
    const input = this.get(InputComponent)!;
    this.vel.x = input.secondaryX * TARGET_PROPS.vel;
    this.vel.y = input.secondaryY * TARGET_PROPS.vel;
  }

  private followPointer(engine: Engine): void {
    const pos = engine.input.pointers.primary.lastScreenPos;
    const dimension = (this.range === "screen") ? SCREEN_DIMENSION : FIELD_DIMENSION;
    if (pos.x !== this.previousPointerPos.x || pos.y !== this.previousPointerPos.y) {
      if (pos.x >= 0 && pos.x <= dimension.width && pos.y >= 0 && pos.y <= dimension.height) {
        this.pos.x = pos.x;
        this.pos.y = pos.y;
      }
      this.previousPointerPos = pos;
    }
  }

}