//

import {
  Actor,
  CollisionType,
  Color,
  Engine,
  PreCollisionEvent,
  Random,
  Vector,
  vec
} from "excalibur";
import {
  RotatingSquareComponent
} from "/source/component/rotating-square";
import {
  TimerComponent
} from "/source/component/timer";
import {
  DEPTHS,
  FIELD_PROPS
} from "/source/core/constant";
import {
  Bullet
} from "/source/entity/bullet";
import {
  Fragment
} from "/source/entity/fragment";
import {
  Item
} from "/source/entity/item";
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

type EnemyState = "activate" | "move";


export class Enemy extends Actor {

  private readonly random: Random;
  private status!: Status;
  private state: EnemyState;
  private life: number;
  private activationTimer: number = 0;

  public constructor({x, y}: {x: number, y: number}) {
    super({
      pos: vec(x, y),
      z: DEPTHS.enemy,
      radius: ENEMY_PROPS.size / 2,
      collisionType: CollisionType["Passive"],
      color: Color["Transparent"]
    });
    this.random = new Random();
    this.state = "activate";
    this.life = 3;
  }

  public override onInitialize(engine: Engine): void {
    const squareComponent = new RotatingSquareComponent(ENEMY_PROPS.square);
    const timerComponent = new TimerComponent();
    timerComponent.setOperation("shoot", () => this.shoot(engine), this.status.calcAverageShootTimeout());
    timerComponent.setOperation("changeDirection", () => this.changeDirection(), 2000);
    timerComponent.deactivate("shoot");
    timerComponent.deactivate("changeDirection");
    this.addComponent(squareComponent);
    this.addComponent(timerComponent);
    this.on("precollision", (event) => this.onPreCollision(engine, event));
  }

  public override onPreUpdate(engine: Engine, delta: number): void {
    this.activate(delta);
    this.killWhenOutside();
  }

  public onPreCollision(engine: Engine, event: PreCollisionEvent<Actor>): void {
    this.collideWithBullet(engine, event.other);
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

  private killWhenOutside(): void {
    if (this.pos.x < -ENEMY_PROPS.size || this.pos.x > FIELD_PROPS.width + ENEMY_PROPS.size || this.pos.y < -ENEMY_PROPS.size || this.pos.y > FIELD_PROPS.height + ENEMY_PROPS.size) {
      this.kill();
    }
  }

  private shoot(engine: Engine): number {
    const direction = this.random.floating(-Math.PI, Math.PI);
    const bullet = new Bullet({x: this.pos.x, y: this.pos.y, direction, owner: "enemy"});
    bullet.setStatus(this.status);
    engine.currentScene.add(bullet);
    const timeout = randomize(this.random, this.status.calcAverageShootTimeout());
    return timeout;
  }

  private changeDirection(): number {
    const direction = this.random.floating(-Math.PI, Math.PI);
    this.vel = Vector.fromAngle(direction).scale(ENEMY_PROPS.vel);
    const timeout = randomize(this.random, 2000);
    return timeout;
  }

  private collideWithBullet(engine: Engine, other: Actor): void {
    if (other instanceof Bullet && other.owner === "player") {
      if (this.state === "move") {
        this.life --;
        const dead = this.life <= 0;
        this.status.hit(this.pos.x, this.pos.y, dead);
        if (dead) {
          this.emitFragments(engine);
          this.emitItem(engine);
          this.kill();
        }
        other.kill();
      }
    }
  }

  private emitFragments(engine: Engine): void {
    for (let i = 0 ; i < 5 ; i ++) {
      const x = this.random.floating(this.pos.x - 4, this.pos.x + 4);
      const y = this.random.floating(this.pos.y - 4, this.pos.y + 4);
      const direction = this.random.floating((0.4 * i - 1) * Math.PI, (0.4 * i - 0.6) * Math.PI);
      const fragment = new Fragment({x, y, direction, owner: "enemy"});
      engine.add(fragment);
    }
  }

  private emitItem(engine: Engine): void {
    if (this.random.next() <= this.status.calcItemProbability()) {
      const direction = this.random.floating(-Math.PI, Math.PI);
      const item = new Item({x: this.pos.x, y: this.pos.y, direction, type: "recover"});
      item.setStatus(this.status);
      engine.add(item);
    }
  }

  public setStatus(status: Status): void {
    this.status = status;
  }

}