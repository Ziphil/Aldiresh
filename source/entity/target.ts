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
  InputManagerComponent,
  RotatingSquareComponent
} from "/source/component";
import {
  DEPTHS,
  FIELD_PROPS
} from "/source/core/constant";;


export const TARGET_PROPS = {
  vel: 240,
  square: {
    outerSize: 31,
    outerRotationVel: 0.003,
    outerColor: Color.fromHSL(0.5, 0.8, 0.5, 0.8)
  }
};


export class Target extends Actor {

  private previousPointerPos: Vector;

  public constructor({x, y}: {x: number, y: number}) {
    super({
      pos: vec(x, y),
      z: DEPTHS.target,
      radius: 1,
      color: Color["Transparent"],
      collisionType: CollisionType["PreventCollision"],
      name: "target"
    });
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
    const inputComponent = new InputManagerComponent();
    this.addComponent(squareComponent);
    this.addComponent(inputComponent);
  }

  private move(): void {
    const inputManager = this.get(InputManagerComponent)!;
    this.vel.x = inputManager.secondaryX * TARGET_PROPS.vel;
    this.vel.y = inputManager.secondaryY * TARGET_PROPS.vel;
  }

  private followPointer(engine: Engine): void {
    const pos = engine.input.pointers.primary.lastScreenPos;
    if (pos.x !== this.previousPointerPos.x || pos.y !== this.previousPointerPos.y) {
      if (pos.x >= 0 && pos.x <= FIELD_PROPS.width && pos.y >= 0 && pos.y <= FIELD_PROPS.height) {
        this.pos.x = pos.x;
        this.pos.y = pos.y;
      }
      this.previousPointerPos = pos;
    }
  }

}