//

import {
  Engine,
  Entity,
  Random
} from "excalibur";
import {
  FIELD_CONFIGS
} from "/source/core/constant";
import {
  ENEMY_CONFIGS,
  Enemy
} from "/source/entity/enemy";
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
    const x = this.random.integer(ENEMY_CONFIGS.size, FIELD_CONFIGS.width - ENEMY_CONFIGS.size);
    const y = this.random.integer(ENEMY_CONFIGS.size, FIELD_CONFIGS.height - ENEMY_CONFIGS.size);
    const enemy = new Enemy({x, y});
    const averageTimeout = this.status.averageSpawnTimeout;
    const timeout = this.random.integer(averageTimeout / 2, averageTimeout * 3 / 2);
    enemy.setStatus(this.status);
    engine.currentScene.add(enemy);
    return timeout;
  }

  public setStatus(status: Status): void {
    this.status = status;
  }

}