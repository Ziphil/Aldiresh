//

import {
  Actor,
  CollisionType,
  Color,
  Engine,
  Input,
  PreCollisionEvent,
  vec
} from "excalibur";
import {
  RotatingSquareComponent
} from "/source/component/rotating-square";
import {
  FIELD_PROPS
} from "/source/core/constant";
import {
  Bullet
} from "/source/entity/bullet";
import {
  Status
} from "/source/entity/status";
import {
  Target
} from "/source/entity/target";


export const PLAYER_PROPS = {
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

  public constructor({x, y}: {x: number, y: number}) {
    super({
      pos: vec(x, y),
      z: -200,
      radius: PLAYER_PROPS.size / 2,
      collisionType: CollisionType["Passive"]
    });
  }

  public override onInitialize(engine: Engine): void {
    const squareComponent = new RotatingSquareComponent(PLAYER_PROPS.square);
    this.addComponent(squareComponent);
    this.on("precollision", this.onPreCollision.bind(this));
    engine.input.pointers.primary.on("down", () => this.shoot(engine));
  }

  public override onPreUpdate(engine: Engine, delta: number): void {
    this.move(engine, delta);
    this.bounceWall();
  }

  public onPreCollision(event: PreCollisionEvent<Actor>): void {
    this.collideWithBullet(event.other);
  }

  private move(engine: Engine, delta: number): void {
    const keyboard = engine.input.keyboard;
    if (keyboard.isHeld(Input["Keys"]["ArrowLeft"])) {
      this.vel.x -= PLAYER_PROPS.acc * delta;
    }
    if (keyboard.isHeld(Input["Keys"]["ArrowRight"])) {
      this.vel.x += PLAYER_PROPS.acc * delta;
    }
    if (keyboard.isHeld(Input["Keys"]["ArrowUp"])) {
      this.vel.y -= PLAYER_PROPS.acc * delta;
    }
    if (keyboard.isHeld(Input["Keys"]["ArrowDown"])) {
      this.vel.y += PLAYER_PROPS.acc * delta;
    }
    this.vel.x = Math.max(Math.min(this.vel.x, PLAYER_PROPS.maxVel), -PLAYER_PROPS.maxVel);
    this.vel.y = Math.max(Math.min(this.vel.y, PLAYER_PROPS.maxVel), -PLAYER_PROPS.maxVel);
    this.vel.x -= Math.min(Math.abs(this.vel.x), PLAYER_PROPS.friction * delta) * Math.sign(this.vel.x);
    this.vel.y -= Math.min(Math.abs(this.vel.y), PLAYER_PROPS.friction * delta) * Math.sign(this.vel.y);
  }

  private shoot(engine: Engine): void {
    const target = this.target;
    const direction = target.pos.sub(this.pos).toAngle();
    const bullet = new Bullet({x: this.pos.x, y: this.pos.y, direction, owner: "player"});
    bullet.setStatus(this.status);
    engine.currentScene.add(bullet);
    this.status.shoot();
  }

  private bounceWall(): void {
    if (this.pos.x < PLAYER_PROPS.size) {
      this.pos.x = PLAYER_PROPS.size;
      this.vel.x = -this.vel.x;
    }
    if (this.pos.x > FIELD_PROPS.width - PLAYER_PROPS.size) {
      this.pos.x = FIELD_PROPS.width - PLAYER_PROPS.size;
      this.vel.x = -this.vel.x;
    }
    if (this.pos.y < PLAYER_PROPS.size) {
      this.pos.y = PLAYER_PROPS.size;
      this.vel.y = -this.vel.y;
    }
    if (this.pos.y > FIELD_PROPS.height - PLAYER_PROPS.size) {
      this.pos.y = FIELD_PROPS.height - PLAYER_PROPS.size;
      this.vel.y = -this.vel.y;
    }
  }

  private collideWithBullet(other: Actor): void {
    if (other instanceof Bullet && other.owner === "enemy") {
      this.status.damage();
      other.kill();
    }
  }

  public setTarget(target: Target): void {
    this.target = target;
  }

  public setStatus(status: Status): void {
    this.status = status;
  }

}