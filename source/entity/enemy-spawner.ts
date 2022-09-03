//

import {
  Engine,
  Entity,
  Random
} from "excalibur";
import {
  FIELD_HEIGHT,
  FIELD_WIDTH
} from "/source/constant";
import {
  Enemy
} from "/source/entity/enemy";
import {
  SHIP_SIZE
} from "/source/entity/ship";
import {
  Status
} from "/source/entity/status";
import {
  reschedule
} from "/source/util/misc";


export class EnemySpawner extends Entity {

  private readonly random: Random;
  private status!: Status;

  public constructor() {
    super();
    this.random = new Random();
  }

  public override onInitialize(engine: Engine): void {
    reschedule(engine, () => this.spawn(engine), 0);
  }

  public override onPreUpdate(engine: Engine, delta: number): void {
  }

  private spawn(engine: Engine): number {
    const x = this.random.integer(SHIP_SIZE, FIELD_WIDTH - SHIP_SIZE);
    const y = this.random.integer(SHIP_SIZE, FIELD_HEIGHT - SHIP_SIZE);
    const enemy = new Enemy(x, y);
    const averageTimeout = this.status.averageSpawnTimeout;
    const timeout = this.random.integer(averageTimeout / 2, averageTimeout * 3 / 2);
    engine.currentScene.add(enemy);
    return timeout;
  }

  public setStatus(status: Status): void {
    this.status = status;
  }

}