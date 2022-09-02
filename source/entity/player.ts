//

import {
  CollisionType,
  Color,
  Engine,
  Input
} from "excalibur";
import {
  FIELD_HEIGHT,
  FIELD_WIDTH
} from "/source/constant";
import {
  SHIP_SIZE,
  Ship
} from "./ship";


export const PLAYER_ACC = 0.288;
export const PLAYER_FRICTION = 0.108;
export const PLAYER_MAX_VEL = 240;
export const PLAYER_BASE_COLOR = Color.fromHSL(0.5, 0.8, 0.5);


export class Player extends Ship {

  public constructor(x: number, y: number) {
    super(x, y, PLAYER_BASE_COLOR, {collisionType: CollisionType["Active"]});
  }

  public override onPreUpdate(engine: Engine, delta: number): void {
    super.onPreUpdate(engine, delta);
    this.move(engine, delta);
    this.bounceWall();
  }

  private move(engine: Engine, delta: number): void {
    const keyboard = engine.input.keyboard;
    if (keyboard.isHeld(Input["Keys"]["ArrowLeft"])) {
      this.vel.x -= PLAYER_ACC * delta;
    }
    if (keyboard.isHeld(Input["Keys"]["ArrowRight"])) {
      this.vel.x += PLAYER_ACC * delta;
    }
    if (keyboard.isHeld(Input["Keys"]["ArrowUp"])) {
      this.vel.y -= PLAYER_ACC * delta;
    }
    if (keyboard.isHeld(Input["Keys"]["ArrowDown"])) {
      this.vel.y += PLAYER_ACC * delta;
    }
    this.vel.x = Math.max(Math.min(this.vel.x, PLAYER_MAX_VEL), -PLAYER_MAX_VEL);
    this.vel.y = Math.max(Math.min(this.vel.y, PLAYER_MAX_VEL), -PLAYER_MAX_VEL);
    this.vel.x -= Math.min(Math.abs(this.vel.x), PLAYER_FRICTION * delta) * Math.sign(this.vel.x);
    this.vel.y -= Math.min(Math.abs(this.vel.y), PLAYER_FRICTION * delta) * Math.sign(this.vel.y);
  }

  private bounceWall(): void {
    if (this.pos.x < SHIP_SIZE) {
      this.pos.x = SHIP_SIZE;
      this.vel.x = -this.vel.x;
    }
    if (this.pos.x > FIELD_WIDTH - SHIP_SIZE) {
      this.pos.x = FIELD_WIDTH - SHIP_SIZE;
      this.vel.x = -this.vel.x;
    }
    if (this.pos.y < SHIP_SIZE) {
      this.pos.y = SHIP_SIZE;
      this.vel.y = -this.vel.y;
    }
    if (this.pos.y > FIELD_HEIGHT - SHIP_SIZE) {
      this.pos.y = FIELD_HEIGHT - SHIP_SIZE;
      this.vel.y = -this.vel.y;
    }
  }

}