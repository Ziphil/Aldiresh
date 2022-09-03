//

import {
  Actor,
  CollisionType,
  Color,
  Engine,
  Random,
  Vector,
  vec
} from "excalibur";
import {
  RotatedSquareComponent
} from "/source/component/rotated-square";


export const ENEMY_CONFIGS = {
  size: 21,
  vel: 60,
  activationTime: 2000,
  square: {
    outerSize: 21,
    innerSize: 15,
    outerRotationVel: 0.0018,
    innerRotationVel: -0.0024,
    outerColor: Color.fromHSL(0.85, 0.8, 0.5, 0.8),
    innerColor: Color.fromHSL(0.85, 0.8, 0.5, 0.4)
  }
};


export class Enemy extends Actor {

  private readonly random: Random;
  private activationTimer: number = 0;

  public constructor(x: number, y: number) {
    super({pos: vec(x, y), radius: ENEMY_CONFIGS.size / 2, collisionType: CollisionType["Passive"]});
    this.addComponent(new RotatedSquareComponent(ENEMY_CONFIGS.square));
    this.z = 5;
    this.random = new Random();
  }

  public override onPreUpdate(engine: Engine, delta: number): void {
    super.onPreUpdate(engine, delta);
    this.activate(delta);
  }

  private activate(delta: number): void {
    if (this.activationTimer < ENEMY_CONFIGS.activationTime) {
      this.activationTimer += delta;
      this.graphics.opacity = this.activationTimer / ENEMY_CONFIGS.activationTime;
      if (this.activationTimer >= ENEMY_CONFIGS.activationTime) {
        this.graphics.opacity = 1;
        this.changeDirection();
      }
    }
  }

  private changeDirection(): void {
    const direction = this.random.floating(-Math.PI, Math.PI);
    this.vel = Vector.fromAngle(direction).scale(ENEMY_CONFIGS.vel);
  }

}