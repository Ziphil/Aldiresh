//

import {
  Actor,
  CollisionType,
  Color,
  Engine,
  PreCollisionEvent,
  Random,
  vec
} from "excalibur";
import {
  InputComponent,
  RotatingSquareComponent
} from "/source/component";
import {
  DEPTHS,
  FIELD_DIMENSION
} from "/source/core/constant";
import {
  GameoverCover
} from "/source/entity/gameover/gameover-cover";
import {
  Bullet
} from "/source/entity/main/bullet";
import {
  Fragment
} from "/source/entity/main/fragment";
import {
  Item
} from "/source/entity/main/item";
import {
  Status
} from "/source/entity/main/status";
import {
  Target
} from "/source/entity/main/target";


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

  private readonly random: Random;
  public status!: Status;
  public target!: Target;

  public constructor({x, y}: {x: number, y: number}) {
    super({
      pos: vec(x, y),
      z: DEPTHS.player,
      radius: PLAYER_PROPS.size / 2,
      collisionType: CollisionType["Passive"]
    });
    this.random = new Random();
  }

  public override onInitialize(engine: Engine): void {
    this.initializeComponents(engine);
    this.on("precollision", (event) => this.onPreCollision(engine, event));
  }

  public override onPreUpdate(engine: Engine, delta: number): void {
    this.move(delta);
    this.shoot(engine);
    this.bounceWall();
  }

  public onPreCollision(engine: Engine, event: PreCollisionEvent<Actor>): void {
    this.collideWithBullet(engine, event.other);
    this.collideWithItem(engine, event.other);
  }

  private initializeComponents(engine: Engine): void {
    const squareComponent = new RotatingSquareComponent(PLAYER_PROPS.square);
    const inputComponent = new InputComponent();
    this.addComponent(squareComponent);
    this.addComponent(inputComponent);
  }

  private move(delta: number): void {
    const input = this.get(InputComponent)!;
    this.vel.x += input.primaryX * PLAYER_PROPS.acc * delta;
    this.vel.y += input.primaryY * PLAYER_PROPS.acc * delta;
    this.vel.x = Math.max(Math.min(this.vel.x, PLAYER_PROPS.maxVel), -PLAYER_PROPS.maxVel);
    this.vel.y = Math.max(Math.min(this.vel.y, PLAYER_PROPS.maxVel), -PLAYER_PROPS.maxVel);
    this.vel.x -= Math.min(Math.abs(this.vel.x), PLAYER_PROPS.friction * delta) * Math.sign(this.vel.x);
    this.vel.y -= Math.min(Math.abs(this.vel.y), PLAYER_PROPS.friction * delta) * Math.sign(this.vel.y);
  }

  private shoot(engine: Engine): void {
    const input = this.get(InputComponent)!;
    if (this.status.life > 0 && input.buttonPressed) {
      const target = this.target;
      const direction = target.pos.sub(this.pos).toAngle();
      const bullet = new Bullet({x: this.pos.x, y: this.pos.y, direction, owner: "player"});
      bullet.status = this.status;
      engine.currentScene.add(bullet);
      this.status.shoot();
    }
  }

  private bounceWall(): void {
    if (this.pos.x < PLAYER_PROPS.size) {
      this.pos.x = PLAYER_PROPS.size;
      this.vel.x = -this.vel.x;
    }
    if (this.pos.x > FIELD_DIMENSION.width - PLAYER_PROPS.size) {
      this.pos.x = FIELD_DIMENSION.width - PLAYER_PROPS.size;
      this.vel.x = -this.vel.x;
    }
    if (this.pos.y < PLAYER_PROPS.size) {
      this.pos.y = PLAYER_PROPS.size;
      this.vel.y = -this.vel.y;
    }
    if (this.pos.y > FIELD_DIMENSION.height - PLAYER_PROPS.size) {
      this.pos.y = FIELD_DIMENSION.height - PLAYER_PROPS.size;
      this.vel.y = -this.vel.y;
    }
  }

  private collideWithBullet(engine: Engine, other: Actor): void {
    if (other instanceof Bullet && other.owner === "enemy") {
      this.status.damage();
      if (this.status.life <= 0) {
        this.emitFragments(engine);
        this.showGameoverCover(engine);
        this.kill();
      }
      other.kill();
    }
  }

  private collideWithItem(engine: Engine, other: Actor): void {
    if (other instanceof Item) {
      this.status.recover(this.pos.x, this.pos.y);
      other.kill();
    }
  }

  private emitFragments(engine: Engine): void {
    for (let i = 0 ; i < 5 ; i ++) {
      const x = this.random.floating(this.pos.x - 4, this.pos.x + 4);
      const y = this.random.floating(this.pos.y - 4, this.pos.y + 4);
      const direction = this.random.floating((0.4 * i - 1) * Math.PI, (0.4 * i - 0.6) * Math.PI);
      const fragment = new Fragment({x, y, direction, owner: "player"});
      engine.add(fragment);
    }
  }

  private showGameoverCover(engine: Engine): void {
    const gameoverColor = new GameoverCover();
    gameoverColor.status = this.status;
    engine.add(gameoverColor);
  }

}