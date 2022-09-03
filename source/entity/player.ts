//

import {
  Actor,
  CollisionType,
  Color,
  Engine,
  Input,
  vec
} from "excalibur";
import {
  RotatedSquareComponent
} from "/source/component/rotated-square";
import {
  FIELD_CONFIGS
} from "/source/constant";
import {
  Bullet
} from "/source/entity/bullet";
import {
  Status
} from "/source/entity/status";
import {
  Target
} from "/source/entity/target";


export const PLAYER_CONFIGS = {
  size: 21,
  acc: 0.288,
  friction: 0.108,
  maxVel: 240,
  square: {
    outerSize: 21,
    innerSize: 15,
    outerRotationVel: 0.0018,
    innerRotationVel: -0.0024,
    outerColor: Color.fromHSL(0.5, 0.8, 0.5, 0.8),
    innerColor: Color.fromHSL(0.5, 0.8, 0.5, 0.4)
  }
};


export class Player extends Actor {

  private status!: Status;
  private target!: Target;

  public constructor(x: number, y: number) {
    super({pos: vec(x, y), radius: PLAYER_CONFIGS.size / 2, collisionType: CollisionType["Active"]});
    this.addComponent(new RotatedSquareComponent(PLAYER_CONFIGS.square));
    this.z = 10;
  }

  public override onInitialize(engine: Engine): void {
    engine.input.pointers.primary.on("down", (event) => {
      this.shoot(engine);
    });
  }

  public override onPreUpdate(engine: Engine, delta: number): void {
    this.move(engine, delta);
    this.bounceWall();
  }

  private move(engine: Engine, delta: number): void {
    const keyboard = engine.input.keyboard;
    if (keyboard.isHeld(Input["Keys"]["ArrowLeft"])) {
      this.vel.x -= PLAYER_CONFIGS.acc * delta;
    }
    if (keyboard.isHeld(Input["Keys"]["ArrowRight"])) {
      this.vel.x += PLAYER_CONFIGS.acc * delta;
    }
    if (keyboard.isHeld(Input["Keys"]["ArrowUp"])) {
      this.vel.y -= PLAYER_CONFIGS.acc * delta;
    }
    if (keyboard.isHeld(Input["Keys"]["ArrowDown"])) {
      this.vel.y += PLAYER_CONFIGS.acc * delta;
    }
    this.vel.x = Math.max(Math.min(this.vel.x, PLAYER_CONFIGS.maxVel), -PLAYER_CONFIGS.maxVel);
    this.vel.y = Math.max(Math.min(this.vel.y, PLAYER_CONFIGS.maxVel), -PLAYER_CONFIGS.maxVel);
    this.vel.x -= Math.min(Math.abs(this.vel.x), PLAYER_CONFIGS.friction * delta) * Math.sign(this.vel.x);
    this.vel.y -= Math.min(Math.abs(this.vel.y), PLAYER_CONFIGS.friction * delta) * Math.sign(this.vel.y);
  }

  private shoot(engine: Engine): void {
    const target = this.target;
    const direction = target.pos.sub(this.pos).toAngle();
    const bullet = new Bullet(this.pos.x, this.pos.y, direction);
    engine.currentScene.add(bullet);
  }

  private bounceWall(): void {
    if (this.pos.x < PLAYER_CONFIGS.size) {
      this.pos.x = PLAYER_CONFIGS.size;
      this.vel.x = -this.vel.x;
    }
    if (this.pos.x > FIELD_CONFIGS.width - PLAYER_CONFIGS.size) {
      this.pos.x = FIELD_CONFIGS.width - PLAYER_CONFIGS.size;
      this.vel.x = -this.vel.x;
    }
    if (this.pos.y < PLAYER_CONFIGS.size) {
      this.pos.y = PLAYER_CONFIGS.size;
      this.vel.y = -this.vel.y;
    }
    if (this.pos.y > FIELD_CONFIGS.height - PLAYER_CONFIGS.size) {
      this.pos.y = FIELD_CONFIGS.height - PLAYER_CONFIGS.size;
      this.vel.y = -this.vel.y;
    }
  }

  public setTarget(target: Target): void {
    this.target = target;
  }

  public setStatus(status: Status): void {
    this.status = status;
  }

}