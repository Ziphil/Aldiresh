//

import {
  CollisionType,
  Color,
  Engine,
  Random
} from "excalibur";
import {
  Ship
} from "/source/entity/ship";


export const ENEMY_BASE_COLOR = Color.fromHSL(0.85, 0.8, 0.5);
export const ENEMY_ACCTIVATION_TIME = 2000;
export const ENEMY_VEL = 60;


export class Enemy extends Ship {

  private readonly random: Random;
  private activationTimer: number = 0;

  public constructor(x: number, y: number) {
    super(x, y, ENEMY_BASE_COLOR, {collisionType: CollisionType["Passive"]});
    this.z = 5;
    this.random = new Random();
  }

  public override onPreUpdate(engine: Engine, delta: number): void {
    super.onPreUpdate(engine, delta);
    this.activate(delta);
  }

  private activate(delta: number): void {
    if (this.activationTimer < ENEMY_ACCTIVATION_TIME) {
      this.activationTimer += delta;
      this.graphics.opacity = this.activationTimer / ENEMY_ACCTIVATION_TIME;
      if (this.activationTimer >= ENEMY_ACCTIVATION_TIME) {
        this.graphics.opacity = 1;
        this.changeDirection();
      }
    }
  }

  private changeDirection(): void {
    const direction = this.random.floating(-Math.PI, Math.PI);
    this.vel.x = Math.cos(direction) * ENEMY_VEL;
    this.vel.y = Math.sin(direction) * ENEMY_VEL;
  }

}