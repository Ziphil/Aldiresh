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
  RotatingSquareComponent
} from "/source/component/rotating-square";
import {
  TimerComponent
} from "/source/component/timer";
import {
  Bullet
} from "/source/entity/bullet";
import {
  Status
} from "/source/entity/status";
import {
  randomize
} from "/source/util/misc";


export const ENEMY_PROPS = {
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

  public constructor({x, y}: {x: number, y: number}) {
    super({x, y, z: -210, radius: ENEMY_PROPS.size / 2, collisionType: CollisionType["Passive"]});
    this.random = new Random();
    this.state = "activate";
    this.life = 3;
  }

  public override onInitialize(engine: Engine): void {
    this.addComponent(new RotatingSquareComponent(ENEMY_PROPS.square));
    this.addComponent(new TimerComponent());
    const component = this.get(TimerComponent)!;
    component.setOperation("shoot", () => this.shoot(engine), this.status.averageShootTimeout);
    component.setOperation("changeDirection", () => this.changeDirection(), 2000);
    component.deactivate("shoot");
    component.deactivate("changeDirection");
    this.on("precollision", this.onPreCollision.bind(this));
  }

  public override onPreUpdate(engine: Engine, delta: number): void {
    this.activate(delta);
  }

  private activate(delta: number): void {
    if (this.state === "activate") {
      this.activationTimer += delta;
      this.graphics.opacity = this.activationTimer / ENEMY_PROPS.activationDuration;
      if (this.activationTimer >= ENEMY_PROPS.activationDuration) {
        const component = this.get(TimerComponent)!;
        this.graphics.opacity = 1;
        this.state = "move";
        this.changeDirection();
        component.activate("shoot");
        component.activate("changeDirection");
      }
    }
  }

  private shoot(engine: Engine): number {
    const direction = this.random.floating(-Math.PI, Math.PI);
    const bullet = new Bullet({x: this.pos.x, y: this.pos.y, direction, owner: "enemy"});
    const timeout = randomize(this.random, this.status.averageShootTimeout);
    engine.currentScene.add(bullet);
    return timeout;
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

  private changeDirection(): number {
    const direction = this.random.floating(-Math.PI, Math.PI);
    const timeout = randomize(this.random, 2000);
    this.vel = Vector.fromAngle(direction).scale(ENEMY_PROPS.vel);
    return timeout;
  }

  public setStatus(status: Status): void {
    this.status = status;
  }

}