//

import {
  Actor,
  CollisionType,
  Color,
  Engine,
  PreCollisionEvent,
  Random,
  Vector
} from "excalibur";
import {
  RotatedSquareComponent
} from "/source/component/rotated-square";
import {
  Bullet
} from "/source/entity/bullet";
import {
  Status
} from "/source/entity/status";


export const ENEMY_CONFIGS = {
  size: 21,
  vel: 60,
  activationDuration: 2000,
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
  private status!: Status;
  private state: "activate" | "move";
  private life: number;
  private activationTimer: number = 0;

  public constructor(x: number, y: number) {
    super({x, y, z: -210, radius: ENEMY_CONFIGS.size / 2, collisionType: CollisionType["Passive"]});
    this.addComponent(new RotatedSquareComponent(ENEMY_CONFIGS.square));
    this.random = new Random();
    this.state = "activate";
    this.life = 3;
    this.on("precollision", this.onPreCollision.bind(this));
  }

  public override onPreUpdate(engine: Engine, delta: number): void {
    super.onPreUpdate(engine, delta);
    this.activate(delta);
  }

  private activate(delta: number): void {
    if (this.state === "activate") {
      this.activationTimer += delta;
      this.graphics.opacity = this.activationTimer / ENEMY_CONFIGS.activationDuration;
      if (this.activationTimer >= ENEMY_CONFIGS.activationDuration) {
        this.graphics.opacity = 1;
        this.state = "move";
        this.changeDirection();
      }
    }
  }

  private onPreCollision(event: PreCollisionEvent<Actor>): void {
    const other = event.other;
    if (other instanceof Bullet && other.owner === "player") {
      if (this.state === "move") {
        this.life --;
        const dead = this.life <= 0;
        this.status.hitEnemy(dead);
        if (dead) {
          this.kill();
        }
        other.kill();
      }
    }
  };

  private changeDirection(): void {
    const direction = this.random.floating(-Math.PI, Math.PI);
    this.vel = Vector.fromAngle(direction).scale(ENEMY_CONFIGS.vel);
  }

  public setStatus(status: Status): void {
    this.status = status;
  }

}