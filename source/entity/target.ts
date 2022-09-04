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
  DEPTHS,
  FIELD_PROPS
} from "/source/core/constant";
import {
  InputManager
} from "/source/entity/input-manager";


export const TARGET_PROPS = {
  size: 31,
  vel: 240,
  square: {
    outerSize: 31,
    outerRotationVel: 0.003,
    outerColor: Color.fromHSL(0.5, 0.8, 0.5, 0.8)
  }
};


export class Target extends Actor {

  private inputManager!: InputManager;
  private previousPointerPos: Vector;

  public constructor({x, y}: {x: number, y: number}) {
    super({
      pos: vec(x, y),
      z: DEPTHS.target,
      radius: TARGET_PROPS.size / 2,
      color: Color["Transparent"]
    });
    this.previousPointerPos = vec(x, y);
  }

  public override onInitialize(engine: Engine): void {
    this.initializeComponents();
    this.initializeInputManager(engine);
  }

  public override onPreUpdate(engine: Engine, delta: number): void {
    this.move();
    this.followPointer(engine);
  }

  private initializeComponents(): void {
    const squareComponent = new RotatingSquareComponent({...TARGET_PROPS.square, framed: true});
    this.addComponent(squareComponent);
  }

  private initializeInputManager(engine: Engine): void {
    const inputManager = new InputManager(engine);
    this.inputManager = inputManager;
  }

  private move(): void {
    this.vel.x = this.inputManager.getRightX() * TARGET_PROPS.vel;
    this.vel.y = this.inputManager.getRightY() * TARGET_PROPS.vel;
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